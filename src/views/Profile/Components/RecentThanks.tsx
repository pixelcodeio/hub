import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { useParams } from "react-router-dom"
import { AppAction, Employee, DispatchProps } from "redux/types"
import { Box, Link, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"
import { RecentThanksPost } from "./RecentThanksPost";

export interface RecentThanksProps extends DispatchProps {
  allEmployees: Employee[]
}

export const RecentThanksComponent: React.FC<RecentThanksProps> = ({ allEmployees }) => {
  const { profileID } = useParams()
  const profile = allEmployees.find(employee => employee.id === profileID)
  if (!profile) {
    return null
  }

  const firstName = profile.name.split(" ")[0]

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Text variant="h6">Recent Thanks</Text>
          <Spacer ml={1} />
          <Text variant="h6">🙏</Text>
        </Box>
      </Box>
      <Spacer mt={2} />
      <ThankBotContainer py={1.5} px={2}>
        <Link href={`slack://app?team=${profile.teamId}&id=A012B5CK12S`}>
          <Text variant="body1" color={colors.gray4}>
            {`Thank ${firstName} by using /thanks @${profile.name} with Hub Slackbot. Try it →`}
          </Text>
        </Link>
      </ThankBotContainer>
      <Spacer mt={1} />
      {profile.receivedThanks.map((thanks, index) => (
        <RecentThanksPost thanks={thanks} key={index} />
      ))}
    </Box>
  )
}

const ThankBotContainer = muiStyled(Box)({
  borderRadius: "8px",
  border: `1px solid ${colors.gray2}`,
  backgroundColor: colors.gray1,
})

const mapStateToProps = (state: AppState) => ({
  allEmployees: state.allEmployees,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const RecentThanks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentThanksComponent);