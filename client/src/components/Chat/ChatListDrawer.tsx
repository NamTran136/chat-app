import { Drawer, Grid, Divider, List, useMediaQuery } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import SearchChatListItem from "./SearchChatListItem";
import ChatListHeading from "./ChatListHeading";
import ChatListItems from "./ChatListItems";
import { ChatListDrawerProps } from "../../utils/types";
import { useConversationContext } from "../../hooks/useAllContextHooks";

const ChatListDrawer = ({
  drawerWidth
}: ChatListDrawerProps) => {
  const {conversations} = useConversationContext();
  const isTablet = useMediaQuery("(max-width: 768px)");
  return (
    <Grid
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isTablet ? "100%" : drawerWidth,
          },
        }}
      >
        <ChatListHeader />
        <Divider />
        <List>
          <SearchChatListItem />
          <Divider />
          <ChatListHeading />
          <ChatListItems conversations={conversations} />
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
