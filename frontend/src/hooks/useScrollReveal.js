import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('revealed');
          // Stagger effect for cards
          if (el.dataset.index) {
            el.style.transitionDelay = `${parseInt(el.dataset.index) * 120}ms`;
          }
          observer.unobserve(el);
        }
      });
    };
    const observer = new window.IntersectionObserver(revealOnScroll, {
      threshold: 0.15
    });
    revealElements.forEach(el => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal; 