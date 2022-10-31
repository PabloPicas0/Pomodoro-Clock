import React from "react";

import { Typography } from "@mui/material";

const Title = () => {
  return (
    <>
      <header>
        <Typography
          variant="h1"
          align="center"
          color="#f5f5f5"
          sx={{ fontSize: "2.6rem" }}>
          Pomodoro Clock
        </Typography>
      </header>
    </>
  );
};

export default Title;
