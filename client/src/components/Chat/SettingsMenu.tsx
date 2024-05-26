import { ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, useTheme } from "@mui/material";
import { SettingsMenuProps } from "../../utils/types";
import { Contrast, DarkMode, Logout } from "@mui/icons-material";
import { useThemeContext } from "../../contexts/ThemeContextProvider";


const SettingsMenu = ({
  settingsMenuAnchorEl,
  setSettingsMenuAnchorEl,
}: SettingsMenuProps) => {
    const theme = useTheme();
    const { mode, handleSetTheme } = useThemeContext();
  if (settingsMenuAnchorEl) {
    return (
      <Popover
        open={Boolean(settingsMenuAnchorEl)}
        onClose={() => {
          setSettingsMenuAnchorEl(null);
        }}
        anchorEl={settingsMenuAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ListItem>
          <ListItemButton
            onClick={() => {
              handleSetTheme(mode === "light" ? "dark" : "light");
            }}
          >
            <ListItemIcon>
              {mode === "light" ? <DarkMode /> : <Contrast />}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: theme.palette.text.secondary }}
            >
              Switch to {mode === "light" ? "dark" : "light"} mode
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: theme.palette.text.secondary }}
            >
              Logout
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Popover>
    );
  } else return null;
};

export default SettingsMenu;
