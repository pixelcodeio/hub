import React, { useState } from "react"
import { connect } from 'react-redux';
import { Box, Button, Grid } from "@material-ui/core"
import { Link, Spacer, Text } from "components"
import { styled } from '@material-ui/core/styles';
import { colors } from "theme/colors"
import { AppAction, DispatchProps } from "redux/types"
import { AppState } from 'redux/reducer';
import { login } from "redux/actions"

export interface NavBarProps extends DispatchProps { }

export const NavBarComponent: React.FC<NavBarProps> = ({ dispatch }) => {
  const [selectedSection, setSelectedSection] = useState("Home")
  const sections = [
    { url: "/home", name: "Home" },
    { url: "/teams", name: "Teams" },
    { url: "/resources", name: "Resources" },
    { url: "/calendar", name: "Calendar" },
  ]
  return (
    <ContainerGrid container>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" pl={14} style={{ height: "100%" }}>
          {sections.map((section, index) => (
            <>
              <Link key={index} to={section.url} onClick={() => {
                dispatch(login())
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

const mapStateToProps = (state: AppState) => state
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: any) => dispatch(action),
});

export const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBarComponent);