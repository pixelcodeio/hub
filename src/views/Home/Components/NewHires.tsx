import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, NewHire, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile } from "@material-ui/core"
import { styled } from '@material-ui/core/styles';
import { GridListContainer, Text, Spacer } from "components"
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
      <GridListContainer direction="horizontal" height={232}>
        <GridList cellHeight={232} spacing={1} cols={3.25}>
          {newHires.map((newHire, index) => (
            <GridListTile key={index} cols={1}>
              <NewHireBox px={2} py={2}>

              </NewHireBox>
            </GridListTile>
          ))}
        </GridList>
      </GridListContainer>
    </Container>
  )
}

const Container = styled(Box)({
  backgroundColor: colors.teal,
  height: "380px",
})

const NewHireBox = styled(Box)({
  width: "386px",
  height: "232px",
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