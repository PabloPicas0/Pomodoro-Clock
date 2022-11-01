import React from "react";

import { Box, Typography } from "@mui/material";

const Timer = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid #cddc39",
        borderRadius: 5,
        color: "#f5f5f5",
        height: "250px",
        marginY: "5px",
      }}>
      <Typography id="timer-label" variant="h4" align="center">
        Session
      </Typography>
      <Typography id="time-left" variant="h3" align="center">
        {props.timeLeft}
      </Typography>
    </Box>
  );
};

export default Timer;
