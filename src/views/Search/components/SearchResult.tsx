import { Box } from "@material-ui/core"
import { Spacer, Text } from "components"
import React from "react"
import { Employee } from "redux/types"
import { colors } from "theme/colors"

export interface SearchResultProps {
  employee: Employee
}

export const SearchResultComponent: React.FC<SearchResultProps> = ({ employee }) => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Text variant="h6" color={colors.purple}>{employee.name}</Text>
        <Spacer ml={1} />
        <Text variant="body1">{employee.email}</Text>
      </Box>
      <Spacer mt={1} />
      <Box display="flex" alignItems="center">
        <Text variant="body2" color={colors.gray4}>Team</Text>
        <Spacer ml={0.5} />
        <Text variant="body1" color={colors.purple}>{employee.team}</Text>
        <Spacer ml={1} />
        <Text variant="body2" color={colors.gray4}>Dept</Text>
        <Spacer ml={0.5} />
        <Text variant="body1" color={colors.purple}>Engineering</Text>
      </Box>
    </Box>
  )
}