import { useEffect, useRef, useState } from "react";

export function useInView(options = { threshold: 0.15, once: true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);

        if (options.once) {
          observer.unobserve(element);
        }
      } else if (!options.once) {
        setIsVisible(false);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}