import { useEffect, useState } from "react";

export default function Bubble({color, size = 0 }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    let top = Math.random() * (window.innerHeight - size);
    let left = Math.random() * (window.innerWidth - size);
    let dx = (Math.random() - 0.5) * 5; // horizontal speed
    let dy = (Math.random() - 0.5) * 5; // vertical speed
    setVelocity({ dx, dy });
    setPosition({ top, left });

    let animationFrame;

    const move = () => {
      // bounce off walls
      if (top + dy < 0 || top + dy > window.innerHeight - size) dy = -dy;
      if (left + dx < 0 || left + dx > window.innerWidth - size) dx = -dx;

      top += dy;
      left += dx;

      setPosition({ top, left });
      setVelocity({ dx, dy });

      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [size]);

  return (
    <div
        className={`absolute rounded-full ${color} opacity-80 backdrop-blur-[100px]`}
        style={{
            width: size,
            height: size,
            top: position.top,
            left: position.left,
            boxShadow: `0 0 800px 110px ${color}`,
        }}
        />

  );
}