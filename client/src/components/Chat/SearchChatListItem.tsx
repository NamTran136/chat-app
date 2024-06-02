import { IconButton, ListItem, useTheme } from "@mui/material";
import CustomTextField from "../../Custom/CustomTextField";
import { Search } from "@mui/icons-material";

const SearchChatListItem = () => {
  const theme = useTheme();
  return (
    <ListItem>
      <CustomTextField
        placeholder="Search Chats"
        size="small"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton sx={{ color: theme.palette.primary.main }}>
              <Search />
            </IconButton>
          ),
        }}
      />
    </ListItem>
  );
};

export default SearchChatListItem;
