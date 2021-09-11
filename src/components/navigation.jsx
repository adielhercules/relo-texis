import { graphql, useStaticQuery, Link } from "gatsby"
import * as React from "react"
import slugify from "@sindresorhus/slugify"
import {
  navStyle,
  navLink,
  activeLink,
  menu,
  overlay,
  button
} from "./navigation.module.css"

export function Navigation({ className }) {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)
  const [visible, setVisible] = React.useState(false)

  const toggle = React.useCallback(() => {
    setVisible((current) => !current)
  }, [])

  const hide = React.useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <>
      <nav className={[navStyle, className].join(" ")}>
        <Link
          key="All"
          className={navLink}
          to="/products/"
          activeClassName={activeLink}
        >
          TODO
        </Link>
        <button onClick={toggle} className={button}>Seleccionar categoria</button>
      </nav>
      {visible && (
        <>
          <div className={menu}>
            {productTypes.map((name) => (
              <Link
                key={name}
                className={navLink}
                to={`/products/${slugify(name)}`}
                activeClassName={activeLink}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className={overlay} onClick={hide} />
        </>
      )}
    </>
  )
}
