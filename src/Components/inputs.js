import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Inputs = () => {
  return (
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" align="center" color="#f5f5f5">
            Break Length
          </Typography>
          <Box sx={{ display: "flex", height: 60, gap: 1 }}>
            <Button sx={{ borderRadius: "50%", fontSize: "1.1rem" }}>
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <span>5</span>
            <Button sx={{ borderRadius: "50%", fontSize: "1.1rem" }}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" align="center" color="#f5f5f5">
            Session Length
          </Typography>
          <Box sx={{ display: "flex", height: 60, gap: 1 }}>
            <Button sx={{ borderRadius: "50%", fontSize: "1.1rem" }}>
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <span>25</span>
            <Button sx={{ borderRadius: "50%", fontSize: "1.1rem" }}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
          </Box>
        </Box>
      </Box>
  );
};

export default Inputs;
