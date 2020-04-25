import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, Employee, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { Button, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface FeaturedComponentProps extends DispatchProps {
  profile: Employee
}

export const FeaturedComponent: React.FC<FeaturedComponentProps> = ({ profile }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <Text variant="h6">Featured</Text>
        <Spacer ml={1} />
        <Text variant="h6">✨</Text>
      </Box>
      <Spacer mt={3} />
      <FeaturedPostBox px={2} py={1.5}>
        <Text variant="body1" underline>{`${profile.personalSite.url} →`}</Text>
        <Spacer mt={1} />
        <Text variant="body1" style={{ fontWeight: 400 }}>{profile.personalSite.description}</Text>
      </FeaturedPostBox>
      {profile.featuredPosts.map((post, index) => (
        <>
          <Spacer mt={1} />
          <FeaturedPostBox overflow="hidden">
            <Image height={240} style={{ width: "100%" }} borderRadius={0} url={post.imageURL} />
            <Box px={2} py={1.5}>
              <Text variant="body1" >{post.title}</Text>
              <Spacer mt={1} />
              <Text variant="body1" style={{ fontWeight: 400 }}>{post.body}</Text>
            </Box>
          </FeaturedPostBox>
        </>
      ))}
    </Box>
  )
}

export const FeaturedPostBox = muiStyled(Box)({
  border: `1px solid ${colors.gray2}`,
  borderRadius: "8px",
})

const mapStateToProps = (state: AppState) => ({
  profile: state.profile
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Featured = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeaturedComponent);