import { Dialog, DialogActions, DialogContent } from "@mui/material";

import ViewAttachedMedia from "../shared/ViewAttachedMedia";
import CustomButton from "../Custom/CustomButton";

const ViewAttachedFileModal = ({
  open,
  onClose,
  fileName,
  setFile,
  fileUrl,
  handleSendMessage,
}: {
  open: boolean;
  onClose: () => void;
  fileName: string;
  setFile: React.Dispatch<any>;
  fileUrl: string | ArrayBuffer | null;
  handleSendMessage: () => Promise<void>;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <ViewAttachedMedia src={fileUrl as string} name={fileName} />
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="outlined"
          onClick={() => {
            setFile(undefined);
            onClose();
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton variant="contained" onClick={handleSendMessage}>
          Send
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAttachedFileModal;
