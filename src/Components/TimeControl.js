import React from "react";

import { Box, Button } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faRefresh } from "@fortawesome/free-solid-svg-icons";

const TimeControl = (props) => {
    return (
      <Box className="time-control">

        <Button id="start_stop" sx={{ borderRadius: "50%" }}>
          <FontAwesomeIcon icon={faPlay} />
        </Button>

        <Button id="reset" sx={{ borderRadius: "50%" }} onClick={props.reset}>
          <FontAwesomeIcon icon={faRefresh} />
        </Button>

      </Box>
    );
}

export default TimeControl;