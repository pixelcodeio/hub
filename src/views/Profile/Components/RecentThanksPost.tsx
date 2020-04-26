import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, Employee, DispatchProps, Thanks } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface RecentThanksPostComponentProps extends DispatchProps {
  thanks: Thanks
}

export const RecentThanksPostComponent: React.FC<RecentThanksPostComponentProps> = ({ thanks }) => {
  return (
    <Container py={1.5} px={2} mb={1}>
      <Text variant="body1">{`${thanks.from.name} thanked ${thanks.to.name}`}</Text>
      <Spacer mt={1} />
      <Text variant="body1" style={{ fontWeight: "400" }}>{thanks.message}</Text>
    </Container>
  )
}

const Container = muiStyled(Box)({
  borderRadius: "8px",
  border: `1px solid ${colors.gray2}`,
})

const mapStateToProps = (state: AppState) => ({
  companyName: "",
  recentHires: [],
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const RecentThanksPost = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentThanksPostComponent);