"use client";

import "lightbox.js-react";
import Image from "next/image";
import IProduct from "../interfaces";

interface GalleryProps {
  product: IProduct;
}

const Gallery: React.FC<GalleryProps> = ({ product }) => {

  return (
    <div className="w-full">
      {product.Images?.map((image, i) => {
        return (
            <Image
                key={`img-${i}`}
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
