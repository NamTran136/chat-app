import {
  Avatar,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import stringAvatar from "../../utils/stringAvatar";
import { Delete, DoneAll, MoreVert } from "@mui/icons-material";
import dayjs from "dayjs";
import React from "react";
import { useAuthContext } from "../../hooks/useAllContextHooks";
import useMessages from "../../hooks/useMessages";
import { Message } from "../../utils/types";
import { checkIfUrlIsImage } from "../../utils/helpers";
import DriveFileMoveSharpIcon from "@mui/icons-material/DriveFileMoveSharp";

interface MessageCardProps {
  message: Message;
  passRef: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}
const MessageCard = ({
  message,
  passRef,
  messagesEndRef,
}: MessageCardProps) => {
  const theme = useTheme();
  const { loggedInUser } = useAuthContext();
  const { handleDeleteMessage, messageCardAnchorEl, setMessageCardAnchorEl } =
    useMessages();

  return (
    <>
      <Grid
        ref={passRef ? messagesEndRef : null}
        p={1}
        item
        display="flex"
        alignItems="center"
        gap={2}
        maxWidth={"35%"}
        alignSelf={
          message?.senderEmail === loggedInUser?.user?.email
            ? "flex-end"
            : "flex-start"
        }
        flexDirection={
          message?.senderEmail === loggedInUser?.user?.email
            ? "row-reverse"
            : "row"
        }
      >
        <Avatar
          src={message?.senderImageUrl ?? ""}
          {...(message?.senderImageUrl
            ? {}
            : stringAvatar(message?.senderName))}
        />
        <Grid
          item
          display="flex"
          flexDirection="column"
          gap={1}
          p={1}
          sx={{
            bgcolor:
              message?.senderEmail === loggedInUser?.user?.email
                ? theme.palette.primary.main
                : theme.palette.grey[900],
            borderRadius: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={2}>
                <Grid item zeroMinWidth width="100%">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs zeroMinWidth>
                      <Typography color={theme.palette.text.primary}>
                        {message?.body}
                      </Typography>
                    </Grid>
                    {message?.senderEmail === loggedInUser?.user?.email && (
                      <Grid item alignSelf="flex-start">
                        <IconButton
                          sx={{ color: theme.palette.common.white }}
                          onClick={(
                            event: React.MouseEvent<
                              HTMLButtonElement,
                              MouseEvent
                            >
                          ) => {
                            setMessageCardAnchorEl(event.currentTarget);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                  {message?.fileName !== "" &&
                  message?.fileUrl &&
                  checkIfUrlIsImage(message?.fileUrl ?? "") ? (
                    <img
                      src={message?.fileUrl as string}
                      alt={message?.fileName as string}
                      style={{
                        maxWidth: "300px",
                        backgroundSize: "cover",
                      }}
                    />
                  ) : (
                    message?.fileName !== "" &&
                    message?.fileUrl && (
                      <Button
                        variant="outlined"
                        style={{
                          width: "100%",
                          zIndex: 10,
                          background: theme.palette.background.default,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        <DriveFileMoveSharpIcon />
                        <Typography
                          variant="body1"
                          maxWidth="65%"
                          noWrap
                          color={theme.palette.text.secondary}
                        >
                          {message?.fileName ?? "Name"}
                        </Typography>
                      </Button>
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* rest of the code */}
          <Grid
            item
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
          >
            <Typography variant="caption" color={theme.palette.text.primary}>
              {dayjs(message?.createdAt).format("MMM DD, YYYY h:mm A")}
            </Typography>
            <DoneAll
              sx={{ width: 16, height: 16, color: theme.palette.text.primary }}
            />
          </Grid>
        </Grid>
      </Grid>
      {Boolean(messageCardAnchorEl) && (
        <Popover
          open={Boolean(messageCardAnchorEl)}
          anchorEl={messageCardAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={() => {
            setMessageCardAnchorEl(null);
          }}
        >
          <MenuItem>
            <Grid
              item
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => {
                handleDeleteMessage(message);
              }}
            >
              <IconButton disableRipple>
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

export default MessageCard;
