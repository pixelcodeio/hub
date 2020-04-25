import React from "react"

import { NavBar, Text } from "components"

export const Home: React.FC<any> = props => {
  return (
    <>
      <NavBar />
      <Text variant="h2">
        Hello
    </Text>
    </>
  )
}