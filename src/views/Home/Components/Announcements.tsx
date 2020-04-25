import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Announcement } from "redux/types"
import { Box, Grid, GridList, GridListTile } from "@material-ui/core"
import { styled } from '@material-ui/core/styles';
import { GridListContainer, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface AnnouncementsProps extends DispatchProps {
  announcements: Announcement[]
}

export const AnnouncementsComponent: React.FC<AnnouncementsProps> = ({ announcements }) => {
  return (
    <Container py={5} px={3}>
      <Box display="flex" alignItems="center">
        <Text variant="h4">Quick Announcements</Text>
        <Spacer ml={1} />
        <Text variant="h4">🔔</Text>
      </Box>
      <Spacer mt={3} />
      <GridListContainer direction="vertical" height={328}>
        <GridList cellHeight={104} spacing={1} >
          {announcements.map((announcement, index) => (
            <GridListTile key={index} cols={2}>
              <AnnouncementBox px={2} py={2}>
                <Text variant="overline" color={colors.gray4}>{announcement.date}</Text>
                <Spacer mt={1} />
                <Text variant="h6">
                  {announcement.title}
                </Text>
              </AnnouncementBox>
            </GridListTile>
          ))}
        </GridList>
      </GridListContainer>
    </Container>
  )
}

const Container = styled(Box)({
  backgroundColor: colors.gray1,
  height: "440px",
})

const AnnouncementBox = styled(Box)({
  backgroundColor: colors.white100,
})

const mapStateToProps = (state: AppState) => ({
  announcements: state.announcements
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Announcements = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnouncementsComponent);