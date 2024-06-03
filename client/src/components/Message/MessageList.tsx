import { Grid } from "@mui/material";

const MessageList = () => {
  return (
    <Grid
      container
      height={`calc(100vh - 130px)`}
      sx={{
        overflowY: "scroll",
        flexWrap: "nowrap",
      }}
      p={2}
      flexDirection="column"
      gap={1}
    >
        hi
    </Grid>
  );
};

export default MessageList;
