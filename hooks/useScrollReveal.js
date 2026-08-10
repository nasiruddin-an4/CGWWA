'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal() {
  const observerRef = useRef(null);

  const observe = useCallback((el) => {
    if (!el) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;
              const delay = target.dataset.revealDelay || '0';
              target.style.transitionDelay = `${delay}ms`;
              target.classList.add('revealed');
              observerRef.current?.unobserve(target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '-20px 0px' }
      );
    }
    observerRef.current.observe(el);
  }, []);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return observe;
}
