import React from "react"

export interface ImageProps {
  length?: number
  width?: number,
  height?: number,
  url: string
  borderRadius?: number
  style?: any
}

export const Image: React.FC<ImageProps> = ({ length, url, borderRadius, style, width = 0, height = 0 }) => {
  const radius = borderRadius || (length || 0) / 2
  const finalWidth = length || width
  const finalHeight = length || height
  return (
    <img src={url} height={finalHeight} width={finalWidth} style={{ borderRadius: radius, ...style }} />
  )
}
