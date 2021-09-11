import * as React from "react"
import {
  addToCart as addToCartStyle,
  messenger,
  phone,
} from "./add-to-cart.module.css"

export function AddToCart(props) {
  return (
    <>
      <a
        className={addToCartStyle}
        target="_blank"
        href="https://api.whatsapp.com/send?phone=+50370344369"
        {...props}
      >
        Whatsapp
      </a>
      <a
        className={messenger}
        target="_blank"
        href="https://m.me/adielhercules"
        {...props}
      >
        Messenger
      </a>
      <a className={phone} href="tel://+50370344369" {...props}>
        Llamar al 7034-4369
      </a>
    </>
  )
}
