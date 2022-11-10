import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Inputs = (props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          id="break-label"
          variant="h6"
          align="center"
          color="#f5f5f5">
          Break Length
        </Typography>

        <Box sx={{ display: "flex", height: 60, gap: 1 }}>
          <Button
            id="break-increment"
            sx={{ borderRadius: "50%", fontSize: "1.1rem" }}
            onClick={() => props.handleTimeLength(60, "Break")}>
            <FontAwesomeIcon icon={faArrowUp} />
          </Button>

          <span id="break-length">
            {props.converter(props.breakLength)}
          </span>

          <Button
            id="break-decrement"
            sx={{ borderRadius: "50%", fontSize: "1.1rem" }}
            onClick={() => props.handleTimeLength(-60, "Break")}>
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          id="session-label"
          variant="h6"
          align="center"
          color="#f5f5f5">
          Session Length
        </Typography>

        <Box sx={{ display: "flex", height: 60, gap: 1 }}>
          <Button
            id="session-increment"
            sx={{ borderRadius: "50%", fontSize: "1.1rem" }}
            onClick={() => props.handleTimeLength(60, "Session")}>
            <FontAwesomeIcon icon={faArrowUp} />
          </Button>

          <span id="session-length">
            {props.converter(props.sessionLength)}
          </span>

          <Button
            id="session-decrement"
            sx={{ borderRadius: "50%", fontSize: "1.1rem" }}
            onClick={() => props.handleTimeLength(-60, "Session")}>
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Inputs;
