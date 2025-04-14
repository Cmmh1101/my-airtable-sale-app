"use client";

import { useEffect } from "react";
import { SlideshowLightbox, initLightboxJS } from "lightbox.js-react";
import "lightbox.js-react";
import Image from "next/image";
import IProduct from "../interfaces";

interface GalleryProps {
  product: IProduct;
}

const Gallery: React.FC<GalleryProps> = ({ product }) => {
  //   useEffect(() => {
  //     initLightboxJS(
  //       process.env.NEXT_PUBLIC_LIGHTBOX_KEY!,
  //       process.env.NEXT_PUBLIC_LIGHTBOX_PLAN!
  //     );
  //   }, []);

  return (
    <div className="w-full">
      {/* <SlideshowLightbox
        lightboxIdentifier={`lightbox-${product.id}`}
        theme="lightbox"
        framework="next"
        images={product.Images?.map((img) => img.url)}
        showThumbnails={true}
        thumbnailBorder="silver"
        imgAnimation="fade"
        className="grid grid-cols-2 md:grid-cols-3 gap-2"
      >
        {product.Images?.map((image, i) => (
          <div key={`${product.id}-${i}`} className="relative aspect-square overflow-hidden">
            <Image
              src={image.url}
              alt={`${product.Name} ${i + 1}`}
              fill
              quality={80}
              data-lightboxjs={`lightbox-${product.id}`}
              className="object-cover rounded-lg opacity-80 hover:opacity-100 transition hover:scale-105 duration-500 ease-in-out"
            />
          </div>
        ))}
      </SlideshowLightbox> */}
      {product.Images?.map((image, i) => {
        return (
          <Image
            src={image.url}
            alt={product.Name}
            className="rounded"
            width={180}
            height={38}
            priority
          />
        );
      })}
    </div>
  );
};

export default Gallery;
