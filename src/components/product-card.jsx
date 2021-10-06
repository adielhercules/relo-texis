import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { formatPrice } from "../utils/format-price"
import {
  productCardStyle,
  productHeadingStyle,
  productImageStyle,
  productDetailsStyle,
  productVendorStyle,
  productPrice,
  priceReduction,
} from "./product-card.module.css"

export function ProductCard({ product, eager }) {
  const {
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
    vendor,
    storefrontImages,
    variants,
  } = product

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  const compareAtPrice = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variants?.length > 0 ? variants[0]?.compareAtPrice : 0
  )

  const defaultImageHeight = 200
  const defaultImageWidth = 200
  let storefrontImageData = {}
  if (
    storefrontImages &&
    storefrontImages.edges &&
    storefrontImages.edges.length > 0
  ) {
    const storefrontImage = storefrontImages.edges[0].node
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: "fixed",
        width: defaultImageWidth,
        height: defaultImageHeight,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const hasImage =
    firstImage || Object.getOwnPropertyNames(storefrontImageData || {}).length

  return (
    <Link className={productCardStyle} to={slug} aria-label={`Ver ${title}`}>
      {hasImage ? (
        <div className={productImageStyle} data-name="product-image-box">
          <GatsbyImage
            alt={firstImage?.altText ?? title}
            image={firstImage?.gatsbyImageData ?? storefrontImageData}
            loading={eager ? "eager" : "lazy"}
          />
        </div>
      ) : (
        <div
          style={{
            height: defaultImageHeight,
            width: defaultImageWidth,
            backgroundColor: "#f2f2f2",
          }}
        />
      )}
      <div className={productDetailsStyle}>
        <h2 as="h2" className={productHeadingStyle}>
          {title}
        </h2>
        <div className={productPrice}>
          <span>{price}</span>
          {
            <>
              {variants?.length > 0 &&
                variants[0]?.compareAtPrice &&
                variants[0]?.compareAtPrice !==
                  priceRangeV2.minVariantPrice.amount && (
                  <span className={priceReduction}>{compareAtPrice}</span>
                )}
            </>
          }
        </div>
      </div>
    </Link>
  )
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      id
      altText
      gatsbyImageData(aspectRatio: 1, width: 640)
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants {
      compareAtPrice
    }
    vendor
    status
  }
`
