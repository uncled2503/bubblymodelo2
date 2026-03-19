"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: Image[];
}

export const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 overflow-hidden rounded-2xl shadow-2xl aspect-square">
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "overflow-hidden rounded-lg border-2 transition-all aspect-square",
              selectedImage.src === image.src
                ? "border-teal-500 ring-2 ring-teal-200"
                : "border-transparent hover:border-gray-300"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};