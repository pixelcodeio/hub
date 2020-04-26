import { Box } from "@material-ui/core";
import { Spacer, Text } from "components";
import React from "react";
import { useHistory } from "react-router-dom";
import { Employee } from "redux/types";
import { colors } from "theme/colors";

export interface SearchResultProps {
  employee: Employee
}

export const SearchResult: React.FC<SearchResultProps> = ({ employee }) => {
  const history = useHistory()
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Text variant="h6" color={colors.purple}>{employee.name}</Text>
        <Spacer ml={1} />
        <Text variant="body1">{employee.email}</Text>
      </Box>
      <Spacer mt={1} />
      <Text variant="body1" style={{ fontWeight: 400 }}>{employee.title}</Text>
      <Spacer mt={1} />
      <Box display="flex" alignItems="center" onClick={() => {
        window.scrollTo(0, 0)
        history.push(`/profile/${employee.id}`)
      }}>
        <Text variant="body2" color={colors.gray4}>Team</Text>
        <Spacer ml={0.5} />
        <Text variant="body1" color={colors.purple} style={{ fontWeight: 400 }}>{employee.team}</Text>
        <Spacer ml={1} />
        <Text variant="body2" color={colors.gray4}>Dept</Text>
        <Spacer ml={0.5} />
        <Text variant="body1" color={colors.purple} style={{ fontWeight: 400 }}>{employee.department}</Text>
      </Box>
    </Box>
  )
}