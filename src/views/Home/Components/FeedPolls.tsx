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
  // const polls = homepage?.polls
  // if (!polls) {
  //   return null
  // }
  const polls = [
    {
      id: "1",
      options: ["Binging Netflix", "Learning how to cook", "Sleeping in"],
      percentages: [48, 32, 20],
      text: "What have you been doing?",
      date: "April 22, 2020",
      votes: {},
    },
    {
      id: "2",
      options: ["Chipotle", "Taste of Thai", "Wings Over"],
      percentages: [15, 61, 24],
      text: "What food should I order for dinner?",
      date: "April 20, 2020",
      votes: {},
    },
    {
      id: "3",
      options: ["Hoodie and sweatpants", "T-shirt and shorts", "Whatever is most convenient"],
      percentages: [27, 23, 50],
      text: "Favorite outfit for quarantine?",
      date: "April 19, 2020",
      votes: {},
    },
  ]
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
