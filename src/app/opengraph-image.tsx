import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.designation}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1512",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              border: "2px solid #2b3a31",
              color: "#4ade80",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            {">_"}
          </div>
          <div style={{ display: "flex", color: "#93a89c", fontSize: 28 }}>
            {`@${site.handle}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#e8f0ea", fontSize: 88, fontWeight: 700 }}>
            {site.name}
          </div>
          <div style={{ color: "#4ade80", fontSize: 40, marginTop: 8 }}>
            {site.designation}
          </div>
          <div style={{ color: "#93a89c", fontSize: 28, marginTop: 20 }}>
            {`${site.location} · MERN learner · Content Writer`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 8,
            width: "100%",
            background: "linear-gradient(90deg,#4ade80,#5ec8d8)",
            borderRadius: 999,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
