import React from "react"

export interface ImageProps {
  length?: number
  url: string
  borderRadius?: number
  style?: any
}

export const Image: React.FC<ImageProps> = ({ length, url, borderRadius, style }) => {
  const radius = borderRadius || (length || 0) / 2
  return (
    <img src={url} height={length} width={length} style={{ borderRadius: radius, ...style }} />
  )
}
