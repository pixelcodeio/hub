import React from "react"
import styled from "styled-components"

export interface ButtonProps {
  backgroundColor?: string
  border?: string
  borderRadius?: number,
  padding?: number,
  style?: any,
  children: any
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  backgroundColor,
  border,
  borderRadius = 0,
  padding = 0,
  style,
  onClick,
  children,
}) => {
  return (
    <HoverButton
      onClick={onClick}
      style={{
        backgroundColor,
        border,
        borderRadius,
        paddingTop: padding,
        paddingBottom: padding,
        paddingLeft: padding,
        paddingRight: padding,
        outline: "none",
        ...style
      }}>{children}</HoverButton>
  )
}

const HoverButton = styled.button`
  cursor: pointer;
  :hover {
    box-shadow: 0px 8px 16px rgba(161, 163, 166, 0.16), 0px 4px 24px rgba(161, 163, 166, 0.24);    }
`

const FilterButton = styled.button`
  border-radius: 8px;
  padding: 12px 12px;
  margin-right: 8px;
  outline: none;
`