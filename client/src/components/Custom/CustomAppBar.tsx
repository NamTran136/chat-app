import { ArrowBack, Close, Delete, MoreVert } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useConversationContext } from "../../hooks/useAllContextHooks";
import stringAvatar from "../../utils/stringAvatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface CustomAppBarProps {
  drawerWidth: number;
}

const CustomAppBar = ({ drawerWidth }: CustomAppBarProps) => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const [
    numberOfOnlineUsersInCurrentConversation,
    setNumberOfOnlineUsersInCurrentConversation,
  ] = useState<number>(0);
  const {
    chatMenuAnchorEl,
    setChatMenuAnchorEl,
    handleGoToHome,
    currentConversation,
    setCurrentConversation,
    handleDeleteConversation,
    handleGetNumberOfOnlineUsersInCurrentConversation,
  } = useConversationContext();
  useEffect(() => {
    getNumberOfOnlineUsersInCurrentConversation();
    
  });
  const getNumberOfOnlineUsersInCurrentConversation = async () =>{
    const result = await handleGetNumberOfOnlineUsersInCurrentConversation(
    currentConversation?.conversationId as string
    );
    setNumberOfOnlineUsersInCurrentConversation(result);
  };
  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          width: isTablet ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: { sm: `${drawerWidth}px` },
          background: theme.palette.background.default,
        }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item display="flex" gap={1} alignItems="center">
              {isTablet && (
                <IconButton onClick={handleGoToHome}>
                  <ArrowBack />
                </IconButton>
              )}
              <Avatar
                src={currentConversation?.imageUrl ?? ""}
                {...(!currentConversation?.imageUrl
                  ? stringAvatar(currentConversation?.title as string)
                  : {})}
              />
              <Grid item>
                <Typography color={theme.palette.text.secondary}>
                  {currentConversation?.title ?? ""}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.palette.text.secondary}
                >
                  {numberOfOnlineUsersInCurrentConversation > 1 ? "Online" : ""}
                </Typography>
              </Grid>
            </Grid>
            <IconButton
              sx={{ color: theme.palette.text.secondary }}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                setChatMenuAnchorEl(event.currentTarget);
              }}
            >
              <MoreVert />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      {Boolean(chatMenuAnchorEl) && (
        <Popover
          open={Boolean(chatMenuAnchorEl)}
          onClose={() => {
            setChatMenuAnchorEl(null);
          }}
          anchorEl={chatMenuAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MenuItem
            onClick={() => {
              setCurrentConversation && setCurrentConversation(null);
              setChatMenuAnchorEl(null);
              navigate("/");
            }}
          >
            <Grid item display="flex" alignItems="center" gap={1}>
              <IconButton>
                <Close />
              </IconButton>
              <Typography color={theme.palette.text.secondary}>
                Close
              </Typography>
            </Grid>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setChatMenuAnchorEl(null);
              handleDeleteConversation();
            }}
          >
            <Grid item display="flex" alignItems="center" gap={1}>
              <IconButton>
                <Delete color="error" />
              </IconButton>
              <Typography color={theme.palette.text.secondary}>
                Delete
              </Typography>
            </Grid>
          </MenuItem>
        </Popover>
      )}
    </>
  );
};

export default CustomAppBar;
