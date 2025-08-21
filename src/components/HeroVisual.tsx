"use client";

export default function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Simple, clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/8 via-turquoise/6 to-rose/5" />
      
      {/* Very subtle mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/4 via-transparent to-turquoise/4" />
      
      {/* Minimal, elegant bokeh effects */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-gradient-to-br from-forest/12 to-turquoise/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute right-1/4 top-1/3 w-80 h-80 bg-gradient-to-bl from-turquoise/10 to-rose/8 rounded-full blur-3xl opacity-60" />
      <div className="absolute left-1/3 bottom-1/4 w-72 h-72 bg-gradient-to-tr from-rose/8 to-forest/10 rounded-full blur-3xl opacity-60" />
      
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(47, 93, 80, 0.15) 1px, transparent 0)`,
          backgroundSize: '80px 80px'
        }} />
      </div>
    </div>
  );
}
