"use client";

import styles from './HeroVisual.module.css';

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
        <span className={styles.heroBlob + ' ' + styles.heroBlobA} />
        <span className={styles.heroBlob + ' ' + styles.heroBlobB} />
        <span className={styles.heroBlob + ' ' + styles.heroBlobC} />
        <span className={styles.heroBlob + ' ' + styles.heroBlobD} />
        <span className={styles.heroBlob + ' ' + styles.heroBlobE} />
        <span className={styles.heroBlob + ' ' + styles.heroBlobF} />
      </div>

      {/* D. Bottom fade */}
      <div 
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
        }}
      />
    </div>
  );
}
