import { Divider, Grid, IconButton, Popover, useTheme } from "@mui/material";
import CustomTextField from "../Custom/CustomTextField";
import { AttachFile, EmojiEmotions, Outbound } from "@mui/icons-material";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { EmojiData } from "../../utils/types";
import useMessages from "../../hooks/useMessages";
import ViewAttachedFileModal from "./ViewAttachedFileModal";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import toast from "react-hot-toast";

const SendMessageContainer = () => {
  const theme = useTheme();
  const {
    messageBody,
    setMessageBody,
    handleSendMessage,
    openEmojiPickerEl,
    setOpenEmojiPickerEl,
    handleCloseViewAttachedMediaModal,
    openViewAttachedMediaModal,
    setOpenViewAttachedMediaModal,
  } = useMessages();
  const fileRef = useRef<any | null>(null);
  const [file, setFile] = useState<any | undefined>(undefined);
  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);
  function uploadFile(file: any | undefined) {
    const storage = getStorage(app);
    setMessageBody((prev) => ({ ...prev, fileName: file?.name as string }));
    const fileName = file.name;
    const storageRef = ref(storage, "message-files/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Update is " + progress + "% done");
        if(progress === 100) {
          toast.success("Upload the file successfully.", {
            style: {
              borderRadius: "10px",
              backgroundColor: "#333",
              color: "#fff",
            },
          });
        }
      },
      (error: any) => {
        console.log(error.message);
        setMessageBody((prev) => ({ ...prev, fileName: "" }));
        toast.error(
          "Failed to upload the file (File format not supported) please try again later",
          {
            style: {
              borderRadius: "10px",
              backgroundColor: "#333",
              color: "#fff",
            },
          }
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMessageBody((prev) => ({
            ...prev,
            fileUrl: downloadURL as string,
          }));
        });
      }
    );
  }

  const sendMessage = async (): Promise<void> => {
    await handleSendMessage();
    setFile(undefined)
    handleCloseViewAttachedMediaModal();
  };
  return (
    <>
      {openViewAttachedMediaModal && (
        <ViewAttachedFileModal
          open={openViewAttachedMediaModal}
          onClose={handleCloseViewAttachedMediaModal}
          setFile={setFile}
          fileName={messageBody?.fileName as string}
          fileUrl={messageBody?.fileUrl as string}
          handleSendMessage={sendMessage}
        />
      )}
      <Divider />
      <Grid item px={5} py={1} display="flex" alignItems="center" gap={2}>
        <CustomTextField
          value={messageBody?.body}
          placeholder="Send Message"
          fullWidth
          multiline
          size="small"
          maxRows={2}
          sx={{ color: "#333!important" }}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setMessageBody((prev) => ({ ...prev, body: event.target.value }));
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (
              event.key === "Enter" &&
              ((messageBody?.body && messageBody?.body?.length > 0) ||
                messageBody?.fileUrl)
            ) {
              event.stopPropagation();
              handleSendMessage();
            }
          }}
          InputProps={{
            startAdornment: (
              <IconButton
                sx={{ color: theme.palette.success.main }}
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <AttachFile />
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                      setOpenViewAttachedMediaModal(true);
                    }
                  }}
                />
              </IconButton>
            ),
            endAdornment: (
              <Grid item display="flex" alignItems="center" gap={1}>
                <IconButton
                  sx={{ color: theme.palette.warning.main }}
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    setOpenEmojiPickerEl(event.currentTarget);
                  }}
                >
                  <EmojiEmotions />
                </IconButton>
                <IconButton
                  sx={{ color: theme.palette.success.light }}
                  onClick={handleSendMessage}
                >
                  <Outbound />
                </IconButton>
              </Grid>
            ),
          }}
        />
      </Grid>
      {Boolean(openEmojiPickerEl) && (
        <Popover
          open={Boolean(openEmojiPickerEl)}
          onClose={() => {
            setOpenEmojiPickerEl(null);
          }}
          anchorEl={openEmojiPickerEl}
        >
          <EmojiPicker
            data={data}
            onEmojiSelect={(emojiData: EmojiData) => {
              setMessageBody((prev) => ({
                ...prev,
                body: `${prev?.body} ${emojiData?.native}`,
              }));
            }}
          />
        </Popover>
      )}
    </>
  );
};

export default SendMessageContainer;
