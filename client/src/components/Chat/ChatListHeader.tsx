import {
  Grid,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { Home, Settings } from "@mui/icons-material";
import { useState } from "react";
import SettingsMenu from "./SettingsMenu";

const ChatListHeader = () => {
  const theme = useTheme();
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  return (
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Tooltip title={"Some"} placement="bottom" arrow>
          <Typography
            variant="h5"
            maxWidth="65%"
            noWrap
            color={theme.palette.text.secondary}
          >
            Some very long name
          </Typography>
        </Tooltip>
        <IconButton
          disableRipple
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
          }}
        >
          <Home />
        </IconButton>
        <IconButton
          disableRipple
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
          }}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setSettingsMenuAnchorEl(event.currentTarget);
          }}
        >
          <Settings />
        </IconButton>
      </Grid>
      <SettingsMenu
        settingsMenuAnchorEl={settingsMenuAnchorEl}
        setSettingsMenuAnchorEl={setSettingsMenuAnchorEl}
      />
    </Toolbar>
  );
};

export default ChatListHeader;
