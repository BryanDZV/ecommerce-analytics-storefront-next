import React from 'react';
import Image from 'next/image';
import staticImage from '../../../public/globe.svg';

function FlexibleImage() {
  return <Image src={staticImage} alt="Placeholder" width={500} height={500} />;
}

export default FlexibleImage;
