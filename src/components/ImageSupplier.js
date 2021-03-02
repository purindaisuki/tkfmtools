import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import BackgroundImage from 'gatsby-background-image'

const getImgFluid = (name) => {
  // query images
  const { allFile } = useStaticQuery(graphql`
    {
      allFile(filter: {
        extension: {regex: "/(jpg)|(jpeg)|(png)/"},
        sourceInstanceName: {eq: "images"}
      }) {
        edges {
          node {
            childImageSharp {
              fluid {
                originalName,
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    allFile.edges
      .find(i => i.node.childImageSharp.fluid.originalName === name)
      .node.childImageSharp.fluid
  )
}

const ImageSupplier = ({
  className,
  children,
  name,
  isBackground,
  alt,
}) => (
  isBackground
    ? <BackgroundImage
      className={className}
      fluid={getImgFluid(name)}
    >
      {children}
    </BackgroundImage>

    : <GatsbyImage
      className={className}
      fluid={getImgFluid(name)}
      alt={alt}
    />
)

export default ImageSupplier