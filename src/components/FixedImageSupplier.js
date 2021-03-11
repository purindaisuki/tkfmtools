import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const getImageData = (name) => {
    // query images
    const { allFile } = useStaticQuery(graphql`{
        allFile(
        filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, sourceInstanceName: {eq: "images"}}
        ) {
        edges {
            node {
            childImageSharp {
                gatsbyImageData(layout: FIXED)
            }
            name
            }
        }
        }
    }
  `)

    const image = allFile.edges.find(i => i.node.name === name)
        .node.childImageSharp.gatsbyImageData

    return image
}

const ImageSupplier = ({
    className,
    name,
    alt,
}) => (
    <GatsbyImage image={getImageData(name)} className={className} alt={alt} />
)

export default ImageSupplier