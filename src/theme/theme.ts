import { createMuiTheme } from "@material-ui/core"
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme"

import typography from "./typography"

const baseTheme = {
  typography,
} as ThemeOptions

export const theme = createMuiTheme(baseTheme)
