import React, { useState } from "react"
import { Box, Button, Grid } from "@material-ui/core"
import { Link, Spacer, Text } from "components"
import { styled } from '@material-ui/core/styles';
import { colors } from "theme/colors"

export interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = (props) => {
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
              <Link key={index} to={section.url} onClick={() => setSelectedSection(section.name)}>
                <Text color={section.name === selectedSection ? colors.black100 : colors.gray3}>
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
