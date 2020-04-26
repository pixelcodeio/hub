import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { Box, Button, Grid } from "@material-ui/core"
import { SearchIcon } from "assets"
import { Link, Spacer, Image, Text } from "components"
import { styled } from '@material-ui/core/styles';
import { colors } from "theme/colors"
import { AppAction, DispatchProps, Employee, Page } from "redux/types"
import { AppState } from 'redux/reducer';
import { fetchProfile } from "redux/actions"

export interface NavBarProps extends DispatchProps {
  currentPage: Page
  user?: Employee
}

export const NavBarComponent: React.FC<NavBarProps> = ({ currentPage, dispatch, user }) => {
  const [selectedSection, setSelectedSection] = useState("Home")
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
  console.log("USER", user)
  return (
    <ContainerGrid container style={{ backgroundColor }}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" px={5} justifyContent="space-between" style={{ height: "100%" }}>
          <Box display="flex" alignItems="center">
            {sections.map((section, index) => (
              < React.Fragment key={index} >
                <Link key={index} to={section.url} onClick={() => {
                  dispatch(fetchProfile("U012HSXKLKC"))
                  setSelectedSection(section.name)
                }
                }>
                  <Text color={section.name === selectedSection ? colors.black100 : colors.gray4} variant="h6">
                    {section.name}
                  </Text>
                </Link>
                <Spacer ml={3} />
              </ React.Fragment>
            ))}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            { currentPage !== "Search" &&
              <Link to={"/search"}>
                <SearchIcon />
              </Link>
            }
            <Spacer ml={2} />

            <Link to={currentPage !== "Profile" ? `profile/${user.id}` : "#"}>
              <Image url={user.imageURL} length={32} />
            </Link>
          </Box>
        </Box>
      </Grid>
    </ContainerGrid >
  )
}

const ContainerGrid = styled(Grid)({
  positon: "fixed",
  height: "48px",
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