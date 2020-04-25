import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, Employee, NewHire, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface ProfileHeaderComponentProps extends DispatchProps {
  profile: Employee
}

export const ProfileHeaderComponent: React.FC<ProfileHeaderComponentProps> = ({ profile }) => {
  return (
    // <Box display="flex" alignItems="center" justifyContent="space-around">
    <Grid container spacing={5}>
      <Grid item xs={3}>
        <Image url={profile.imageURL} borderRadius={8} style={{ width: "100%", height: "100%" }} />
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" flexDirection="column" >
          <Text variant="h4">{profile.name}</Text>
          <Spacer mt={1.5} />
          <Box display="flex">
            <Text variant="body1" underline style={{ fontWeight: 400 }}>{`${profile.title}`}</Text>
            <Spacer ml={0.5} />
            <Text variant="body1" style={{ fontWeight: 400 }}>{" on "}</Text>
            <Spacer ml={0.5} />
            <Text variant="body1" underline style={{ fontWeight: 400 }}>{`${profile.team}`}</Text>
            <Spacer ml={0.5} />
            <Text variant="body1" style={{ fontWeight: 400 }}>{" team."}</Text>
          </Box>
          <Spacer mt={1.5} />
          <Text variant="body1" style={{ fontWeight: 400 }}>{profile.blurb}</Text>
          <Spacer mt={1.5} />
          <Text variant="body1" color={colors.gray4}>{profile.interests.join(", ")}</Text>
        </Box>
      </Grid>
    </Grid >
  )
}

const mapStateToProps = (state: AppState) => ({
  profile: state.profile
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const ProfileHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileHeaderComponent);