import { useEffect, useRef } from 'react';

/**
 * Adds a class to the element when it enters the viewport.
 * @param visibleClass - CSS class to add (default: 'reveal--visible')
 * @param threshold   - How much of the element must be visible (default: 0.15)
 */
export function useScrollReveal<T extends HTMLElement>(
  visibleClass = 'reveal--visible',
  threshold = 0.15
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(visibleClass);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleClass, threshold]);

  return ref;
}
