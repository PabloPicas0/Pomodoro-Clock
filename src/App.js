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
  const [switchBreak, setSwitchBreak] = useState(false);

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
    const stop = document.getElementById("beep")
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(25 * 60);
    setSwitchBreak(false)
    clearInterval(interval);
    stop.pause()
    stop.currentTime = 0
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
    const audio = document.getElementById("beep");
    let onBreak = switchBreak;

    if (!timerOn) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0 && !onBreak) {
            audio.play();
            setSwitchBreak(true);
            return breakLength;
          }
          if (prev <= 0 && onBreak) {
            audio.play()
            setSwitchBreak(false)
            return sessionLength
          }
          return prev - 1;
        });
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
              switchBreak={switchBreak}
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
