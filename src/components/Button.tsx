import React from "react"
import styled from "styled-components"

export interface ButtonProps {
  borderRadius?: number,
  padding?: number,
  style?: any,
  children: any
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  borderRadius = 0,
  padding = 0,
  style,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius,
        paddingTop: padding,
        paddingBottom: padding,
        paddingLeft: padding,
        paddingRight: padding,
        outline: "none",
        ...style
      }}>{children}</button>
  )
}

const FilterButton = styled.button`
  border-radius: 8px;
  padding: 12px 12px;
  margin-right: 8px;
  outline: none;
`