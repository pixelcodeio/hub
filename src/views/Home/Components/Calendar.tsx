import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, CalendarEvent, DispatchProps } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer } from "components"
import { GoogleCalendarIcon } from "assets"
import { colors } from "theme/colors"

export interface CalendarProps extends DispatchProps {
  calendarEvents: CalendarEvent[]
}

export const CalendarComponent: React.FC<CalendarProps> = ({ calendarEvents }) => {
  return (
    <Container pt={3.5} px={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Text variant="h6">Today, April 25</Text>
          <Spacer ml={1} />
          <Text variant="h6">✨</Text>
        </Box>
        <GoogleCalendarIcon />
      </Box>
      <Spacer mt={3.5} />
      <GridListContainer direction="vertical" height={240} cellHeight={60} spacing={8} >
        {calendarEvents.map((event, index) => (
          <GridListTile cols={2}>
            <Box px={2} py={1.5} style={{ backgroundColor: colors.white100 }}>
              <Text variant="body1">{event.name}</Text>
              <Text variant="body2">{event.time}</Text>
            </Box>
          </GridListTile>
        ))}
      </GridListContainer>
    </Container>
  )
}

const Container = muiStyled(Box)({
  backgroundColor: colors.lightYellow,
  height: "320px",
  borderRadius: "8px",
})

const mapStateToProps = (state: AppState) => ({
  calendarEvents: state.calendarEvents
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Calendar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarComponent);