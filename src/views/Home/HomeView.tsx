import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { Box, Grid } from "@material-ui/core"
import { setCurrentPage } from 'redux/actions';
import { AppAction, DispatchProps, Page } from "redux/types"
import { AppState } from 'redux/reducer';

import {
  Announcements,
  Anniversaries,
  Birthdays,
  Calendar,
  FeedPost,
  Filters,
  RecentlyJoined,
  Celebrations,
} from "./Components"
import { Spacer, Text } from "components"
import { FeedPostComponent } from "./Components/FeedPost"
import { colors } from "theme/colors"

export interface HomeViewComponentProps extends DispatchProps { }

export const HomeViewComponent: React.FC<HomeViewComponentProps> = ({ dispatch }) => {

  useEffect(() => {
    dispatch(setCurrentPage("Home"))
  }, [])

  return (
    <Box>
      <Box style={{ backgroundColor: colors.lightTeal, height: "394px" }}>
        <Box px={5}>
          <Grid container >
            <Grid item xs={12}>
              <Spacer grid mt={6} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box px={5}>
        <Grid container >
          <Spacer grid mt={5} />
          <Grid item xs={3}>
            <Celebrations />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  currentPage: state.currentPage
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const HomeView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeViewComponent);
