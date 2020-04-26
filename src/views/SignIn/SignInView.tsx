import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { Box, Grid } from "@material-ui/core"
import { fetchHomepage, fetchProfile, fetchAllProfiles, setCurrentPage } from 'redux/actions';
import { AppAction, DispatchProps, Employee, Homepage } from "redux/types"
import { useParams, useHistory } from "react-router-dom"
import { AppState } from 'redux/reducer';

import { HubLogo, LandingPageBackground } from "assets"
import LandingBackgroundImage from "assets/landing-background.png"
import { colors } from "theme/colors"
import { Button, Spacer, Text } from "components"

export interface SignInComponentProps extends DispatchProps {
}

export const SignInComponent: React.FC<SignInComponentProps> = ({ dispatch }) => {
  const history = useHistory()
  useEffect(() => {
    dispatch(setCurrentPage("SignIn"))
  }, [])
  return (
    <>
      <LandingPageBackground style={{ position: "fixed", left: 0, top: 0, right: 0, zIndex: -1 }} />
      <Box display="flex" flexDirection="column" px={16} py={8.5} width={640} style={{ zIndex: 1 }}>
        <HubLogo />
        <Spacer mt={10} />
        <Text variant="h3" style={{ fontWeight: 800 }}>Improve team culture</Text>
        <Spacer mt={3} />
        <Text variant="h6" style={{ fontWeight: 400, lineHeight: "180%" }}>
          Hub is the place for people to learn about their colleagues and connect together. Strengthen personal connection and grow your company culture.
        </Text>
        <Spacer mt={7} />
        <Button
          backgroundColor={colors.purple}
          borderRadius={8}
          style={{ padding: "16px 32px", width: "218px", height: "64px" }}
          onClick={() => {
            window.scrollTo(0, 0)
            history.push("/home")
          }}
        >
          <Text style={{ fontSize: "18px", fontWeight: 500 }} color={colors.white100}>
            Sign in with Slack
        </Text>
        </Button>
      </Box>
    </>
  )
}

const mapStateToProps = (state: AppState) => state
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const SignInView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInComponent);
