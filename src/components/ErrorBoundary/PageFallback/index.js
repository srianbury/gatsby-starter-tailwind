import * as React from "react";
import { Box, Grid } from "@mui/material";

const PageFallback = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
  >
    <Grid item xs={3}>
      <Box>An error occurred.</Box>
    </Grid>
  </Grid>
);

export { PageFallback };
