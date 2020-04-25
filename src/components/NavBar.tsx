import React, { useState } from "react"
import { connect } from 'react-redux';
import { Box, Button, Grid } from "@material-ui/core"
import { Link, Spacer, Text } from "components"
import { styled } from '@material-ui/core/styles';
import { colors } from "theme/colors"
import { AppAction, DispatchProps, Page } from "redux/types"
import { AppState } from 'redux/reducer';
import { fetchProfile } from "redux/actions"

export interface NavBarProps extends DispatchProps {
  currentPage: Page
}

export const NavBarComponent: React.FC<NavBarProps> = ({ currentPage, dispatch }) => {
  const [selectedSection, setSelectedSection] = useState("Home")
  const sections = [
    { url: "/home", name: "Home" },
    { url: "/teams", name: "Teams" },
    { url: "/resources", name: "Resources" },
    { url: "/calendar", name: "Calendar" },
  ]
  let backgroundColor
  switch (currentPage) {
    case "Profile":
      backgroundColor = colors.lightYellow
      break;
    default:
      backgroundColor = colors.white100
      break;
  }
  return (
    <ContainerGrid container style={{ backgroundColor }}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" pl={14} style={{ height: "100%" }}>
          {sections.map((section, index) => (
            <>
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
            </>
          ))}
        </Box>
      </Grid>
    </ContainerGrid>
  )
}

const ContainerGrid = styled(Grid)({
  positon: "fixed",
  height: "48px",
})

const mapStateToProps = (state: AppState) => ({
  currentPage: state.currentPage
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: any) => dispatch(action),
});

export const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBarComponent);