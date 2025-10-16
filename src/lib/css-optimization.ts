// CSS optimization utilities

export function optimizeCriticalCSS() {
  if (typeof window === 'undefined') return;

  // Critical CSS is already inlined in globals.css
  // This function handles dynamic CSS optimization
  
  // Remove unused CSS classes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Add any dynamic CSS optimization logic here
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}

export function preloadCriticalCSS() {
  if (typeof window === 'undefined') return;

  // Preload critical CSS for above-the-fold content
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .hero-title {
      font-family: var(--font-playfair);
      font-size: 3rem;
      font-weight: 700;
      color: var(--color-forest);
      line-height: 1.2;
    }
    
    .hero-subtitle {
      font-family: var(--font-inter);
      font-size: 1.25rem;
      color: var(--color-medium-gray);
      line-height: 1.6;
    }
    
    /* Prevent layout shift during font loading */
    .font-loading * {
      font-family: system-ui, -apple-system, sans-serif !important;
    }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  style.setAttribute('data-critical', 'true');
  document.head.insertBefore(style, document.head.firstChild);
}

export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Add intersection observer for lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  });

  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });

  return () => imageObserver.disconnect();
}

export function reserveSpaceForContent() {
  if (typeof window === 'undefined') return;

  // Add CSS to prevent CLS
  const style = document.createElement('style');
  style.textContent = `
    /* Reserve space for dynamic content */
    .reserve-space {
      min-height: 200px;
    }
    
    /* Aspect ratio containers */
    .aspect-video {
      aspect-ratio: 16 / 9;
    }
    
    .aspect-square {
      aspect-ratio: 1 / 1;
    }
    
    .aspect-4-3 {
      aspect-ratio: 4 / 3;
    }
    
    /* Image containers with reserved space */
    .image-container {
      position: relative;
      overflow: hidden;
    }
    
    .image-container::before {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
    }
    
    .image-container img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    /* Skeleton loading states */
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;
  
  document.head.appendChild(style);
}
