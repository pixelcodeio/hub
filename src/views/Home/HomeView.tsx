import React from "react"
import { Box, Grid } from "@material-ui/core"

import { Announcements } from "./Components"
import { Spacer, Text } from "components"

export const HomeView: React.FC<any> = props => {
  return (
    <Box px={5}>
      <Grid container>
        <Spacer grid mt={5} />
        <Grid item xs={8}>
          <Announcements />
        </Grid>
      </Grid>
    </Box>
  )
}