import { Box, Checkbox as MUICheckbox, Grid, Input } from "@material-ui/core";
import { styled as muiStyled } from '@material-ui/core/styles';
import { SearchBarIcon } from "assets";
import { Spacer, Text } from "components";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { fetchAllProfiles, setCurrentPage } from 'redux/actions';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Employee } from "redux/types";
import { colors } from "theme/colors";
import { SearchResultComponent } from "./components/SearchResult";

export interface SearchViewComponentProps extends DispatchProps {
  allEmployees: Employee[]
  user?: Employee
}

export const SearchViewComponent: React.FC<SearchViewComponentProps> = ({ dispatch, allEmployees, user }) => {
  const [query, setQuery] = useState("")
  const [departmentFilters, setDepartmentFilters] = useState<string[]>([])
  const [teamFilters, setTeamFilters] = useState<string[]>([])
  useEffect(() => {
    dispatch(setCurrentPage("Search"))
    if (allEmployees.length === 0) {
      dispatch(fetchAllProfiles())
    }
  }, [])

  const onInputChange = (event: any) => {
    setQuery(event.target.value.toLowerCase())
  }

  const searchFilteredEmployees = query
    ? allEmployees.filter(employee =>
      employee.name.toLowerCase().includes(query) ||
      employee.team.toLowerCase().includes(query)
    )
    : allEmployees

  const teamFilteredEmployees = teamFilters.length
    ? searchFilteredEmployees.filter(employee => teamFilters.includes(employee.team))
    : searchFilteredEmployees

  const filteredEmployees = departmentFilters.length
    ? teamFilteredEmployees.filter(employee => departmentFilters.includes(employee.department))
    : teamFilteredEmployees

  const departments = [...new Set(allEmployees.map(emp => emp.department))]
  const teams = [...new Set(allEmployees.map(emp => emp.team))]
  const departmentCounts = {}
  const teamCounts = {}

  allEmployees.map(emp => {
    if (emp.team in teamCounts) {
      teamCounts[emp.team] += 1
    } else {
      teamCounts[emp.team] = 1
    }

    if (emp.department in departmentCounts) {
      departmentCounts[emp.department] += 1
    } else {
      departmentCounts[emp.department] = 1
    }
  })

  const onToggleTeamFilter = (index) => {
    const team = teams[index]
    if (teamFilters.includes(team)) {
      setTeamFilters(teamFilters.filter(val => val !== team))
    } else {
      setTeamFilters(teamFilters.concat([team]))
    }
  }

  const onToggleDeptFilter = (index) => {
    const dept = departments[index]
    if (departmentFilters.includes(dept)) {
      setDepartmentFilters(teamFilters.filter(val => val !== dept))
    } else {
      setDepartmentFilters(teamFilters.concat([dept]))
    }
  }

  return (
    <Box p={6}>
      <Grid container>
        <Grid item xs={3} >
          <FilterContainer p={2} display="flex" flexDirection="column">
            <Text variant="body1">Teams</Text>
            <Spacer mt={1.5} />
            {teams.map((team, index) => (
              <Box key={index}>
                <Box display="flex" alignItems="center" justifyContent="space-between" onClick={() => onToggleTeamFilter(index)}>
                  <Text variant="body1" color={colors.gray4}>{`${team} (${teamCounts[team]})`}</Text>
                  <Checkbox disableRipple size="small" checked={teamFilters.includes(team)} onClick={onToggleTeamFilter} />
                </Box>
                <Spacer mt={1} />
              </Box>
            ))}
          </FilterContainer>
          <Spacer mt={1} />
          <FilterContainer p={2} display="flex" flexDirection="column">
            <Text variant="body1">Teams</Text>
            <Spacer mt={1.5} />
            {departments.map((dept, index) => (
              <Box key={index}>
                <Box display="flex" alignItems="center" justifyContent="space-between" onClick={() => onToggleDeptFilter(index)}>
                  <Text variant="body1" color={colors.gray4}>{`${dept} (${departmentCounts[dept]})`}</Text>
                  <Checkbox disableRipple size="small" checked={departmentFilters.includes(dept)} onClick={onToggleDeptFilter} />
                </Box>
                <Spacer mt={1} />
              </Box>
            ))}
          </FilterContainer>
        </Grid>
        <Spacer ml={5} />
        <Grid item xs={6}>
          <Container py={2} px={4} display="flex" alignItems="center">
            <SearchBarIcon />
            <Spacer ml={1.5} />
            <Input
              autoFocus
              disableUnderline
              onChange={onInputChange}
              style={{ color: colors.black100, fontSize: "14px", fontWeight: 400, width: "100%" }} />
          </Container>
          <Spacer mt={8} />
          {filteredEmployees.map((employee, index) => (
            <Box>
              <SearchResultComponent employee={employee} key={index} />
              <Spacer mt={5} />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box >
  )
}

const FilterContainer = muiStyled(Box)({
  borderRadius: "8px",
  border: `1px solid ${colors.gray3}`,
})

const Container = muiStyled(Box)({
  borderRadius: "8px",
  border: `1px solid ${colors.gray3}`,
  boxShadow: "0px 8px 16px rgba(161, 163, 166, 0.08), 0px 4px 24px rgba(161, 163, 166, 0.08);",
})

const Checkbox = muiStyled(MUICheckbox)({
  height: 12,
  width: 12,
  padding: 0,
  color: colors.gray3,
  "&:hover": {
    backgroundColor: "transparent"
  },
  "&.Mui-checked": {
    color: colors.purple
  }
})

const mapStateToProps = (state: AppState) => ({
  allEmployees: state.allEmployees,
  user: state.user,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const SearchView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchViewComponent);