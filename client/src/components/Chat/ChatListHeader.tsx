import {
  Grid,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Home, Settings } from "@mui/icons-material";
import { useState } from "react";
import SettingsMenu from "./SettingsMenu";
import {
  useAuthContext,
  useConversationContext,
} from "../../hooks/useAllContextHooks";

const ChatListHeader = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 768px)");
  const { loggedInUser } = useAuthContext();
  const { handleGoToHome } = useConversationContext();
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  return (
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Tooltip
          title={loggedInUser?.user?.name ?? ""}
          placement="bottom"
          arrow
        >
          <Typography
            variant="h5"
            maxWidth="65%"
            noWrap
            color={theme.palette.text.secondary}
          >
            {loggedInUser?.user?.name ?? ""}
          </Typography>
        </Tooltip>
        <Grid item display="flex" alignItems="center" gap={1}>
          {!isTablet && (
            <IconButton
              disableRipple
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.common.white,
              }}
              onClick={() => {
                handleGoToHome();
              }}
            >
              <Home />
            </IconButton>
          )}
          
          <IconButton
            disableRipple
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              setSettingsMenuAnchorEl(event.currentTarget);
            }}
          >
            <Settings />
          </IconButton>
        </Grid>
      </Grid>
      <SettingsMenu
        settingsAnchorEl={settingsMenuAnchorEl}
        setSettingsAnchorEl={setSettingsMenuAnchorEl}
      />
    </Toolbar>
  );
};

export default ChatListHeader;
