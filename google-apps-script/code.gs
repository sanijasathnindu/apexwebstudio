/**
 * APEX WEB Studio contact-form email handler — reliable version
 * ----------------------------------------------------------------
 * Deployment settings:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * IMPORTANT:
 * 1. Run authorizeAndTest() once in the Apps Script editor.
 * 2. After every code change, update the active deployment to a NEW VERSION.
 * 3. Use the URL ending in /exec, never /dev.
 */

const OWNER_EMAIL = "sanijasathnindu85@gmail.com";
const BUSINESS_NAME = "APEX WEB Studio";
const REPLY_SUBJECT = "We received your APEX WEB Studio enquiry";
const RATE_LIMIT_SECONDS = 60;

function doGet() {
  return jsonResponse_({
    ok: true,
    service: "APEX WEB Studio contact endpoint",
    mailQuotaRemaining: MailApp.getRemainingDailyQuota(),
    timestamp: new Date().toISOString(),
  });
}

function doPost(e) {
  const startedAt = new Date();
  let reference = "";

  try {
    const data = getRequestData_(e);
    console.log("Contact request received", JSON.stringify({
      keys: Object.keys(data || {}),
      submittedAt: data && data.submittedAt,
    }));

    // Honeypot: bots often fill hidden fields.
    if (String(data.website || "").trim()) {
      return jsonResponse_({ ok: true, filtered: true });
    }

    const name = cleanText_(data.name, 120);
    const company = cleanText_(data.company, 160) || "Not provided";
    const email = cleanEmail_(data.email);
    const service = cleanText_(data.service, 180);
    const message = cleanText_(data.message, 5000);
    const source = cleanText_(data.source, 160) || "Website";
    const page = cleanText_(data.page, 500) || "Not provided";
    const submittedAt =
      cleanText_(data.submittedAt, 80) || new Date().toISOString();
    const userAgent = cleanText_(data.userAgent, 500) || "Not provided";

    if (!name || !email || !service || !message || message.length < 20) {
      return jsonResponse_({
        ok: false,
        code: "INVALID_FORM_DATA",
        error: "Missing or invalid required fields.",
      });
    }

    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      throw new Error(
        "MailApp daily recipient quota is too low. Remaining: " + remainingQuota
      );
    }

    rateLimit_(email);
    reference = createReference_();

    const emailData = {
      reference: reference,
      name: name,
      company: company,
      email: email,
      service: service,
      message: message,
      source: source,
      page: page,
      submittedAt: submittedAt,
      userAgent: userAgent,
    };

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      replyTo: email,
      subject: "[" + reference + "] New website enquiry — " + service,
      name: BUSINESS_NAME,
      htmlBody: ownerEmailHtml_(emailData),
      body: ownerEmailText_(emailData),
    });

    console.log("Owner email sent", reference);

    MailApp.sendEmail({
      to: email,
      replyTo: OWNER_EMAIL,
      subject: REPLY_SUBJECT + " — " + reference,
      name: BUSINESS_NAME,
      htmlBody: clientReceiptHtml_({
        reference: reference,
        name: name,
        service: service,
        message: message,
      }),
      body: clientReceiptText_({
        reference: reference,
        name: name,
        service: service,
        message: message,
      }),
    });

    console.log("Client receipt sent", reference);

    return jsonResponse_({
      ok: true,
      reference: reference,
      ownerSent: true,
      receiptSent: true,
      processingMs: new Date().getTime() - startedAt.getTime(),
    });
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    const stack = error && error.stack ? error.stack : "";

    console.error("Contact endpoint failed", message, stack);

    return jsonResponse_({
      ok: false,
      code: classifyError_(message),
      error: message,
      reference: reference,
    });
  }
}

/**
 * Run this function MANUALLY once from the Apps Script editor.
 * It forces Google to request MailApp authorisation and sends a test message.
 */
function authorizeAndTest() {
  const quota = MailApp.getRemainingDailyQuota();
  const subject = "APEX contact endpoint test — " + new Date().toISOString();

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    name: BUSINESS_NAME,
    body:
      "The APEX WEB Studio Google Apps Script has permission to send mail.\n\n" +
      "Remaining recipient quota before this test: " + quota + "\n" +
      "Script time zone: " + Session.getScriptTimeZone(),
    htmlBody:
      "<h2>APEX contact endpoint is authorised</h2>" +
      "<p>The Apps Script project can send email successfully.</p>" +
      "<p><strong>Remaining quota before this test:</strong> " + quota + "</p>" +
      "<p><strong>Time zone:</strong> " +
      escapeHtml_(Session.getScriptTimeZone()) +
      "</p>",
  });

  console.log("Authorisation test email sent to " + OWNER_EMAIL);
  return "Test email sent to " + OWNER_EMAIL + ". Remaining quota was " + quota;
}

/**
 * Optional editor-only end-to-end test. It sends both the owner email and the
 * client receipt to OWNER_EMAIL, so expect two messages.
 */
function testDoPost() {
  const result = doPost({
    parameter: {
      name: "APEX Test User",
      company: "APEX WEB Studio",
      email: OWNER_EMAIL,
      service: "Contact form test",
      message:
        "This is a controlled end-to-end test of the website contact email system.",
      website: "",
      source: "Apps Script editor test",
      page: "Google Apps Script",
      submittedAt: new Date().toISOString(),
      userAgent: "Apps Script test runner",
    },
  });

  console.log(result.getContent());
  return result.getContent();
}

function getRequestData_(e) {
  if (!e) return {};

  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  if (e.postData && e.postData.contents) {
    const content = String(e.postData.contents || "");
    const contentType = String(e.postData.type || "").toLowerCase();

    if (contentType.indexOf("application/json") !== -1) {
      return JSON.parse(content);
    }

    return parseUrlEncoded_(content);
  }

  return {};
}

function parseUrlEncoded_(content) {
  if (!content) return {};

  return content.split("&").reduce(function (result, pair) {
    if (!pair) return result;

    const index = pair.indexOf("=");
    const rawKey = index >= 0 ? pair.slice(0, index) : pair;
    const rawValue = index >= 0 ? pair.slice(index + 1) : "";
    const key = decodeURIComponent(rawKey.replace(/\+/g, " "));
    const value = decodeURIComponent(rawValue.replace(/\+/g, " "));

    result[key] = value;
    return result;
  }, {});
}

function cleanText_(value, maxLength) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function cleanEmail_(value) {
  const email = cleanText_(value, 254).toLowerCase();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  if (!valid) {
    throw new Error("Invalid email address");
  }

  return email;
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br_(value) {
  return escapeHtml_(value).replace(/\r?\n/g, "<br>");
}

function createReference_() {
  const stamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone() || "Asia/Colombo",
    "yyyyMMdd-HHmmss"
  );
  const random = Math.floor(100 + Math.random() * 900);
  return "APX-" + stamp + "-" + random;
}

function rateLimit_(email) {
  const cache = CacheService.getScriptCache();
  const key =
    "contact-" + Utilities.base64EncodeWebSafe(email).slice(0, 80);

  if (cache.get(key)) {
    throw new Error("Please wait before submitting another enquiry.");
  }

  cache.put(key, "1", RATE_LIMIT_SECONDS);
}

function classifyError_(message) {
  const value = String(message || "").toLowerCase();

  if (value.indexOf("quota") !== -1) return "MAIL_QUOTA_EXCEEDED";
  if (value.indexOf("permission") !== -1 || value.indexOf("authoriz") !== -1) {
    return "MAIL_PERMISSION_REQUIRED";
  }
  if (value.indexOf("wait before submitting") !== -1) {
    return "RATE_LIMITED";
  }
  if (value.indexOf("invalid email") !== -1) return "INVALID_EMAIL";

  return "EMAIL_SEND_FAILED";
}

function ownerEmailHtml_(data) {
  return (
    '<div style="font-family:Arial,sans-serif;color:#191622;line-height:1.6;max-width:720px;margin:auto">' +
    '<div style="padding:24px 28px;background:#100b1d;color:#fff;border-radius:16px 16px 0 0">' +
    '<div style="font-size:12px;letter-spacing:2px;color:#ba91ff">' +
    BUSINESS_NAME +
    '</div><h1 style="font-size:25px;margin:8px 0 0">New project enquiry</h1></div>' +
    '<div style="padding:28px;border:1px solid #e8e2ef;border-top:0;border-radius:0 0 16px 16px">' +
    '<p><strong>Reference:</strong> ' + escapeHtml_(data.reference) + '</p>' +
    '<p><strong>Name:</strong> ' + escapeHtml_(data.name) + '</p>' +
    '<p><strong>Company:</strong> ' + escapeHtml_(data.company) + '</p>' +
    '<p><strong>Email:</strong> <a href="mailto:' + escapeHtml_(data.email) + '">' + escapeHtml_(data.email) + '</a></p>' +
    '<p><strong>Project type:</strong> ' + escapeHtml_(data.service) + '</p>' +
    '<div style="margin:22px 0;padding:18px;background:#f6f3fa;border-radius:10px">' +
    '<strong>Project brief</strong><p style="margin:8px 0 0">' + nl2br_(data.message) + '</p></div>' +
    '<p style="font-size:12px;color:#736b7c"><strong>Source:</strong> ' + escapeHtml_(data.source) + '<br>' +
    '<strong>Page:</strong> ' + escapeHtml_(data.page) + '<br>' +
    '<strong>Submitted:</strong> ' + escapeHtml_(data.submittedAt) + '<br>' +
    '<strong>User agent:</strong> ' + escapeHtml_(data.userAgent) + '</p>' +
    '</div></div>'
  );
}

function ownerEmailText_(data) {
  return [
    BUSINESS_NAME + " — New project enquiry",
    "Reference: " + data.reference,
    "Name: " + data.name,
    "Company: " + data.company,
    "Email: " + data.email,
    "Project type: " + data.service,
    "",
    "Project brief:",
    data.message,
    "",
    "Source: " + data.source,
    "Page: " + data.page,
    "Submitted: " + data.submittedAt,
    "User agent: " + data.userAgent,
  ].join("\n");
}

function clientReceiptHtml_(data) {
  return (
    '<div style="font-family:Arial,sans-serif;color:#191622;line-height:1.6;max-width:680px;margin:auto">' +
    '<div style="padding:24px 28px;background:#100b1d;color:#fff;border-radius:16px 16px 0 0">' +
    '<div style="font-size:12px;letter-spacing:2px;color:#ba91ff">' + BUSINESS_NAME + '</div>' +
    '<h1 style="font-size:25px;margin:8px 0 0">Your enquiry is with us.</h1></div>' +
    '<div style="padding:28px;border:1px solid #e8e2ef;border-top:0;border-radius:0 0 16px 16px">' +
    '<p>Hi ' + escapeHtml_(data.name) + ',</p>' +
    '<p>Thank you for contacting ' + BUSINESS_NAME + '. We received your enquiry and will review it carefully before replying.</p>' +
    '<p><strong>Reference:</strong> ' + escapeHtml_(data.reference) + '<br>' +
    '<strong>Project type:</strong> ' + escapeHtml_(data.service) + '</p>' +
    '<div style="margin:22px 0;padding:18px;background:#f6f3fa;border-radius:10px">' +
    '<strong>Your message</strong><p style="margin:8px 0 0">' + nl2br_(data.message) + '</p></div>' +
    '<p>You can reply directly to this email if you need to add anything.</p>' +
    '<p>APEX WEB Studio<br>Negombo, Sri Lanka</p>' +
    '</div></div>'
  );
}

function clientReceiptText_(data) {
  return [
    "Hi " + data.name + ",",
    "",
    "Thank you for contacting " + BUSINESS_NAME + ". We received your enquiry and will review it carefully before replying.",
    "Reference: " + data.reference,
    "Project type: " + data.service,
    "",
    "Your message:",
    data.message,
    "",
    "You can reply directly to this email if you need to add anything.",
    "",
    "APEX WEB Studio",
    "Negombo, Sri Lanka",
  ].join("\n");
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
