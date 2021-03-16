import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const getImageData = (name) => {
  // query images
  const { allFile } = useStaticQuery(graphql`{
    allFile(
      filter: {name: {regex: "/^char_small_/"}, extension: {regex: "/(jpg)|(jpeg)|(png)/"}, sourceInstanceName: {eq: "images"}}
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              width: 60
              height: 60
              transformOptions: {grayscale: true}
            )
          }
          name
        }
      }
    }
  }   
  `)

  const image = getImage(allFile.edges.find(i => i.node.name === name).node)

  return image
}

const FixedGrayImageSupplier = ({
  className,
  name,
  alt,
}) => (
  <GatsbyImage
    image={getImageData(name)}
    className={className}
    alt={alt}
  />
)

export default FixedGrayImageSupplier