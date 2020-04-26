import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { useHistory } from "react-router-dom";
import { AppAction, DispatchProps, Employee, Homepage } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer, Button } from "components"
import { colors } from "theme/colors"

export interface RecentHiresProps extends DispatchProps {
  homepage?: Homepage
}

export const RecentHiresComponent: React.FC<RecentHiresProps> = ({ homepage }) => {
  const history = useHistory()
  let recentHires = homepage?.newHires
  if (!recentHires || recentHires.length === 0) {
    return null
  }

  // recentHires = Array(5).fill(recentHires[0])
  return (
    <Box pt={7}>
      <Box display="flex" alignItems="center">
        <Text variant="h6">{"Recent Hires"}</Text>
        <Spacer ml={1} />
        <Text variant="h6">⭐️</Text>
        <Spacer ml={2} />
        <Button backgroundColor={colors.purple} borderRadius={3} border={"none"} style={{ padding: "4px 8px" }}>
          <Text variant="body2" color={colors.white100} style={{ fontWeight: 600 }}>{"Get to know us!"}</Text>
        </Button>
      </Box>
      <Spacer mt={3} />
      <GridListContainer direction="horizontal" height={249} cellHeight={249} spacing={16} cols={3} >
        {recentHires.map((newHire, index) => (
          <GridListTile key={index} cols={1}>
            <NewHireBox px={2} py={2} display="flex" flexDirection="column" onClick={() => history.push(`/profile/${newHire.userId}`)}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" >
                  <Image length={64} url={newHire.imageURL} />
                  <Spacer ml={2} />
                  <Box display="flex" flexDirection="column" >
                    <Box display="flex" alignItems="center" justifyContent="space-between" >
                      <Box>
                        <Text variant="h6" >{newHire.name}</Text>
                        <Text variant="body1" style={{ fontWeight: 400 }}>{`${newHire.title} • ${newHire.team}`}</Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Button style={{ fontSize: "16px" }} border={`1px solid ${colors.gray2}`} borderRadius={4} padding={10}>👋</Button>
              </Box>
              <Spacer mt={2} />
              <Box py={2}>
                <Text variant="body1" style={{ fontWeight: 400 }}>
                  {newHire.blurb}
                </Text>
              </Box>
            </NewHireBox>
          </GridListTile>
        ))}
      </GridListContainer>
    </Box>
  )
}

const NewHireBox = muiStyled(Box)({
  backgroundColor: colors.white100,
  border: `1px solid ${colors.gray2}`,
  borderRadius: "8px",
})

const mapStateToProps = (state: AppState) => ({
  homepage: state.homepage
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const RecentHires = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentHiresComponent);