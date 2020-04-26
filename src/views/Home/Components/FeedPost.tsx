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

export interface FeedPostProps extends DispatchProps {
  feedPost: FeedPostModel
}

export const FeedPostComponent: React.FC<FeedPostProps> = ({ feedPost }) => {
  let icon
  switch (feedPost.type) {
    case "Thanks":
      icon = <FeedPrayIcon />
    default:
      icon = <FeedMessageIcon />
  }
  return (
    <Container py={2} px={2} mb={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {icon}
          <Spacer ml={1} />
          <Text variant="body2" style={{ color: `${colors.gray4}`, fontWeight: "500" }}>February 1, 2020</Text>
        </Box>
      </Box>
      <Spacer mt={1.5} />
      <Text variant="body1" style={{ fontWeight: 600 }}>TK Kong thanked Kevin Chan.</Text>
      <Spacer mt={1} />
      <Text variant="body1" style={{ fontWeight: 400 }}>Today, I am working on squashing some bugs and tomorrow probably too.</Text>
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
  anniversaries: []
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const FeedPost = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedPostComponent);
