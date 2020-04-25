import React from "react"

export interface ImageProps {
  length: number
  url: string
}

export const Image: React.FC<ImageProps> = ({ length, url }) => {
  return (
    <img src={url} height={length} width={length} style={{ borderRadius: length / 2 }} />
  )
}
