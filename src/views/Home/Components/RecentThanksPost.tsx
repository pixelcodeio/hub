import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, NewHire, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface RecentThanksPostComponentProps extends DispatchProps {
  companyName: string
  newHires: NewHire[]
}

export const RecentThanksPostComponent: React.FC<RecentThanksPostComponentProps> = ({ companyName, newHires }) => {
  return (
    <Container py={1.5} px={2} mb={1}>
      <Text variant="body1">TK Kong thanked Omar Rasheed</Text>
      <Spacer mt={1} />
      <Text variant="body1" style={{fontWeight: "400"}}>Thank you sir.</Text>
    </Container>
  )
}

const Container = muiStyled(Box)({
  borderRadius: "8px",
  border: `1px solid ${colors.gray2}`,
})

const mapStateToProps = (state: AppState) => ({
  companyName: state.companyName,
  newHires: state.newHires,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const RecentThanksPost = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentThanksPostComponent);