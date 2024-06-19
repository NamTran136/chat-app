import { Grid, Toolbar, useMediaQuery } from "@mui/material";
import CustomAppBar from "../Custom/CustomAppBar";
import MessageList from "../Message/MessageList";
import SendMessageContainer from "../Message/SendMessageContainer";

interface ConversationContainerProps {
  drawerWidth: number;
}

const ConversationContainer = ({ drawerWidth }: ConversationContainerProps) => {
  const isTablet = useMediaQuery("(max-width: 768px)");
  return (
    <Grid
      sx={{
        ml: isTablet ? 0 : `${drawerWidth}px`,
      }}
      container
      flexDirection="column"
      width="100%"
    >
      <CustomAppBar drawerWidth={drawerWidth} />
      <Toolbar />
      <MessageList />
      <SendMessageContainer />
    </Grid>
  );
};

export default ConversationContainer;
