import React from "react";

import { Box, Button } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faRefresh } from "@fortawesome/free-solid-svg-icons";

const TimeControl = () => {
    return (
      <Box className="time-control">
        <Button sx={{ borderRadius: "50%" }}>
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button sx={{ borderRadius: "50%" }}>
          <FontAwesomeIcon icon={faRefresh} />
        </Button>
      </Box>
    );
}

export default TimeControl;