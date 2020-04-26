import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { useHistory } from "react-router-dom";
import { AppAction, DispatchProps, Celebration, Homepage } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { Button, Image, Text, Spacer, HoverBox } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"

export interface CelebrationsComponentProps extends DispatchProps {
  homepage?: Homepage
}

export const CelebrationsComponent: React.FC<CelebrationsComponentProps> = ({ homepage }) => {
  const history = useHistory()
  const birthdays = homepage?.birthdays
  const anniversaries = homepage?.anniversaries
  if (!birthdays || !anniversaries) {
    return null
  }
  return (
    <Container display="flex" flexDirection="column" >
      <Box display="flex" alignItems="center" >
        <Text variant="h6">{"Celebrations"}</Text>
        <Spacer ml={1} />
        <Text variant="h6">🎉</Text>
      </Box>
      <Spacer mt={3} />
      {birthdays.map((birthday, index) => {
        return (
          <Box key={index}>
            <CelebrationBox px={2} py={1.5} onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/profile/${birthday.userId}`)
            }}>
              <Text variant="body2" color={colors.gray4}>
                {"Birthday is today 🎂"}
              </Text>
              <Spacer mt={1} />
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Image length={48} url={birthday.imageURL} />
                  <Spacer ml={1} />
                  <Box flex="display">
                    <Text variant="body1" style={{ fontWeight: 600 }}>{birthday.name}</Text>
                    <Spacer mt={0.25} />
                    <Text variant="body2">{`${birthday.title} • ${birthday.team}`}</Text>
                  </Box>
                </Box>
                <Button border={`1px solid ${colors.gray2}`} borderRadius={4} padding={10} style={{ fontSize: "16px" }}>{"🎂"}</Button>
              </Box>
            </CelebrationBox>
            <Spacer mt={1} />
          </Box>
        )
      })}
      {anniversaries.map((anniversary, index) => {
        return (
          <Box key={index}>
            <CelebrationBox px={2} py={1.5} onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/profile/${anniversary.userId}`)
            }}>
              <Text variant="body2">
                {`${anniversary.years} year anniversary 🚀`}
              </Text>
              <Spacer mt={1} />
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Image length={48} url={anniversary.imageURL} />
                  <Spacer ml={1} />
                  <Box flex="display">
                    <Text variant="body1">{anniversary.name}</Text>
                    <Spacer mt={0.25} />
                    <Text variant="body2">{`${anniversary.title} • ${anniversary.team}`}</Text>
                  </Box>
                </Box>
                <Button border={`1px solid ${colors.gray2}`} borderRadius={4} padding={10}>{"🚀"}</Button>
              </Box>
            </CelebrationBox>
            <Spacer mt={1} />
          </Box>
        )
      })}
    </Container>
  )
}

const Container = muiStyled(Box)({
  borderRadius: "8px",
})

const CelebrationBox = muiStyled(HoverBox)({
  backgroundColor: colors.white100,
  borderRadius: "8px",
  border: `1px solid ${colors.gray2}`
})

const mapStateToProps = (state: AppState) => ({
  homepage: state.homepage
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Celebrations = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CelebrationsComponent);