import { Grid, useMediaQuery } from "@mui/material";
import ChatListDrawer from "../Chat/ChatListDrawer";
import ConversationContainer from "../Conversation/ConversationContainer";
import { useConversationContext } from "../../hooks/useAllContextHooks";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NoChatOpen from "./NoChatOpen";
const drawerWidth = 320;
const ResponsiveChatDrawer = () => {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const { state } = useLocation();
  const { currentConversation, setCurrentConversation } =
    useConversationContext();
  useEffect(() => {
    if (state && state?.id) {
      setCurrentConversation && setCurrentConversation(state);
    } else {
      setCurrentConversation && setCurrentConversation(null);
    }
  }, [state, setCurrentConversation]);
  return (
    <Grid container>
      {isTablet && currentConversation?.id ? null : (
        <ChatListDrawer drawerWidth={drawerWidth} />
      )}
      {currentConversation && currentConversation?.id ? (
        <ConversationContainer drawerWidth={drawerWidth} />
      ) : (
        !isTablet && <NoChatOpen drawerWidth={drawerWidth} />
      )}
    </Grid>
  );
};

export default ResponsiveChatDrawer;
