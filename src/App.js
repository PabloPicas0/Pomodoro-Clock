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
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const handleReset = () => {
    const audio = document.getElementById("beep");
    setBreakLength(5);
    setSessionLength(25);
    setMinutes(25);
    setTimeLeft(0);
    audio.pause();
  };

  const handleBreakIncrement = () => {
    if (breakLength >= 60) {
      return;
    }
    setBreakLength((prev) => prev + 1);
  };

  const handleBreakDecrement = () => {
    if (breakLength <= 1) {
      return;
    }
    setBreakLength((prev) => prev - 1);
  };

  const handleSessionIncrement = () => {
    if (sessionLength >= 60) {
      return;
    }
    setSessionLength((prev) => {
      setMinutes(prev + 1);
      return prev + 1;
    });
  };

  const handleSessionDecrement = () => {
    if (sessionLength <= 1) {
      return;
    }
    setSessionLength((prev) => {
      setMinutes(prev - 1);
      return prev - 1;
    });
  };

  // const handleStartStop = () => {
  //   setTimerOn(!timerOn);
  // };

  const handleTimer = () => {
    let oldDate = new Date()
    let countDownDate = new Date()

    //set the date we're counting to 
    countDownDate.setTime(oldDate.getTime() + (minutes * 60 * 1000 + 1000))

    //update the count down every 1 sec

    if(!timerOn) {
      let counter = setInterval(() => {
        //get today date
        let now = new Date().getTime()
  
        //find distance between future date and now
        let distance = countDownDate - now
  
        //time calculations for min and sec
        let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let sec = Math.floor((distance % (1000 * 60)) / 1000)
  
        setMinutes(min)
        setTimeLeft(sec)
  
        if(distance <= 0) {
          const playMusic = document.getElementById("beep")
          clearInterval(counter)
          playMusic.play()
          setMinutes(breakLength)
          setTimeLeft(0)
          console.log("beeep", minutes, timeLeft)
        }
        console.log(min, sec)
      }, 1000);
      localStorage.clear()
      localStorage.setItem("counter-id", counter)
    }

    if(timerOn) {
      clearInterval(localStorage.getItem("counter-id"))
    }
    setTimerOn(!timerOn)
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
              handleBreakIncrement={handleBreakIncrement}
              handleBreakDecrement={handleBreakDecrement}
              handleSessionIncrement={handleSessionIncrement}
              handleSessionDecrement={handleSessionDecrement}
            />
            <Timer timeLeft={timeLeft} minutes={minutes} />
            <TimeControl
              reset={handleReset}
              timerOn={timerOn}
              // handleStartStop={handleStartStop}
              handleTimer={handleTimer}
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
