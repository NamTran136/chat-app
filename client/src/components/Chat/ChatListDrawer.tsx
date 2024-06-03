import { Drawer, Grid, Divider, List } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import SearchChatListItem from "./SearchChatListItem";
import ChatListHeading from "./ChatListHeading";
import ChatListItems from "./ChatListItems";

interface ChatListDrawerProps {
  drawerWidth: number;
}

const ChatListDrawer = ({drawerWidth}: ChatListDrawerProps) => {
  return (
    <Grid sx={{ width: { sm: drawerWidth } }}>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <ChatListHeader />
        <Divider />
        <List>
          <SearchChatListItem />
          <Divider />
          <ChatListHeading />
          <ChatListItems />
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
