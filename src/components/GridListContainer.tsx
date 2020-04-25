import React from "react"
import { Box } from "@material-ui/core"
import { styled } from '@material-ui/core/styles';

export interface GridListContainerProps {
  height: number
}

export const GridListContainer: React.FC<GridListContainerProps> = (props) => {
  return (
    <Box overflow="hidden">
      <Box display="flex" flexWrap="wrap" justifyContent="space-around" overflow="hidden" height={props.height} style={{ overflowY: "scroll" }}>
        {props.children}
      </Box>
    </Box>
  )
}
