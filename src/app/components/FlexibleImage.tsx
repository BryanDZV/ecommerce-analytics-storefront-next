import React from 'react';
import Image from 'next/image';
import { FlexibleImageProps } from '@/types/FlexibleImageProps';

function FlexibleImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  placeholder = 'empty',
}: FlexibleImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      // width and height props are used to infer the correct aspect ratio of the image and
      // avoid layout shift from the image loading
      // ! they do not determine the rendered size of the image file,
      // ! they must define a correct aspect ratio
      width={width}
      height={height}
      // ! This value greatly affects performace for images using fill
      sizes={sizes}
      // true -> High priority and lazy loading will be disabled
      priority={priority}
      placeholder={placeholder}
    />
  );
}

export default FlexibleImage;
