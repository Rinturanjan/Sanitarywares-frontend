import { useState, useEffect } from "react";
import gsap from "gsap";

export default function SplitText({ text = "" }) {
  const [splittedText, setSplittedText] = useState([]);

  useEffect(() => {
    setSplittedText(text.split(""));
  }, [text]);

  useEffect(() => {
    const letters = gsap.utils.toArray(".letter");
    console.log("Letters found:", letters); // Debugging line

    if (letters.length === 0) return; // Ensure elements exist before adding event listeners

    const onMouseEnter = (event) => {
      gsap.to(event.target, { scale: 1.5, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = (event) => {
      gsap.to(event.target, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    letters.forEach((letter) => {
      letter.addEventListener("mouseenter", onMouseEnter);
      letter.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      letters.forEach((letter) => {
        letter.removeEventListener("mouseenter", onMouseEnter);
        letter.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [splittedText]);

  return (
    <h1 className="cursor-pointer">
      {splittedText.map((letter, index) => (
        <span key={index} className="letter inline-block mr-2">
          {letter}
        </span>
      ))}
    </h1>
  );
}
