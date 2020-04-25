import React, { ReactNode } from "react"

import { Typography } from "@material-ui/core"
import { Variant as TypographyVariant } from "@material-ui/core/styles/createTypography"

import { colors } from "theme/colors"

export interface TextProps {
  children: ReactNode
  color?: string
  opacity?: number
  style?: any
  variant?: TypographyVariant
}

export const Text: React.FunctionComponent<TextProps> = ({
  children,
  color = colors.black100,
  opacity = 1,
  variant,
  style = {},
  ...rest
}) => {
  const finalStyle = { ...style }
  finalStyle.color = color
  finalStyle.opacity = opacity
  return (
    <Typography {...rest} variant={variant} style={finalStyle}>
      {children}
    </Typography>
  )
}