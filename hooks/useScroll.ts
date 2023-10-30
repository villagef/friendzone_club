import { useEffect, useState } from "react";

interface ScrollPositionProps {
  x: number;
  y: number;
}

export const useScroll = (): ScrollPositionProps => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPositionProps>({
    x: 0,
    y: 0,
  });

  const handleScroll = () => {
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};
