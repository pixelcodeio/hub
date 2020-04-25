import React from "react"
import { Box, GridList, GridListProps } from "@material-ui/core"
import { styled } from '@material-ui/core/styles';

export type Direction = "vertical" | "horizontal"

export interface GridListContainerProps extends GridListProps {
  height: number
  direction: Direction
}

export const GridListContainer: React.FC<GridListContainerProps> = (props) => {
  const isVertical = props.direction === "vertical"
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-around"
      overflow="hidden"
      height={props.height}
      style={{
        overflowY: isVertical ? "scroll" : undefined,
        overflowX: isVertical ? undefined : "scroll",
      }}
    >
      <GridList {...props} style={{ flexWrap: !isVertical ? "nowrap" : undefined }}>
        {props.children}
      </GridList>
    </Box>
  )
}
