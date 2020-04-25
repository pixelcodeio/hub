import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, NewHire, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface NewHiresProps extends DispatchProps {
  newHires: NewHire[]
}

export const NewHiresComponent: React.FC<NewHiresProps> = ({ newHires }) => {
  return (
    <Container py={5} px={3}>
      <Box display="flex" alignItems="center">
        <Text variant="h4">{`${newHires.length} New Hires`}</Text>
        <Spacer ml={1} />
        <Text variant="h4">🎉</Text>
      </Box>
      <Spacer mt={3} />
      <GridListContainer direction="horizontal" height={232} cellHeight={232} spacing={8} cols={3.25}>
        {newHires.map((newHire, index) => (
          <GridListTile key={index} cols={1}>
            <NewHireBox px={2} py={2} display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" width={324} justifyContent="space-between">
                <Box display="flex" alignItems="center" >
                  <Image length={64} url={newHire.imageURL} />
                  <Spacer ml={2} />
                  <Box display="flex" flexDirection="column" >
                    <Box display="flex" alignItems="center" justifyContent="space-between" >
                      <Box>
                        <Text variant="h6" underline>{newHire.name}</Text>
                        <Text variant="body2">{`${newHire.title} • ${newHire.team}`}</Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <WaveButton>👋</WaveButton>
              </Box>
              <Spacer mt={2} />
              <BlurbBox display="flex" flexWrap="wrap" px={2} py={2}>
                <Text variant="body1">
                  {newHire.blurb}
                </Text>
              </BlurbBox>
            </NewHireBox>
          </GridListTile>
        ))}
      </GridListContainer>
    </Container>
  )
}

const Container = muiStyled(Box)({
  backgroundColor: colors.teal,
  height: "380px",
})

const WaveButton = styled.button`
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  width: 40px;
  height: 40px;
  outline: none;
`

const BlurbBox = muiStyled(Box)({
  backgroundColor: colors.gray1,
  width: "288px",
  height: "120px",
  borderRadius: "20px",
})

const NewHireBox = muiStyled(Box)({
  width: "386px",
  height: "232px",
  backgroundColor: colors.white100,
})

const mapStateToProps = (state: AppState) => ({
  newHires: state.newHires,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const NewHires = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewHiresComponent);