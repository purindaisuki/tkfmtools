import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const QueryImage = (name) => {
  // query images
  const { allFile } = useStaticQuery(graphql`{
    allFile(
      filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, sourceInstanceName: {eq: "images"}}
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED, 
              layout: FULL_WIDTH
            )
          }
          name
        }
      }
    }
  }
  `)
  
  return getImage(allFile.edges.find(i => i.node.name === name).node)
}

export default QueryImage