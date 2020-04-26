import React from "react"
import { Box } from "@material-ui/core"
import { styled as muiStyled } from '@material-ui/core/styles'
import styled from "styled-components"

export const HoverBox = muiStyled(Box)({
    cursor: "pointer",
    "&:hover": {
        "box-shadow": "0px 8px 16px rgba(161, 163, 166, 0.16), 0px 4px 24px rgba(161, 163, 166, 0.24)",
    }
})