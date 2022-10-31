import React from "react";

import { Box, Paper } from "@mui/material";

const Footer = () => {
  return (
    <Paper component="footer" elevation={8} sx={{ paddingY: "5px" }}>
      <Box component="p">Created by Pablo</Box>
    </Paper>
  );
};

export default Footer;
