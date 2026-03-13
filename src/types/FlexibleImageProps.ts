// This is the object next.js creates when importing a local image
import { StaticImageData } from 'next/image';

export interface FlexibleImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}
