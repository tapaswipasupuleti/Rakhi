import { useEffect } from "react";

function useShakeDetection(onShake) {
  useEffect(() => {
    let lastTime = 0;

    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;

      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;

      const force = Math.sqrt(x * x + y * y + z * z);

      const now = Date.now();

      if (force > 25 && now - lastTime > 2000) {
        lastTime = now;
        onShake();
      }
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [onShake]);
}

export default useShakeDetection;