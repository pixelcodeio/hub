import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { useParams, useHistory } from "react-router-dom"
import { AppAction, Employee, DispatchProps } from "redux/types"
import { Box, Grid, Link, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { Button, Image, Text, Spacer } from "components"
import { colors } from "theme/colors"

export interface ProfileHeaderComponentProps extends DispatchProps {
  allEmployees: Employee[]
  user?: Employee
}

export const ProfileHeaderComponent: React.FC<ProfileHeaderComponentProps> = ({ allEmployees, user }) => {
  const history = useHistory()
  const { profileID } = useParams()
  const profile = allEmployees.find(employee => employee.id === profileID)
  if (!profile || !user) {
    return null
  }

  const firstColumnFields = [
    ["Manager", profile.manager != undefined ? profile?.manager?.name : "N/A"],
    ["Email", profile.email],
    ["Office", profile.office],
    ["Birthday", profile.birthday],
    ["Pronouns", profile.pronouns],
    ["Joined", profile.joinDate],
  ]
  const secondColumnFields = [
    ["Slack", profile.slackInternalName],
    ["Twitter", profile.twitter],
    ["Linkedin", profile.linkedin],
    ["Facebook", profile.facebook],
    ["Instagram", profile.instagram],
  ]

  const isViewingOwnProfile = profile.id === user.id

  return (
    <Grid container spacing={5}>
      <Grid item xs={3}>
        <Image url={profile.imageURL} borderRadius={8} style={{ width: "100%", height: "auto", maxWidth: "375px", boxShadow: "0px 8px 16px rgba(161, 163, 166, 0.12), 0px 4px 24px rgba(161, 163, 166, 0.12)" }} />
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" flexDirection="column" >
          <Text variant="h4">{profile.name}</Text>
          <Spacer mt={1.5} />
          <Box display="flex">
            <Text variant="body1" underline style={{ fontWeight: 400, cursor: "pointer" }} onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/search/${profile.title}`)
            }}>{`${profile.title}`}</Text>
            <Spacer ml={0.5} />
            <Text variant="body1" style={{ fontWeight: 400 }}>{" on "}</Text>
            <Spacer ml={0.5} />
            <Text variant="body1" underline style={{ fontWeight: 400, cursor: "pointer" }} onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/search/${profile.team}`)
            }}>{`${profile.team}`}</Text>
            <Spacer ml={0.5} />
            <Text variant="body1" style={{ fontWeight: 400 }}>{" team."}</Text>
          </Box>
          <Spacer mt={1.5} />
          <Text variant="body1" style={{ fontWeight: 400 }}>{profile.blurb}</Text>
          <Spacer mt={1.5} />
          <Box display="flex" alignItems="center">
            {profile.interests.map((interest, index) => {
              const isLast = index === profile.interests.length - 1
              return (
                <>
                  <Text variant="body1" color={colors.gray4} key={index} style={{ cursor: "pointer" }} onClick={() => {
                    window.scrollTo(0, 0)
                    history.push(`/search/${interest}`)
                  }}>
                    {`${interest}${isLast ? "" : ", "}`}
                  </Text>
                  <Spacer ml={0.5} />
                </>
              )
            })}
          </Box>
          <Spacer mt={6} />
          <Box display="flex">
            {!isViewingOwnProfile &&
              (
                <>
                  <Link href={`slack://user?team=${profile.teamId}&id=${profile.id}`}>
                    <Button backgroundColor={colors.purple} borderRadius={4} border={"none"} padding={12}>
                      <Text color={colors.white100} variant="body1">{`Message ${profile.name.split(" ")[0]}`}</Text>
                    </Button>
                  </Link>
                  <Spacer ml={1} />
                </>
              )
            }
            <Button backgroundColor={colors.white100} borderRadius={4} padding={12} border={`1px solid ${colors.purple}`} style={{cursor: "auto", boxShadow: "none"}}>
              <Text color={colors.purple} variant="body1">{"View Calendar"}</Text>
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" flexDirection="column">
          {firstColumnFields.map((field, index) => {
            const isManagerField = field[0] === "Manager"
            return (
              <Box key={index}>
                <Text variant="overline" color={colors.gray4}>{field[0]}</Text>
                <Spacer mt={0.25} />
                <Text variant="body1" underline={isManagerField} style={{ cursor: isManagerField ? "pointer" : undefined }} onClick={() => {
                  if (isManagerField && profile.manager?.id) {
                    window.scrollTo(0, 0)
                    history.push(`/profile/${profile.manager?.id}`)
                  }
                }}>{field[1]}</Text>
                <Spacer mt={1.5} />
              </Box>
            )
          })}
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" flexDirection="column">
          {secondColumnFields.map((field, index) => (
            <Box key={index}>
              <Text variant="overline" color={colors.gray4}>{field[0]}</Text>
              <Spacer mt={0.25} />
              <Text variant="body1" >{field[1]}</Text>
              <Spacer mt={1.5} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid >
  )
}

const mapStateToProps = (state: AppState) => ({
  allEmployees: state.allEmployees,
  user: state.user
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const ProfileHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileHeaderComponent);