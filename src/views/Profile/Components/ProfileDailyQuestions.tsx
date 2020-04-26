import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Employee, FeedPost as FeedPostModel } from "redux/types"
import { useParams } from "react-router-dom"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { FeedBellIcon, FeedMessageIcon, FeedPrayIcon } from "assets"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"
import { fontWeight } from "styled-system";

export interface ProfileDailyQuestionsComponentProps extends DispatchProps {
  allEmployees: Employee[]
}

export const ProfileDailyQuestionsComponent: React.FC<ProfileDailyQuestionsComponentProps> = ({ allEmployees }) => {
  const { profileID } = useParams()
  const profile = allEmployees.find(employee => employee.id === profileID)
  if (!profile) {
    return null
  }
  console.log("P", profile)
  return (
    <>
      {
        profile.dailyQuestions.map((dailyQuestion, index) => (
          <>
            <Container py={1.5} px={2} mb={1} key={index}>
              <Text variant="body2" color={colors.gray4} style={{ fontWeight: "500" }}>{dailyQuestion.date}</Text>
              <Spacer mt={1} />
              <Text variant="h6" style={{ fontWeight: 600 }}>{dailyQuestion.question}</Text>
              <Spacer mt={0.75} />
              <Text variant="body1" style={{ fontWeight: 400 }}>{dailyQuestion.answer}</Text>
            </Container >
            <Spacer mt={1} />
          </>
        ))
      }
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
  allEmployees: state.allEmployees
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const ProfileDailyQuestions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDailyQuestionsComponent);
