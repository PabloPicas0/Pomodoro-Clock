import "./App.css";

import { useEffect, useState } from "react";

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
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [switchBreak, setSwitchBreak] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("beep")

    if (timeLeft <= 0 && !switchBreak) {
      audio.play();
      setSwitchBreak(true);
      setTimeLeft(breakLength);
    }
    if (timeLeft <= 0 && switchBreak) {
      audio.play();
      setSwitchBreak(false);
      setTimeLeft(sessionLength);
    }

    if(sessionLength < 0) {
      setSessionLength(60)
      setTimeLeft(60)
    }
    console.log(timeLeft, switchBreak)
  }, [timeLeft, sessionLength])

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
    const stop = document.getElementById("beep");
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(25 * 60);
    setTimerOn(false)
    setSwitchBreak(false);
    clearInterval(localStorage.getItem("interval-id"))
    stop.pause();
    stop.currentTime = 0;
  };

  const handleTimeLength = (amount, type) => {
    if (type === "Break") {
      if ((breakLength <= 60 && amount < 0) || breakLength >= 3600) {
        return;
      }
      setBreakLength((prev) => prev + amount);
    } else {
      if ((sessionLength <= 60 && amount <= 0) || sessionLength >= 3600) {
        return;
      }
      setSessionLength((prev) => prev + amount);
      if (!timerOn) {
        setTimeLeft(sessionLength + amount);
      }
    }
  };

  const handleTime = () => {
    let seconds = 1000;
    let date = new Date().getTime();
    let futureDate = new Date().getTime() + seconds;

    if (!timerOn) {
      let interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
      }, 1000);
      localStorage.clear()
      localStorage.setItem("interval-id", interval)
    }

    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
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
              handleTime={handleTime}
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
