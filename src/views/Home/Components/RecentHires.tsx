import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { useHistory } from "react-router-dom";
import { AppAction, DispatchProps, Employee, Homepage } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Text, Spacer, Button, HoverBox } from "components"
import { colors } from "theme/colors"

export interface RecentHiresProps extends DispatchProps {
  homepage?: Homepage
}

function pop (e, text) {
  e.stopPropagation();
  console.log(e.clientX, e.clientY, e.pageX, e.pageY);
  for (let i=0; i < 20; i++) {
    createParticle(e.pageX, e.pageY, text);
  }
}

function createParticle (x, y, text) {
  const particle = document.createElement('particle');
  document.getElementById("root")?.appendChild(particle);
  
  // Calculate a random size from 5px to 25px
  const size = Math.floor(Math.random() * 20 + 5);
  particle.innerHTML = text;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.position = 'absolute'
  particle.style.zIndex = "10000"
  
  // Generate a random x & y destination within a distance of 75px from the mouse
  const destinationX = (Math.random() - 0.5) * 2 * 25;
  const destinationY = (Math.random() - 0.5) * 2 * 25;

  // Store the animation in a variable as we will need it later
  const animation = particle.animate([
    {
      // Set the origin position of the particle
      // We offset the particle with half its size to center it around the mouse
      transform: `translate(-50%, -50%)`,
      opacity: 1
    },
    {
      // We define the final coordinates as the second keyframe
      transform: `translate(${destinationX}px, ${destinationY}px)`,
      opacity: 0
    }
  ], {
    // Set a random duration from 500 to 1500ms
    duration: Math.random() * 1000 + 500,
    easing: 'cubic-bezier(0, .9, .57, 1)',
    // Delay every particle with a random value of 200ms
    delay: Math.random() * 200
  });
  
  // When the animation is complete, remove the element from the DOM
  animation.onfinish = () => {
    particle.remove();
  };
}

export const RecentHiresComponent: React.FC<RecentHiresProps> = ({ homepage }) => {
  const history = useHistory()
  let recentHires = homepage?.newHires
  if (!recentHires || recentHires.length === 0) {
    return null
  }

  return (
    <Box pt={5}>
      <Box display="flex" alignItems="center">
        <Text variant="h6">{"Recent Hires"}</Text>
        <Spacer ml={1} />
        <Text variant="h6">⭐️</Text>
        <Spacer ml={2} />
        <Button backgroundColor={colors.purple} borderRadius={3} border={"none"} style={{ padding: "4px 8px" }}>
          <Text variant="body2" color={colors.white100} style={{ fontWeight: 600 }}>{"Get to know us!"}</Text>
        </Button>
      </Box>
      <Spacer mt={3} />
      <GridListContainer direction="horizontal" height={316} cellHeight={250} spacing={16} cols={3} >
        {recentHires.map((newHire, index) => (
          <GridListTile key={index} cols={1} style={{ overflow: "visible" }}>
            <NewHireBox px={2} py={2} display="flex" flexDirection="column" onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/profile/${newHire.userId}`)
            }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" >
                  <Image length={64} url={newHire.imageURL} />
                  <Spacer ml={2} />
                  <Box display="flex" flexDirection="column" >
                    <Box display="flex" alignItems="center" justifyContent="space-between" >
                      <Box>
                        <Text variant="h6" >{newHire.name}</Text>
                        <Text variant="body1" style={{ fontWeight: 400 }}>{`${newHire.title} • ${newHire.team}`}</Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <div onClick={e => pop(e, "👋")}>
                  <Button style={{ fontSize: "16px" }} border={`1px solid ${colors.gray2}`} borderRadius={4} padding={10}>👋</Button>
                </div>
              </Box>
              <Spacer mt={2} />
              <Box py={2}>
                <Text variant="body1" style={{ fontWeight: 400 }}>
                  {newHire.blurb}
                </Text>
              </Box>
            </NewHireBox>
          </GridListTile>
        ))}
      </GridListContainer>
    </Box>
  )
}

const NewHireBox = muiStyled(HoverBox)({
  backgroundColor: colors.white100,
  border: `1px solid ${colors.gray2}`,
  borderRadius: "8px",
  height: "250px",
})

const mapStateToProps = (state: AppState) => ({
  homepage: state.homepage
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const RecentHires = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentHiresComponent);