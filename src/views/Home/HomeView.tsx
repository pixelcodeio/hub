import React from "react"
import { Box, Grid } from "@material-ui/core"

import { Announcements, Calendar, NewHires, RecentlyJoined } from "./Components"
import { Spacer, Text } from "components"

export const HomeView: React.FC<any> = props => {
  return (
    <Box px={5}>
      <Grid container>
        <Spacer grid mt={5} />
        <Grid item xs={3}>
          <RecentlyJoined />
          <Spacer grid mt={1} />
          <Calendar />
        </Grid>
      </Grid>
    </Box>
  )
}