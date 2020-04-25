import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Celebration } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { Button, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"

export interface CelebrationsComponentProps extends DispatchProps {
  celebrations: Celebration[]
}

export const CelebrationsComponent: React.FC<CelebrationsComponentProps> = ({ celebrations }) => {
  return (
    <Container display="flex" flexDirection="column" >
      <Box display="flex" alignItems="center" >
        <Text variant="h6">{"Celebrations"}</Text>
        <Spacer ml={1} />
        <Text variant="h6">🎉</Text>
      </Box>
      <Spacer mt={3} />
      {celebrations.map((celebration, index) => {
        const isBirthday = celebration.type === "Birthday"
        const emoji = isBirthday ? "🎂" : "🚀"
        return (
          <Box>
            <Spacer mt={1} />
            <CelebrationBox px={2} py={1.5}>
              <Text variant="body2">
                {isBirthday ? "Birthday is today 🎂" : `${celebration.numYears} year anniversary 🚀`}
              </Text>
              <Spacer mt={1} />
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Image length={48} url={celebration.employee.imageURL} />
                  <Spacer ml={1} />
                  <Box flex="display">
                    <Text variant="body1">{celebration.employee.name}</Text>
                    <Spacer mt={0.25} />
                    <Text variant="body2">{`${celebration.employee.title} • ${celebration.employee.team}`}</Text>
                  </Box>
                </Box>
                <Button border={`1px solid ${colors.gray2}`} borderRadius={4} padding={10}>{emoji}</Button>
              </Box>
            </CelebrationBox>
          </Box>
        )
      })}
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
  celebrations: state.celebrations
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Celebrations = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CelebrationsComponent);