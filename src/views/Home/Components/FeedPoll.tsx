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

export const FeedPollOption = () => {
  return (
    <Box mt={1} display="flex" alignItems="center">
      <Box p={1} mr={1} style={{border: `1px solid ${colors.gray2}`, borderRadius: "4px"}}>
        <Text color={colors.black100} variant="body2">Option 1</Text>
      </Box>
      <Text color={colors.black100} variant="body2" style={{fontWeight: "600"}}>48%</Text>
    </Box>
  )
}

export interface FeedPollProps extends DispatchProps {
}

export const FeedPollComponent: React.FC<FeedPollProps> = ({}) => {
  return (
    <Container py={1.5} px={2} mb={1}>
      <Text variant="body2" color={colors.gray4} style={{fontWeight: "500" }}>February 1, 2020</Text>
      <Spacer mt={1} />
      <Text variant="h6" style={{ fontWeight: 600 }}>Poll: What have you been doing?</Text>
      <Spacer mt={0.75} />
      <Text variant="body2" style={{ fontWeight: 400 }}>Kanye West is the reincarceration of God.</Text>

      <FeedPollOption />
      <FeedPollOption />
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

export const FeedPoll = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedPollComponent);
