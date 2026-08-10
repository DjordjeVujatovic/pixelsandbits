import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "pixels&bits — product engineering & ai deployment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#05080d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #05080d, #5ee0e0 30%, #c6f24e 70%, #05080d)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", fontSize: 84, fontWeight: 600 }}>
          <span style={{ color: "#c6f24e" }}>$</span>
          <span style={{ color: "#ffffff", marginLeft: 24 }}>pixels&bits</span>
          <div style={{ width: 22, height: 66, background: "#c6f24e", marginLeft: 16 }} />
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8fa3b8", marginTop: 30 }}>
          product engineering & ai deployment
        </div>
      </div>
    ),
    size,
  );
}
