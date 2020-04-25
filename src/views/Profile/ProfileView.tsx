import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { setCurrentPage } from 'redux/actions';
import { AppAction, DispatchProps, Page } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { FeedBellIcon } from "assets"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"
import { fontWeight } from "styled-system";
import { ProfileHeader } from "./Components"

export interface ProfileViewComponentProps extends DispatchProps {
  currentPage: Page
}

export const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({ currentPage, dispatch }) => {
  useEffect(() => {
    dispatch(setCurrentPage("Profile"))
  }, [])

  return (
    <Box style={{ backgroundColor: colors.lightYellow, height: "400px" }}>
      <Box px={5}>
        <Grid container >
          <Grid item xs={12}>
            <Spacer grid mt={6} />
            <ProfileHeader />
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

export const ProfileView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileViewComponent);
