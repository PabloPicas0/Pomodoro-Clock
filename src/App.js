import "./App.css";

import { useState } from "react";

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
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState("25:00");

  const handleReset = () => {
    const audio = document.getElementById("beep");
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("25:00");
    audio.pause();
  };

  const handleBreakIncrement = () => {
    setBreakLength((prev) => prev + 1);
  };

  const handleBreakDecrement = () => {
    if (breakLength === 1 || breakLength === 60) {
      return;
    }
    setBreakLength((prev) => prev - 1);
  };

  const handleSessionIncrement = () => {
    setSessionLength(prev => prev + 1)
  }
  const handleSessionDecrement = () => {
    if(sessionLength === 1 || sessionLength === 60) {
      return
    }
    setSessionLength(prev => prev - 1)
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "100vh",
        }}>
        <Title />

        <ThemeProvider theme={darkTheme}>
          <Paper elevation={8}>
            <Inputs
              breakLength={breakLength}
              sessionLength={sessionLength}
              handleBreakIncrement={handleBreakIncrement}
              handleBreakDecrement={handleBreakDecrement}
              handleSessionIncrement={handleSessionIncrement}
              handleSessionDecrement={handleSessionDecrement}
            />
            <Timer timeLeft={timeLeft} />
            <TimeControl reset={handleReset} />
            <audio
              id="beep"
              preload="auto"
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
          </Paper>
          <Footer />
        </ThemeProvider>
      </Box>
    </Container>
  );
}

export default App;
