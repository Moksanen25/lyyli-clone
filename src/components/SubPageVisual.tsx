"use client";

export default function SubPageVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle radial gradient using brand colors */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(167, 214, 209, 0.12), transparent 60%), radial-gradient(1000px 500px at 80% 10%, rgba(247, 235, 235, 0.15), transparent 60%)",
        }}
      />

      {/* Dotted grid pattern */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(167, 214, 209, 0.06) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Soft bokeh blobs (very subtle) */}
      <div className="absolute inset-0">
        <div
          className="hero-blob absolute w-40 h-40 rounded-full blur-3xl"
          style={{
            left: "15%",
            top: "25%",
            background: "rgba(47, 93, 80, 0.08)",
          }}
        />
        <div
          className="hero-blob absolute w-56 h-56 rounded-full blur-3xl"
          style={{
            right: "10%",
            top: "30%",
            background: "rgba(167, 214, 209, 0.14)",
            animationDelay: "0.4s",
          }}
        />
        <div
          className="hero-blob absolute w-48 h-48 rounded-full blur-3xl"
          style={{
            left: "50%",
            bottom: "-5%",
            transform: "translateX(-50%)",
            background: "rgba(247, 235, 235, 0.12)",
            animationDelay: "0.8s",
          }}
        />
      </div>
    </div>
  );
}
