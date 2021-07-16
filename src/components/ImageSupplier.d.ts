import React from "react";

interface ImageSupplierProps {
  name: string;
  isBackground?: boolean;
  grayscale?: boolean;
  alt: string;
}

declare const ImageSupplier: React.FC<ImageSupplierProps>;

export default ImageSupplier;
