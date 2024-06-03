import { Add, GroupAdd } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import StartConversationModal from "../Conversation/StartConversationModal";

const ChatListHeading = () => {
  const theme = useTheme();
  const [addChatAnchorEl, setAddChatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [openCreateConversationModal, setOpenCreateConversationModal] =
    useState<{isOpen: boolean; type: "DIRECT_MESSAGE" | "GROUP"}>({
      isOpen: false,
      type: "DIRECT_MESSAGE"
    });
  return (
    <>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{
            variant: "h5",
            color: theme.palette.text.secondary,
          }}
        >
          Chats
        </ListItemText>
        <ListItemIcon>
          <IconButton
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
            disableRipple
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              setAddChatAnchorEl(event.currentTarget);
            }}
          >
            <Add />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      {Boolean(addChatAnchorEl) && (
        <Popover
          open={Boolean(addChatAnchorEl)}
          onClose={() => {
            setAddChatAnchorEl(null);
          }}
          anchorEl={addChatAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenCreateConversationModal({
                  isOpen: true,
                  type: "DIRECT_MESSAGE"
                });
              }}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                New Chat
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{
              setOpenCreateConversationModal({
                isOpen: true,
                type: "GROUP",
              });
            }}>
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                New Group
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </Popover>
      )}
      {Boolean(openCreateConversationModal) && (
        <StartConversationModal
          open={openCreateConversationModal?.isOpen}
          onClose={() => {
            setOpenCreateConversationModal({isOpen: false, type: "DIRECT_MESSAGE"});
          }}
          type={openCreateConversationModal?.type}
        />
      )}
    </>
  );
};

export default ChatListHeading;
