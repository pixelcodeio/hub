import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Box, Button, Grid } from "@material-ui/core"
import { SearchIcon } from "assets"
import { Link, Spacer, Image, Text } from "components"
import { styled } from '@material-ui/core/styles';
import { colors } from "theme/colors"
import { AppAction, DispatchProps, Employee, Page } from "redux/types"
import { AppState } from 'redux/reducer';
import { fetchProfile, setCurrentPage } from "redux/actions"

export interface NavBarProps extends DispatchProps {
  currentPage: Page
  user?: Employee
}

export const NavBarComponent: React.FC<NavBarProps> = ({ currentPage, dispatch, user }) => {
  const history = useHistory()
  const sections = [
    { url: "/home", name: "Home" },
    { url: "/teams", name: "Teams" },
    { url: "/resources", name: "Resources" },
    { url: "/calendar", name: "Calendar" },
  ]

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile("U012HSXKLKC"))
    }
  }, [])

  if (!user) {
    return null
  }

  let backgroundColor
  switch (currentPage) {
    case "Profile":
      backgroundColor = colors.lightYellow
      break
    case "Home":
      backgroundColor = colors.lightTeal
      break
    default:
      backgroundColor = colors.white100
      break;
  }

  if (currentPage === "SignIn") {
    return null
  }

  return (
    <ContainerGrid container style={{ backgroundColor }}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" px={5} justifyContent="space-between" style={{ height: "100%" }}>
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" style={{ boxShadow: "0px 8px 16px rgba(161, 163, 166, 0.08), 0px 4px 24px rgba(161, 163, 166, 0.08)" }}>
              <Image url={user.teamIconUrl} length={40} borderRadius={2} style={{ cursor: "pointer" }} onClick={() => {
                window.scrollTo(0, 0)
                history.push("/home")
              }} />
            </Box>
            <Spacer ml={5} />
            {sections.map((section, index) => (
              <React.Fragment key={index}>
                <Link key={index} to={section.url} onClick={() => {
                  dispatch(setCurrentPage(section.name as Page))
                }
                }>
                  <Text color={section.name === currentPage ? colors.black100 : colors.gray4} variant="h6">
                    {section.name}
                  </Text>
                </Link>
                <Spacer ml={3} />
              </ React.Fragment>
            ))}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {currentPage !== "Search" &&
              <Link to={"/search"}>
                <Box height={40}>
                  <SearchIcon />
                </Box>
              </Link>
            }
            <Spacer ml={2} />

            <Image url={user.imageURL} style={{ cursor: "pointer" }} length={40} onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/profile/${user.id}`)
            }} />
          </Box>
        </Box>
      </Grid>
    </ContainerGrid >
  )
}

const ContainerGrid = styled(Grid)({
  positon: "fixed",
  height: "64px",
})

const mapStateToProps = (state: AppState) => ({
  currentPage: state.currentPage,
  user: state.user,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: any) => dispatch(action),
});

export const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBarComponent);