import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import BackgroundImage from 'gatsby-background-image'
import FixedGrayImageSupplier from 'components/FixedGrayImageSupplier';
import FixedImageSupplier from 'components/FixedImageSupplier';

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

const getImageData = (name, isBackground) => {
  // query images
  const { allFile } = useStaticQuery(graphql`{
    allFile(
      filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, sourceInstanceName: {eq: "images"}}
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
          }
          name
        }
      }
    }
  }
  `)

  const image = allFile.edges.find(i => i.node.name === name)
    .node.childImageSharp.gatsbyImageData


  return isBackground ? convertToBgImage(image) : image
}

const ImageSupplier = ({
  className,
  children,
  name,
  fixed,
  grayscale,
  isBackground,
  alt,
}) => (
  fixed
    ? grayscale
      ? <FixedGrayImageSupplier className={className} name={name} alt={alt} />
      : <FixedImageSupplier className={className} name={name} alt={alt} />
    : isBackground
      ? <BackgroundImage
        className={className}
        {...getImageData(name, isBackground)}
      >
        {children}
      </BackgroundImage>
      : <GatsbyImage image={getImageData(name, isBackground)} className={className} alt={alt} />
)

export default ImageSupplier