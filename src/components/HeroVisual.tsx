"use client";

export default function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base radial gradient */}
      <div className="absolute inset-0 hero-bg-radial" />
      
      {/* Dotted grid texture */}
      <div className="absolute inset-0 hero-bg-dots" />
      
      {/* Floating bokeh blobs */}
      <div className="absolute inset-0">
        <span className="hero-blob hero-blob-a" />
        <span className="hero-blob hero-blob-b" />
        <span className="hero-blob hero-blob-c" />
        <span className="hero-blob hero-blob-d" />
        <span className="hero-blob hero-blob-e" />
        <span className="hero-blob hero-blob-f" />
        <span className="hero-blob hero-blob-g" />
        <span className="hero-blob hero-blob-h" />
      </div>
    </div>
  );
}
