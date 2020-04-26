import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import { AppState } from 'redux/reducer';
import { setCurrentPage, fetchAllProfiles, fetchProfile } from 'redux/actions';
import { AppAction, DispatchProps, Employee, Page } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { FeedBellIcon } from "assets"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"
import { fontWeight } from "styled-system";
import { ProfileHeader, Featured, ProfileFeedPost, RecentThanks, } from "./Components"

export interface ProfileViewComponentProps extends DispatchProps {
  currentPage: Page
  allEmployees: Employee[]
}

export const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({ currentPage, dispatch, allEmployees }) => {
  const { profileID } = useParams()
  console.log("PROFILE ID:", profileID)
  useEffect(() => {
    dispatch(setCurrentPage("Profile"))
    if (allEmployees.length === 0) {
      dispatch(fetchAllProfiles())
    }
  }, [])

  if (allEmployees.length === 0) {
    return null
  }

  const filteredProfiles = allEmployees.filter(employee => employee.id === profileID)

  if (filteredProfiles.length === 0) {
    return null
  }


  return (
    <Box>
      <Box style={{ backgroundColor: colors.lightYellow }} pb={5}>
        <Box px={5}>
          <Grid container >
            <Grid item xs={12}>
              <Spacer grid mt={6} />
              <ProfileHeader />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box py={5} px={5}>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Featured />
          </Grid>
          <Grid item xs={6}>
            <ProfileFeedPost />
            <ProfileFeedPost />
            <ProfileFeedPost />
          </Grid>
          <Grid item xs={3}>
            <RecentThanks />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  currentPage: state.currentPage,
  allEmployees: state.allEmployees,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const ProfileView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileViewComponent);
