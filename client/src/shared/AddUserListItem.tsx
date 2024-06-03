import { CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

const AddUserListItem = () => {
  const theme = useTheme();
  return (
    <ListItem
      sx={{
        color: theme.palette.common.white,
        bgcolor: theme.palette.divider,
        borderRadius: 4,
      }}
    >
      <ListItemButton sx={{ borderRadius: 4 }}>
        <ListItemIcon>
          <Avatar />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ color: theme.palette.text.secondary, variant: "h6" }}>User name</ListItemText>
        <ListItemIcon>
            <CheckCircle />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default AddUserListItem;
