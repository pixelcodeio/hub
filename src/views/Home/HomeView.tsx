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
} from "./Components"
import { Spacer, Text } from "components"
import { FeedPostComponent } from "./Components/FeedPost"

export interface HomeViewComponentProps extends DispatchProps { }

export const HomeViewComponent: React.FC<HomeViewComponentProps> = ({ dispatch }) => {

  useEffect(() => {
    dispatch(setCurrentPage("Home"))
  }, [])

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
            <Spacer grid mb={3} />
          </Box>
        </Grid>
      </Grid>
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
