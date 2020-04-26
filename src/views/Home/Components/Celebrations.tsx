import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { useHistory } from "react-router-dom";
import { AppAction, DispatchProps, Celebration, Homepage } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { Button, Image, Text, Spacer, HoverBox } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"

export interface CelebrationsComponentProps extends DispatchProps {
  homepage?: Homepage
}

function pop (e) {
  e.stopPropagation();
  console.log(e.clientX, e.clientY, e.pageX, e.pageY);
  for (let i=0; i < 30; i++) {
    createParticle(e.pageX, 0);
  }
  console.log("HERE")
}

function createParticle (x, y) {
  const particle = document.createElement('particle');
  document.getElementById("root")?.appendChild(particle);
  
  // Calculate a random size from 5px to 25px
  const size = Math.floor(Math.random() * 20 + 5);
  particle.style.left = x
  particle.style.top = y
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.position = 'absolute'
  particle.style.zIndex = "10000"
  // Generate a random color in a blue/purple palette
  particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
  
  // Generate a random x & y destination within a distance of 75px from the mouse
  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;

  // Store the animation in a variable as we will need it later
  const animation = particle.animate([
    {
      // Set the origin position of the particle
      // We offset the particle with half its size to center it around the mouse
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
      opacity: 1
    },
    {
      // We define the final coordinates as the second keyframe
      transform: `translate(${destinationX}px, ${destinationY}px)`,
      opacity: 0
    }
  ], {
    // Set a random duration from 500 to 1500ms
    duration: Math.random() * 1000 + 50000,
    easing: 'cubic-bezier(0, .9, .57, 1)',
    // Delay every particle with a random value of 200ms
    delay: Math.random() * 200
  });
  
  // When the animation is complete, remove the element from the DOM
  animation.onfinish = () => {
    particle.remove();
  };
}

export const CelebrationsComponent: React.FC<CelebrationsComponentProps> = ({ homepage }) => {
  const history = useHistory()
  const birthdays = homepage?.birthdays
  const anniversaries = homepage?.anniversaries
  if (!birthdays || !anniversaries) {
    return null
  }
  return (
    <Container display="flex" flexDirection="column" >
      <Box display="flex" alignItems="center" >
        <Text variant="h6">{"Celebrations"}</Text>
        <Spacer ml={1} />
        <Text variant="h6">🎉</Text>
      </Box>
      <Spacer mt={3} />
      {birthdays.map((birthday, index) => {
        return (
          <Box key={index}>
            <CelebrationBox px={2} py={1.5} onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/profile/${birthday.userId}`)
            }}>
              <Text variant="body2" color={colors.gray4}>
                {"Birthday is today 🎂"}
              </Text>
              <Spacer mt={1} />
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Image length={48} url={birthday.imageURL} />
                  <Spacer ml={1} />
                  <Box flex="display">
                    <Text variant="body1" style={{ fontWeight: 600 }}>{birthday.name}</Text>
                    <Spacer mt={0.25} />
                    <Text variant="body2">{`${birthday.title} • ${birthday.team}`}</Text>
                  </Box>
                </Box>
                <div onClick={pop}>
                  <Button border={`1px solid ${colors.gray2}`} borderRadius={4} padding={10} style={{ fontSize: "16px" }}>{"🎂"}</Button>
                </div>
              </Box>
            </CelebrationBox>
            <Spacer mt={1} />
          </Box>
        )
      })}
      {anniversaries.map((anniversary, index) => {
        return (
          <Box key={index}>
            <CelebrationBox px={2} py={1.5} onClick={() => {
              window.scrollTo(0, 0)
              history.push(`/profile/${anniversary.userId}`)
            }}>
              <Text variant="body2">
                {`${anniversary.years} year anniversary 🚀`}
              </Text>
              <Spacer mt={1} />
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Image length={48} url={anniversary.imageURL} />
                  <Spacer ml={1} />
                  <Box flex="display">
                    <Text variant="body1">{anniversary.name}</Text>
                    <Spacer mt={0.25} />
                    <Text variant="body2">{`${anniversary.title} • ${anniversary.team}`}</Text>
                  </Box>
                </Box>
                <Button border={`1px solid ${colors.gray2}`} borderRadius={4} padding={10}>{"🚀"}</Button>
              </Box>
            </CelebrationBox>
            <Spacer mt={1} />
          </Box>
        )
      })}
    </Container>
  )
}

const Container = muiStyled(Box)({
  borderRadius: "8px",
})

const CelebrationBox = muiStyled(HoverBox)({
  backgroundColor: colors.white100,
  borderRadius: "8px",
  border: `1px solid ${colors.gray2}`
})

const mapStateToProps = (state: AppState) => ({
  homepage: state.homepage
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Celebrations = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CelebrationsComponent);