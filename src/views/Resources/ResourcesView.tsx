import React, { useEffect } from "react"
import { Box, Grid } from "@material-ui/core";
import { connect } from 'react-redux';
import { setCurrentPage } from 'redux/actions';
import { AppState } from 'redux/reducer';
import { AppAction, DispatchProps } from "redux/types";

import { Spacer, Text } from "components"

export interface ResourcesComponentProps extends DispatchProps { }

export const ResourcesComponent: React.FC<ResourcesComponentProps> = ({ dispatch }) => {
  useEffect(() => {
    dispatch(setCurrentPage("ComingSoon"))
  }, [])

  return (
    <Box>
      <Box style={{ height: "400px" }}>
        <Box px={5}>
          <Grid container >
            <Grid item xs={12}>
              <Box pt={5}>
                <Box display="flex" alignItems="center">
                  <Text variant="h6">Coming Soon</Text>
                  <Spacer ml={1} />
                  <Text variant="h6">👀</Text>
                  <Spacer ml={2} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  allEmployees: state.allEmployees,
  homepage: state.homepage,
  user: state.user,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const ResourcesView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourcesComponent);
