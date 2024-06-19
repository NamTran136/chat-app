import { AddCircle, CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { AddUserListItemProps } from "../../utils/types";
import stringAvatar from "../../utils/stringAvatar";

const AddUserListItem = ({
  user,
  type,
  selectedUsers,
  setSelectedUsers,
}: AddUserListItemProps) => {
  const theme = useTheme();
  const isCurrentUserSelected = selectedUsers?.find((u) => u === user?.id);
  function handleSelectUser() {
    if (type === "DIRECT_MESSAGE") {
      setSelectedUsers([user.id]);
    }
    if (type === "GROUP") {
      setSelectedUsers((prevUsers) => {
        if (isCurrentUserSelected) {
          return prevUsers?.filter((u) => u !== user?.id);
        }
        return [...prevUsers, user.id];
      });
    }
  }
  return (
    <ListItem
      sx={{
        color: theme.palette.common.white,
        bgcolor: isCurrentUserSelected
          ? theme.palette.primary.main
          : theme.palette.divider,
        borderRadius: 4,
      }}
    >
      <ListItemButton
        sx={{ borderRadius: 4 }}
        selected={!!isCurrentUserSelected}
        onClick={handleSelectUser}
      >
        <ListItemIcon>
          <Avatar
            sx={{ color: theme.palette.text.secondary }}
            src={user?.imageUrl ?? ""}
            {...(user?.imageUrl ? null : { ...stringAvatar(user?.name) })}
          />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: theme.palette.text.secondary,
            variant: "h6",
          }}
        >
          {user?.name}
        </ListItemText>
        <ListItemIcon
          sx={{
            color: isCurrentUserSelected
              ? theme.palette.common.white
              : theme.palette.primary.main,
          }}
        >
          {isCurrentUserSelected ? <CheckCircle /> : <AddCircle />}
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default AddUserListItem;
