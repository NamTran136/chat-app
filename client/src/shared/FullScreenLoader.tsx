import { CircularProgress, Grid } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Grid
      container
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="centers"
    >
        <CircularProgress />
    </Grid>
  );
};

export default FullScreenLoader;
