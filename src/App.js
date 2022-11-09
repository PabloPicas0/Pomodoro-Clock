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

let interval;

function App() {
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [switchString, setSwitchString] = useState(false);

  const converter = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const handleReset = () => {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(25 * 60);
    clearInterval(interval)
  };

  const handleTimeLength = (amount, type) => {
    if (type === "Break") {
      if ((breakLength <= 60 && amount < 0) || breakLength >= 3600) {
        return;
      }
      setBreakLength((prev) => prev + amount);
    } else {
      if ((sessionLength <= 60 && amount < 0) || sessionLength >= 3600) {
        return;
      }
      setSessionLength((prev) => prev + amount);
    }

    if (!timerOn && type !== "Break") {
      setTimeLeft(sessionLength + amount);
    }
  };

  const handleTime = () => {
    if (!timerOn) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);

        if (timeLeft <= 0) {
          const audio = document.getElementById("beep");
          clearInterval(interval);
          audio.play();
          setSwitchString(!switchString)
        }
      }, 1000);
    }

    if (timerOn) {
      clearInterval(interval);
    }

    setTimerOn(!timerOn);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}>
        <Title />

        <ThemeProvider theme={darkTheme}>
          <Paper elevation={8}>
            <Inputs
              breakLength={breakLength}
              sessionLength={sessionLength}
              handleTimeLength={handleTimeLength}
              converter={converter}
            />
            <Timer
              timeLeft={timeLeft}
              switchString={switchString}
              converter={converter}
            />
            <TimeControl
              timerOn={timerOn}
              handleTimer={handleTime}
              reset={handleReset}
            />
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
