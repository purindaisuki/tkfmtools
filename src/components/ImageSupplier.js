import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import BackgroundImage from 'gatsby-background-image'

const ImageSupplier = ({
  className,
  children,
  name,
  isBackground,
  alt,
}) => {
  const data = useStaticQuery(graphql`
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

  const dataObject = {}

  data.allFile.edges.map(item => {
    dataObject[
      item.node.childImageSharp.fluid.originalName
    ] = item.node.childImageSharp.fluid
  })

  return (
    isBackground
      ? <BackgroundImage
        className={className}
        fluid={dataObject[name]}
      >
        {children}
      </BackgroundImage>
      
      : <GatsbyImage
        className={className}
        fluid={dataObject[name]}
        alt={alt}
      />
  )
}

export default ImageSupplier