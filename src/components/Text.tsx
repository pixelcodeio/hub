import React, { ReactNode } from "react"

import { Link, Typography } from "@material-ui/core"
import { Variant as TypographyVariant } from "@material-ui/core/styles/createTypography"

import { colors } from "theme/colors"

export interface TextProps {
  children: ReactNode
  color?: string
  opacity?: number
  style?: any
  variant?: TypographyVariant
  underline?: boolean,
  onClick?: () => void
}

export const Text: React.FunctionComponent<TextProps> = ({
  children,
  color = colors.black100,
  opacity = 1,
  variant,
  underline,
  onClick,
  style = {},
  ...rest
}) => {
  const finalStyle = { ...style }
  finalStyle.color = color
  finalStyle.opacity = opacity
  if (underline) {
    finalStyle.textDecoration = "underline"
  }
  return (
    <Typography {...rest} variant={variant} style={finalStyle}>
      <Link style={{ textDecoration: "none", ...finalStyle }} onClick={onClick}>
        {children}
      </Link>
    </Typography>
  )
}