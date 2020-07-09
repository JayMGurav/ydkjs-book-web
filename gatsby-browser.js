// custom typefaces
import React from "react"
import ThemeContextProvider from "./theme.js"
import "typeface-montserrat"
import "typeface-merriweather"

require("./prism-vsc-dark-plus.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

export const wrapRootElement = ({ element, props }) => {
  return <ThemeContextProvider {...props}>{element}</ThemeContextProvider>
}
