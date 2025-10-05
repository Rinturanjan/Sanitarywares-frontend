import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-5 h-5 bg-transparent border-2 border-white rounded-full pointer-events-none z-[1000]">
    </div>
  );
};

export default CustomCursor;
