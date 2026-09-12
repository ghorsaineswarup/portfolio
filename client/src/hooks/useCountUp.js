import { useEffect, useState } from "react";

export function useCountUp(target, duration = 900, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [target, duration, start]);

  return count;
}