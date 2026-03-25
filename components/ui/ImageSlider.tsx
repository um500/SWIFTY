"use client";

import { useEffect, useRef } from "react";

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  if (!images || images.length === 0) return null;

  const doubledImages = [...images, ...images];

  useEffect(() => {
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (ref.current) {
        scrollAmount += 1;

        ref.current.scrollLeft = scrollAmount;

        if (scrollAmount >= ref.current.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={ref}
      className="flex overflow-x-hidden gap-2 rounded-xl"
    >
      {doubledImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="tour"
          className="h-32 w-48 object-cover rounded-lg flex-shrink-0"
        />
      ))}
    </div>
  );
}