import React from "react"
import { Box } from "@material-ui/core"
import { styled } from '@material-ui/core/styles';

export type Direction = "vertical" | "horizontal"

export interface GridListContainerProps {
  height: number
  direction: Direction
}

export const GridListContainer: React.FC<GridListContainerProps> = (props) => {
  const isVertical = props.direction === "vertical"
  return (
    <Box overflow="hidden">
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
        overflow="hidden"
        height={props.height}
        style={{
          overflowY: isVertical ? "scroll" : "hidden",
          overflowX: isVertical ? "hidden" : "scroll",
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
