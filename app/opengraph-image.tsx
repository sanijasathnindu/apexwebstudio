import { ImageResponse } from "next/og";

export const alt = "APEX WEB Studio — Web development company in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "white",
          background: "#06040d",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            right: -130,
            top: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #d4b1ff, #7c45f6 35%, #263da5 64%, transparent 72%)",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 72px",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a86cff, #58dfff)",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 5 }}>
                APEX
              </span>
              <span style={{ fontSize: 9, color: "#b89ae4", letterSpacing: 5 }}>
                WEB STUDIO
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 850 }}>
            <span style={{ fontSize: 15, color: "#8ee7ff", letterSpacing: 3 }}>
              SRI LANKA · SERVING CLIENTS WORLDWIDE
            </span>
            <span
              style={{
                marginTop: 20,
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: -5,
              }}
            >
              DIGITAL EXPERIENCES BUILT TO LEAD.
            </span>
            <span style={{ marginTop: 28, fontSize: 21, color: "#b9b1c6" }}>
              Web design · Web development · E-commerce · Custom applications
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
