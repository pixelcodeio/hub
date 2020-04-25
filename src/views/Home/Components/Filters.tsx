import React from "react"
import { connect } from 'react-redux';
import { AppState } from 'redux/reducer';
import { selectFilter } from 'redux/actions';
import { AppAction, DispatchProps, Employee } from "redux/types"
import { Box, Grid, GridList, GridListTile, TextareaAutosize } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"
import { GridListContainer, Image, Button, Text, Spacer } from "components"
import { PageControl } from "assets"
import { colors } from "theme/colors"

export interface FiltersComponentProps extends DispatchProps {
  selectedFilters: string[]
}

export const FiltersComponent: React.FC<FiltersComponentProps> = ({ dispatch, selectedFilters }) => {
  const filters = {
    "All": "All",
    "Announcement": "Announcement 🔔",
    "Thanks": "#Thanks 🙏",
    "DailyUpdate": "Daily Update 💬"
  }

  const onSelectFilter = (filter: string) => dispatch(selectFilter(filter))

  return (
    <Container px={3} py={3} display="flex" alignItems="center" justifyContent="center">
      {Object.entries(filters).map(([key, value]) => {
        const isSelected = selectedFilters.includes(key)
        return (
          <Button
            borderRadius={8}
            padding={12}
            onClick={() => onSelectFilter(key)}
            style={{
              backgroundColor: isSelected ? colors.black100 : colors.white100,
              border: isSelected ? undefined : "1px solid #EEEEEE",
              marginRight: "8px"
            }}>
            <Text variant="body1" color={isSelected ? colors.white100 : colors.black100}>{value}</Text>
          </Button>
        )
      })}
    </Container>
  )
}

const Container = muiStyled(Box)({
  backgroundColor: colors.white100,
  width: "500px",
  borderRadius: "8px",
  boxShadow: "0px 8px 16px rgba(161, 163, 166, 0.08), 0px 4px 24px rgba(161, 163, 166, 0.08)",
  margin: "0 auto",
  top: "88px",
  position: "fixed",
  left: "70%",
  transform: "translateX(-70%)",
})

const FilterButton = styled.button`
  border-radius: 8px;
  padding: 12px 12px;
  margin-right: 8px;
  outline: none;
`

const mapStateToProps = (state: AppState) => ({
  selectedFilters: state.selectedFilters
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: (action: AppAction) => dispatch(action),
});

export const Filters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FiltersComponent);