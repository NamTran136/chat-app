import { Grid, Paper, Typography, useTheme } from "@mui/material";

const NoChatOpen = ({ drawerWidth }: { drawerWidth: number }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{ ml: { ms: `${drawerWidth}px` } }}
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Paper variant="elevation" sx={{ p: 5 }}>
        <Typography color={theme.palette.text.secondary} variant="h4">
          Click on a chat to start
        </Typography>
      </Paper>
    </Grid>
  );
};

export default NoChatOpen;
