import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useTheme,
} from "@mui/material";
import CustomButton from "../../Custom/CustomButton";
import CustomTextField from "../../Custom/CustomTextField";
import AddUserListItem from "../../shared/AddUserListItem";
import { StartConversationModalProps } from "../../utils/types";

const StartConversationModal = ({
  open,
  onClose,
  type
}: StartConversationModalProps) => {
    const theme = useTheme();
    return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle color={theme.palette.text.secondary}>Select users to start a conversation</DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={2} sx={{ width: "600px" }}>
          <CustomTextField
            size="small"
            placeholder="Search users to start conversation"
            variant="outlined"
          />
          {type === "GROUP" && (
            <CustomTextField
              size="small"
              required
              label="Group Title"
              placeholder="Please enter a group title"
              variant="outlined"
            />
          )}
          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={1}
            maxHeight="300px"
            sx={{ overflowY: "scroll" }}
          >
            <AddUserListItem />
            <AddUserListItem />
            <AddUserListItem />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton variant="text" onClick={()=>{
            onClose();
        }}>Close</CustomButton>
        <CustomButton variant="contained">Create</CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default StartConversationModal;
