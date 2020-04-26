import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Anniversary } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"
import { fontWeight } from "styled-system";

export interface AnniversariesComponentProps extends DispatchProps {
  anniversaries: Anniversary[]
}

export const AnniversariesComponent: React.FC<AnniversariesComponentProps> = ({ anniversaries }) => {
  const anniversary = anniversaries?.[0]
  return (
    <Container pt={3.5} pb={3} px={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Text variant="h6">{`${anniversaries.length} Anniversaries`}</Text>
          <Spacer ml={1} />
          <Text variant="h6">🚀</Text>
        </Box>
      </Box>
      <Spacer mt={3.5} />
      <BirthdayBox py={2.5} display="flex" flexDirection="column" alignItems="center">
        <Text variant="body2" style={{ fontWeight: 600 }}>{`${anniversary.years} Years Today`}</Text>
        <Spacer mt={2} />
        <Image length={64} url={anniversary.imageURL} />
        <Spacer mt={2} />
        <Text variant="body1">{anniversary.name}</Text>
        <Text variant="body2">{`${anniversary.title} • ${anniversary.team}`}</Text>
      </BirthdayBox>
      <Spacer mt={1.5} />
      <Box display="flex" justifyContent="center">
        <PageControl />
      </Box>
    </Container>
  )
}

const Container = muiStyled(Box)({
  backgroundColor: colors.ashBlue,
  borderRadius: "8px",
})

const BirthdayBox = muiStyled(Box)({
  backgroundColor: colors.white100,
  borderRadius: "8px",
})

const mapStateToProps = (state: AppState) => ({
  anniversaries: []
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Anniversaries = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnniversariesComponent);