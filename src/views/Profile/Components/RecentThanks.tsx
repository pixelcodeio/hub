import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, NewHire, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"
import { RecentThanksPost } from "./RecentThanksPost";

export interface RecentThanksProps extends DispatchProps {
  companyName: string
  newHires: NewHire[]
}

export const RecentThanksComponent: React.FC<RecentThanksProps> = ({ companyName, newHires }) => {
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
          <Text variant="body1" color={colors.gray4}>Thank Omar by using /thanks @omar in the Hub Slackbot. Try it →</Text>
      </ThankBotContainer>
      <Spacer mt={1} />
      <RecentThanksPost />
      <RecentThanksPost />
    </Box>
  )
}

const ThankBotContainer = muiStyled(Box)({
  borderRadius: "8px",
  border: `1px solid ${colors.gray2}`,
  backgroundColor: colors.gray1,
})

const mapStateToProps = (state: AppState) => ({
  companyName: state.companyName,
  newHires: state.newHires,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const RecentThanks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentThanksComponent);