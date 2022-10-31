import "./App.css";

import Title from "./Components/Title";
import Inputs from "./Components/inputs";
import Timer from "./Components/Timer";
import TimeControl from "./Components/TimeControl";
import Footer from "./Components/Footer";

import { Container } from "@mui/system";
import { Box, createTheme, Paper, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", minHeight: "100vh" }}>
        <Title />
        <ThemeProvider theme={darkTheme}>
          <Paper elevation={8}>
            <Inputs />
            <Timer />
            <TimeControl />
          </Paper>
            <Footer/>
        </ThemeProvider>
      </Box>
    </Container>
  );
}

export default App;
