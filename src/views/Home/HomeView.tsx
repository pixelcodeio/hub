import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { Box, Grid } from "@material-ui/core"
import { fetchHomepage, fetchProfile, fetchAllProfiles, setCurrentPage } from 'redux/actions';
import { AppAction, DispatchProps, Employee, Homepage } from "redux/types"
import { AppState } from 'redux/reducer';

import {
  Announcements,
  Anniversaries,
  Birthdays,
  Calendar,
  FeedPost,
  Filters,
  RecentlyJoined,
  RecentHires,
  Celebrations,
  FeedPoll,
  FeedPolls,
  SimilarInterests,
} from "./Components"
import { Spacer, Text } from "components"
import { FeedPostComponent } from "./Components/FeedPost"
import { colors } from "theme/colors"

export interface HomeViewComponentProps extends DispatchProps {
  allEmployees: Employee[]
  homepage?: Homepage
  user?: Employee
}

export const HomeViewComponent: React.FC<HomeViewComponentProps> = ({ dispatch, allEmployees, user, homepage }) => {
  useEffect(() => {
    dispatch(setCurrentPage("Home"))
    if (!user) {
      dispatch(fetchProfile("U012HSXKLKC"))
    }
    if (allEmployees.length === 0) {
      dispatch(fetchAllProfiles())
    }
    if (!homepage) {
      dispatch(fetchHomepage("U012HSXKLKC"))
    }
  }, [])

  if (!user || allEmployees.length === 0 || !homepage) {
    return null
  }

  return (
    <Box>
      <Box style={{ backgroundColor: colors.lightTeal, height: "400px" }}>
        <Box px={5}>
          <Grid container >
            <Grid item xs={12}>
              <RecentHires />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Spacer grid mt={5} />
      <Box px={5}>
        <Grid container spacing={5} >
          <Grid item xs={3}>
            <Celebrations />
          </Grid>
          <Grid item xs={6}>
            <FeedPolls />
          </Grid>
          <Grid item xs={3}>
            <SimilarInterests />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  allEmployees: state.allEmployees,
  homepage: state.homepage,
  user: state.user,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const HomeView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeViewComponent);
