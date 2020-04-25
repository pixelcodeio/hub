import React from "react"

import { Theme } from "./Theme"

export const Container: React.FC<{
  children: any
  style?: any
  insetsBottom?: boolean
  insetsTop?: boolean
  backgroundColor?: "black100" | "white100"
}> = ({ children, backgroundColor = "white100", insetsBottom = true, insetsTop = true, style }) => {
  return (
    <Theme>
      {children}
    </Theme>
  )
}