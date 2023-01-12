import { Roboto } from "@next/font/google"
import { createTheme } from "@mui/material/styles"

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(186, 55, 202)",
    },
    secondary: {
      main: "rgb(37, 38, 43)",
      contrastText: "rgb(180, 180, 180)",
    },
    background: {
      default: "rgb(26, 27, 30)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },
})

export default theme
