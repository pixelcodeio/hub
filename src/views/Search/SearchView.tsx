import { Box, Checkbox as MUICheckbox, Grid, Input } from "@material-ui/core";
import { styled as muiStyled } from '@material-ui/core/styles';
import { SearchBarIcon } from "assets";
import { Spacer, Text } from "components";
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { setCurrentPage } from 'redux/actions';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps, Employee } from "redux/types";
import { colors } from "theme/colors";
import { SearchResultComponent } from "./components/SearchResult";

export interface SearchViewComponentProps extends DispatchProps {
  allEmployees: Employee[]
  user?: Employee
}

const teams_info = [
  ["Growth", 1],
  ["Customer Support", 1],
  ["People & Culture", 1]
]

export const SearchViewComponent: React.FC<SearchViewComponentProps> = ({ dispatch, allEmployees, user }) => {
  useEffect(() => {
    dispatch(setCurrentPage("Search"))
  }, [])

  return (
    <Box p={6}>
      <Grid container>
        <Grid item xs={3} >
          <FilterContainer p={2} display="flex" flexDirection="column">
            <Box>
              <Text variant="body1">Teams</Text>
              <Spacer mt={1.5} />
              {teams_info.map((team, index) => (
                <Box key={index}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Text variant="body2" color={colors.gray4}>{`${team[0]} (${team[1]})`}</Text>
                    <Checkbox disableRipple size="small" />
                  </Box>
                  <Spacer mt={1} />
                </Box>
              ))}
            </Box>
          </FilterContainer>
        </Grid>
        <Spacer ml={5} />
        <Grid item xs={6}>
          <Container py={2} px={4} display="flex" alignItems="center">
            <SearchBarIcon />
            <Spacer ml={1.5} />
            <Input autoFocus={true} disableUnderline={true} style={{ color: colors.black100, fontSize: "14px", fontWeight: 400 }} />
          </Container>
          <Spacer mt={8} />
          {allEmployees.map((employee, index) => (
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