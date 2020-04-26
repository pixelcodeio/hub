import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Homepage } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { FeedBellIcon, FeedMessageIcon, FeedPrayIcon } from "assets"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"
import { fontWeight } from "styled-system";
import { FeedPoll } from "./FeedPoll"

export interface FeedPollsComponentProps extends DispatchProps {
  homepage?: Homepage
}

export const FeedPollsComponent: React.FC<FeedPollsComponentProps> = ({ homepage }) => {
  const polls = homepage?.polls
  if (!polls) {
    return null
  }
  return (
    <>
      {polls.map((poll, index) => (
        <FeedPoll poll={poll} key={index} />
      ))}
    </>
  )
}

const Container = muiStyled(Box)({
  borderRadius: "8px",
  backgroundColor: colors.white100,
  border: `1px solid ${colors.gray2}`,
  boxSizing: "border-box",
})

const mapStateToProps = (state: AppState) => ({
  homepage: state.homepage
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const FeedPolls = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedPollsComponent);
