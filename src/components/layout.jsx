import * as React from "react"
import { SkipNavContent, SkipNavLink } from "./skip-nav"
import { Header } from "./header"
import { Footer } from "./footer"
import { Seo } from "./seo"
import { container } from './layout.module.css';

export function Layout({ children }) {
  return (
    <div>
      <Seo />
      <SkipNavLink />
      <Header />
      <SkipNavContent><div className={container}>{children}</div></SkipNavContent>
      <Footer />
    </div>
  )
}
