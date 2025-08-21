"use client";

export default function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* A. Base radial gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(1200px 620px at 50% 18%, #F4FAF7 0%, #FFFFFF 65%)'
        }}
      />

      {/* B. Dotted grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(47, 93, 80, 0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.35
        }}
      />

      {/* C. Bokeh blobs */}
      <div className="absolute inset-0">
        <span 
          className="hero-blob absolute rounded-full"
          style={{
            top: '-10%',
            left: '-8%',
            width: '38vmin',
            height: '38vmin',
            background: '#A7D6D1',
            opacity: 0.16,
            filter: 'blur(36px)',
            mixBlendMode: 'soft-light'
          }}
        />
        <span 
          className="hero-blob absolute rounded-full"
          style={{
            top: '8%',
            right: '-12%',
            width: '32vmin',
            height: '32vmin',
            background: '#A7D6D1',
            opacity: 0.16,
            filter: 'blur(36px)',
            mixBlendMode: 'soft-light'
          }}
        />
        <span 
          className="hero-blob absolute rounded-full"
          style={{
            bottom: '-14%',
            right: '-10%',
            width: '46vmin',
            height: '46vmin',
            background: '#A7D6D1',
            opacity: 0.16,
            filter: 'blur(36px)',
            mixBlendMode: 'soft-light'
          }}
        />
        <span 
          className="hero-blob absolute rounded-full"
          style={{
            top: '34%',
            left: '-14%',
            width: '34vmin',
            height: '34vmin',
            background: '#A7D6D1',
            opacity: 0.16,
            filter: 'blur(36px)',
            mixBlendMode: 'soft-light'
          }}
        />
        <span 
          className="hero-blob absolute rounded-full"
          style={{
            bottom: '18%',
            left: '-12%',
            width: '28vmin',
            height: '28vmin',
            background: '#A7D6D1',
            opacity: 0.16,
            filter: 'blur(36px)',
            mixBlendMode: 'soft-light'
          }}
        />
        <span 
          className="hero-blob absolute rounded-full"
          style={{
            top: '22%',
            right: '-6%',
            width: '28vmin',
            height: '28vmin',
            background: '#2F5D50',
            opacity: 0.12,
            filter: 'blur(36px)',
            mixBlendMode: 'soft-light'
          }}
        />
      </div>

      {/* D. Bottom fade for seamless transition */}
      <div 
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
        }}
      />
    </div>
  );
}
