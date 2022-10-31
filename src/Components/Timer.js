import React from "react";

import { Box, Typography } from "@mui/material";

const Timer = () => {
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
      <Typography variant="h4" align="center">
        Session
      </Typography>
      <Typography variant="h3" align="center">
        24:00
      </Typography>
    </Box>
  );
};

export default Timer;
