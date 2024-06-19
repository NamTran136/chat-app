import { useState } from "react";
import { Message, MessageBody } from "./../utils/types";
import { deleteMessage, sendMessage, sendMessageHasFile } from "../api/messageApiHandlers";
import { useAuthContext, useConversationContext } from "./useAllContextHooks";
export default function useMessages() {
  const { currentConversation } = useConversationContext();
  const { loggedInUser } = useAuthContext();
  const [messageBody, setMessageBody] = useState<MessageBody>({
    body: "",
    fileName: "",
    fileUrl: "",
  });
  const [openEmojiPickerEl, setOpenEmojiPickerEl] =
    useState<HTMLElement | null>(null);
  const [messageCardAnchorEl, setMessageCardAnchorEl] =
    useState<HTMLElement | null>(null);
  const [file, setFile] = useState<any | undefined>(undefined);
  const [openViewAttachedMediaModal, setOpenViewAttachedMediaModal] =
    useState<boolean>(false);
  function handleCloseViewAttachedMediaModal() {
    handleReset();
    setOpenViewAttachedMediaModal(false);
    setFile(undefined);
  }
  async function handleSendMessage() {
    //console.log(currentConversation, loggedInUser, messageBody);
    if (currentConversation?.userId === loggedInUser?.user?.id && messageBody) {
      console.log({
        body: messageBody?.body as string,
        conversationId: currentConversation?.conversationId as string,
        senderId: currentConversation?.id as string,
        fileName: messageBody?.fileName as string,
        fileUrl: messageBody?.fileUrl as string,
      });
      if (messageBody?.fileName) {
        await sendMessageHasFile({
          body: messageBody?.body as string,
          conversationId: currentConversation?.conversationId as string,
          senderId: currentConversation?.id as string,
          fileName: messageBody?.fileName as string,
          fileUrl: messageBody?.fileUrl as string
        });
      } else {
        await sendMessage({
          body: messageBody?.body as string,
          conversationId: currentConversation?.conversationId as string,
          senderId: currentConversation?.id as string,
        });
      }
    }
    handleReset();
  }
  function handleReset() {
    setMessageBody({ fileUrl: "", body: "" });
    setFile(undefined);
  }
  async function handleDeleteMessage(message: Message) {
    setMessageCardAnchorEl(null);
    await deleteMessage(message?.id as string);
  }
  return {
    messageBody,
    setMessageBody,
    handleSendMessage,
    openEmojiPickerEl,
    setOpenEmojiPickerEl,
    handleDeleteMessage,
    messageCardAnchorEl,
    setMessageCardAnchorEl,
    handleCloseViewAttachedMediaModal,
    file,
    openViewAttachedMediaModal,
    setOpenViewAttachedMediaModal,
  };
}
