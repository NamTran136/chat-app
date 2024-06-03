import { Grid } from '@mui/material'
import ChatListDrawer from '../components/Chat/ChatListDrawer'
import ConversationContainer from '../components/Conversation/ConversationContainer'
const drawerWidth = 320;
const ResponsiveChatDrawer = () => {
  return (
    <Grid container>
      <ChatListDrawer drawerWidth={drawerWidth} />
      <ConversationContainer drawerWidth={drawerWidth} />
    </Grid>
  );
}

export default ResponsiveChatDrawer