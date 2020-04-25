import React from "react"

import { Box, Grid } from "@material-ui/core"

export interface SpacerProps {
  grid?: boolean
  m?: number
  mb?: number
  ml?: number
  mr?: number
  mt?: number
}

/**
 * A component used to inject space where it's needed
 */
export const Spacer: React.FC<SpacerProps> = ({ grid, ...rest }) => {
  if (grid) {
    return (
      <Grid item xs={12}>
        <Box {...rest} />
      </Grid>
    )
  }
  return <Box {...rest} />
}
