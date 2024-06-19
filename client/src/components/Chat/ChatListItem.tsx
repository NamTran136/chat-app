import {
  Avatar,
  Badge,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Member } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import stringAvatar from "../../utils/stringAvatar";
import CircleIcon from "@mui/icons-material/Circle";
import { useConversationContext } from "../../hooks/useAllContextHooks";
import { useEffect, useState } from "react";

export interface ChatListItemProps {
  conversation: Member;
  currentConversation: Member | null;
}

const ChatListItem = ({
  conversation,
  currentConversation,
}: ChatListItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [
    numberOfOnlineUsersInCurrentConversation,
    setNumberOfOnlineUsersInCurrentConversation,
  ] = useState<number>(0);
  const { handleGetNumberOfOnlineUsersInCurrentConversation } =
    useConversationContext();
  useEffect(() => {
    getNumberOfOnlineUsersInCurrentConversation();
  });
  const getNumberOfOnlineUsersInCurrentConversation = async () => {
    const result = await handleGetNumberOfOnlineUsersInCurrentConversation(
      conversation?.conversationId as string
    );
    setNumberOfOnlineUsersInCurrentConversation(result);
  };
  return (
    <ListItem disablePadding sx={{ bgcolor: theme.palette.divider, mt: 1 }}>
      <ListItemButton
        selected={
          currentConversation?.conversationId === conversation?.conversationId
        }
        sx={{
          "&.Mui-selected": {
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        }}
        disableRipple
        disableTouchRipple
        focusRipple={false}
        onClick={() => {
          navigate(`/chat/${conversation?.conversationId}`, {
            state: conversation,
          });
        }}
      >
        <ListItemIcon>
          <Badge
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              <Typography fontWeight="bold" color={theme.palette.primary.main}>
                {numberOfOnlineUsersInCurrentConversation > 1 ? <CircleIcon sx={{fontSize: "8px"}} /> : <></>}
              </Typography>
            }
          >
            <Avatar
              src={conversation?.imageUrl ?? ""}
              {...(!conversation?.imageUrl
                ? stringAvatar(conversation?.title)
                : {})}
            />
          </Badge>
        </ListItemIcon>
        <Grid container flexDirection="column">
          <ListItemText
            primaryTypographyProps={{
              variant: "body1",
              color:
                currentConversation?.conversationId ===
                conversation?.conversationId
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
            }}
          >
            {conversation?.title ?? ""}
          </ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
