import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import BackgroundImage from 'gatsby-background-image'

import QueryImage from 'components/QueryImage';
import QueryGrayImage from 'components/QueryGrayImage';

// Helper functions.
const getBgImageType = imageData => imageData.layout === 'fixed' ? 'fixed' : 'fluid'
const getAspectRatio = imageData => imageData.width / imageData.height
const getPlaceholder = imageData => {
  if (imageData.placeholder) {
    return imageData.placeholder.fallback.includes(`base64`) ?
      { base64: imageData.placeholder.fallback }
      : { tracedSVG: imageData.placeholder.fallback }
  }
  return {}
}

/**
 * Tries to Backport the new `gatsbyImageData` type to the classic `fluid` / `fixed` form.
 *
 * @param imageData   {object}    The image data to convert.
 * @returns {{}}
 */
const convertToBgImage = imageData => {
  if (imageData && imageData.layout) {
    const returnBgObject = {}
    const bgType = getBgImageType(imageData)
    const aspectRatio = getAspectRatio(imageData)
    const placeholder = getPlaceholder(imageData)
    returnBgObject[bgType] = {
      ...imageData.images.fallback,
      ...placeholder,
      aspectRatio,
    }
    return returnBgObject
  }
  return {}
}

const ImageSupplier = ({
  className,
  children,
  name,
  isBackground,
  grayscale,
  alt,
}) => (
  isBackground
    ? grayscale
      ? <BackgroundImage
        className={className}
        {...convertToBgImage(QueryGrayImage(name))}
        alt={alt}
      >
        {children}
      </BackgroundImage>
      : <BackgroundImage
        className={className}
        {...convertToBgImage(QueryImage(name))}
        alt={alt}
      >
        {children}
      </BackgroundImage>
    : <GatsbyImage image={QueryImage(name)} className={className} alt={alt} />
)

export default ImageSupplier