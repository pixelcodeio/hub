import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, FeedPost as FeedPostModel } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { FeedBellIcon, FeedMessageIcon, FeedPrayIcon } from "assets"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"
import { fontWeight } from "styled-system";

export interface ProfileFeedPostProps extends DispatchProps {
}

export const ProfileFeedPostComponent: React.FC<ProfileFeedPostProps> = ({}) => {
  return (
    <Container py={1.5} px={2} mb={1}>
      <Text variant="body2" color={colors.gray4} style={{fontWeight: "500" }}>February 1, 2020</Text>
      <Spacer mt={1} />
      <Text variant="h6" style={{ fontWeight: 600 }}>Who is your favorite artist?</Text>
      <Spacer mt={0.75} />
      <Text variant="body2" style={{ fontWeight: 400 }}>Kanye West is the reincarceration of God.</Text>
    </Container>
  )
}

const Container = muiStyled(Box)({
  borderRadius: "8px",
  backgroundColor: colors.white100,
  border: `1px solid ${colors.gray2}`,
  boxSizing: "border-box",
})

const mapStateToProps = (state: AppState) => ({
  anniversaries: state.anniversaries
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const ProfileFeedPost = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileFeedPostComponent);
