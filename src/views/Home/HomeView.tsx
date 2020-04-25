import React from "react"
import { Box, Grid } from "@material-ui/core"

import {
  Announcements,
  Anniversaries,
  Birthdays,
  Calendar,
  FeedPost,
  Filters,
  RecentlyJoined
} from "./Components"
import { Spacer, Text } from "components"
import { FeedPostComponent } from "./Components/FeedPost"

export const HomeView: React.FC<any> = props => {
  return (
    <Box px={5}>
      <Grid container>
        <Spacer grid mt={5} />
        <Grid item xs={3}>
          <RecentlyJoined />
          <Spacer grid mt={1} />
          <Calendar />
          <Spacer grid mt={1} />
          <Birthdays />
          <Spacer grid mt={1} />
          <Anniversaries />
        </Grid>
        <Grid item xs={9} >
          <Box mx={15}>
            <Filters />
            <Spacer grid mb={3} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}