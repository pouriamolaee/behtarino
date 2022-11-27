import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: "#FF4866" },
    background: { default: grey[300] },
  },
});

export default theme;
