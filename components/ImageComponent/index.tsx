import Image, { ImageProps } from "next/image";
import React from "react";

export interface ImageComponentProps extends ImageProps {
  alt: string;
}

const ImageComponent = ({ alt, src, width, ...rest }: ImageComponentProps) => {
  const isString = typeof src === "string";
  let blurDataURL = isString ? `/_next/image?url=${src}&w=16&q=1` : undefined;
  let imageSrc = src;

  return (
    <Image
      placeholder="blur"
      blurDataURL={blurDataURL}
      width={width}
      {...rest}
      src={imageSrc}
      alt={alt || ""}
    />
  );
};

export default ImageComponent;
