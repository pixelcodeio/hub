import React from "react"
import { Link as RouterLink, LinkProps } from "react-router-dom"

export const Link: React.FC<LinkProps> = (props) => {
  return (
    <RouterLink {...props} style={{ textDecoration: "none" }}>
      {props.children}
    </RouterLink>
  )
}