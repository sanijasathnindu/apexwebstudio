import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REQUEST_TIMEOUT_MS = 60_000;

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  page?: unknown;
};

function clean(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function json(
  body: Record<string, unknown>,
  status = 200
): NextResponse<Record<string, unknown>> {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function readPayload(request: NextRequest): Promise<ContactPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as ContactPayload;
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries()) as ContactPayload;
}

export async function GET() {
  const configured = Boolean(process.env.GOOGLE_SCRIPT_URL?.trim());

  return json({
    ok: true,
    service: "APEX contact API",
    googleScriptConfigured: configured,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const endpoint = process.env.GOOGLE_SCRIPT_URL?.trim();

  if (!endpoint) {
    return json(
      {
        ok: false,
        code: "GOOGLE_SCRIPT_NOT_CONFIGURED",
        error: "The contact email service is not configured.",
      },
      503
    );
  }

  if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(endpoint)) {
    return json(
      {
        ok: false,
        code: "INVALID_GOOGLE_SCRIPT_URL",
        error: "GOOGLE_SCRIPT_URL must be the deployed Apps Script /exec URL.",
      },
      500
    );
  }

  try {
    const raw = await readPayload(request);

    const name = clean(raw.name, 120);
    const company = clean(raw.company, 160);
    const email = clean(raw.email, 254).toLowerCase();
    const service = clean(raw.service, 180);
    const message = clean(raw.message, 5000);
    const page = clean(raw.page, 500);

    if (!name || !EMAIL_PATTERN.test(email) || !service || message.length < 20) {
      return json(
        {
          ok: false,
          code: "INVALID_FORM_DATA",
          error: "Please complete all required fields with valid information.",
        },
        400
      );
    }

    const body = new URLSearchParams({
      name,
      company,
      email,
      service,
      message,
      source: "APEX WEB Studio website",
      page: page || request.headers.get("referer") || "Unknown page",
      submittedAt: new Date().toISOString(),
      userAgent: clean(request.headers.get("user-agent"), 500),
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;

    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Accept: "application/json,text/plain,*/*",
        },
        body: body.toString(),
        redirect: "follow",
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Apps Script HTTP error", {
        status: response.status,
        statusText: response.statusText,
        body: responseText.slice(0, 1000),
      });

      return json(
        {
          ok: false,
          code: "GOOGLE_SCRIPT_HTTP_ERROR",
          error: "The email service returned an HTTP error.",
        },
        502
      );
    }

    let result: Record<string, unknown>;

    try {
      result = JSON.parse(responseText) as Record<string, unknown>;
    } catch {
      console.error("Apps Script returned a non-JSON response", {
        body: responseText.slice(0, 1000),
      });

      return json(
        {
          ok: false,
          code: "INVALID_GOOGLE_SCRIPT_RESPONSE",
          error:
            "The Apps Script deployment did not return the expected response. Check that the /exec URL uses the newest deployment version.",
        },
        502
      );
    }

    const reference = clean(result.reference, 100);

    const ownerSent = result.ownerSent === true;
    const receiptSent = result.receiptSent === true;

    const emailsReallySent =
      result.ok === true &&
      ownerSent &&
      receiptSent &&
      Boolean(reference);

    if (!emailsReallySent) {
      console.warn("Apps Script did not confirm email delivery", {
        result,
        responseText,
      });

      return json(
        {
          ok: false,
          deliveryConfirmed: false,
          code:
            clean(result.code, 100) ||
            "EMAIL_DELIVERY_NOT_CONFIRMED",
          error:
            clean(result.error, 300) ||
            "The email service did not confirm that both emails were sent.",
          reference: reference || undefined,
          ownerSent,
          receiptSent,
        },
        502
      );
    }

    return json({
      ok: true,
      deliveryConfirmed: true,
      reference,
      ownerSent: true,
      receiptSent: true,
    });

    } catch (error) {
      const timedOut =
        error instanceof Error &&
        error.name === "AbortError";

      console.warn("Contact API request issue", error);

      return json(
        {
          ok: false,
          deliveryConfirmed: false,
          code: timedOut
            ? "EMAIL_CONFIRMATION_TIMEOUT"
            : "CONTACT_API_FAILURE",
          error: timedOut
            ? "The enquiry may have been sent, but the email service did not return confirmation in time. Please check your inbox before submitting again."
            : "The enquiry could not be sent. Please try again.",
        },
        timedOut ? 504 : 500
      );
    }
}
