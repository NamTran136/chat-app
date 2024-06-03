import { Divider, Grid, IconButton, Popover, useTheme } from "@mui/material";
import CustomTextField from "../../Custom/CustomTextField";
import { AttachFile, EmojiEmotions, Outbound } from "@mui/icons-material";
import React, { useState } from "react";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data"
import { EmojiData } from "../../utils/types";

const SendMessageContainer = () => {
  const theme = useTheme();
  const [openEmojiPickerEl, setOpenEmojiPickerEl] =
    useState<HTMLElement | null>(null);
  return (
    <>
      <Divider />
      <Grid item px={5} py={1} display="flex" alignItems="center" gap={2}>
        <CustomTextField
          placeholder="Send Message"
          fullWidth
          multiline
          size="small"
          maxRows={2}
          InputProps={{
            startAdornment: (
              <IconButton sx={{ color: theme.palette.success.main }}>
                <AttachFile />
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
                <IconButton sx={{ color: theme.palette.success.light }}>
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
          <EmojiPicker data={data} onEmojiSelect={(emojiData: EmojiData) => {
            console.log(emojiData);
          }} />
        </Popover>
      )}
    </>
  );
};

export default SendMessageContainer;
