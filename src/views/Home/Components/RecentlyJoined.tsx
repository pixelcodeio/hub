import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, Employee, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface RecentlyJoinedComponentProps extends DispatchProps {
  companyName: string
  recentHires: Employee[]
}

export const RecentlyJoinedComponent: React.FC<RecentlyJoinedComponentProps> = ({ companyName, recentHires }) => {
  return (
    <StyledBox display="flex" px={2} py={3} justifyContent="center" alignItems="center">
      <Text color={colors.white100} variant="h6">
        {`${recentHires.length} people recently joined ${companyName} →`}
      </Text>
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  backgroundColor: colors.purple,
  borderRadius: "8px",
})

const mapStateToProps = (state: AppState) => ({
  companyName: state.companyName,
  recentHires: state.recentHires,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const RecentlyJoined = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentlyJoinedComponent);