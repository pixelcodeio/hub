import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Employee, Homepage } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { Button, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"

export interface SimilarInterestsComponentProps extends DispatchProps {
  homepage?: Homepage
}

export const SimilarInterestsComponent: React.FC<SimilarInterestsComponentProps> = ({ homepage }) => {
  const similarInterests = homepage?.similarInterests
  if (!similarInterests) {
    return null
  }
  return (
    <Container display="flex" flexDirection="column" >
      <Box display="flex" alignItems="center" >
        <Text variant="h6">{"People With Similar Interests"}</Text>
        <Spacer ml={1} />
        <Text variant="h6">🔥</Text>
      </Box>
      <Spacer mt={3} />
      {similarInterests.map((interest, index) => (
        <Box key={index}>
          <CelebrationBox px={2} py={1.5}>
            <Text variant="body2" style={{fontWeight: 600}} color={colors.gray4}>
              {interest.interests.join(", ")}
            </Text>
            <Spacer mt={1} />
            <Box display="flex" alignItems="center">
              <Image length={48} url={interest.imageURL} />
              <Spacer ml={1} />
              <Box flex="display">
                <Text variant="body1" style={{fontWeight: 600}}>{interest.name}</Text>
                <Spacer mt={0.25} />
                <Text variant="body2">{`${interest.title} • ${interest.team}`}</Text>
              </Box>
            </Box>
          </CelebrationBox>
          <Spacer mt={1} />
        </Box>
      )
      )}
    </Container>
  )
}

const Container = muiStyled(Box)({
  borderRadius: "8px",
})

const CelebrationBox = muiStyled(Box)({
  backgroundColor: colors.white100,
  borderRadius: "8px",
  border: `1px solid ${colors.gray2}`
})

const mapStateToProps = (state: AppState) => ({
  homepage: state.homepage,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const SimilarInterests = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimilarInterestsComponent);