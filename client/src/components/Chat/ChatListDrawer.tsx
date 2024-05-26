import { Drawer, Grid, Divider } from "@mui/material";
import ChatListHeader from "./ChatListHeader";

const drawerWidth = 320;

const ChatListDrawer = () => {
  return <Grid sx={{ width: { sm: drawerWidth } }}>
    <Drawer variant="permanent"
    sx={{
        "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
        }
    }} >
        <ChatListHeader />
        <Divider />
    </Drawer>
  </Grid>;
};

export default ChatListDrawer;
