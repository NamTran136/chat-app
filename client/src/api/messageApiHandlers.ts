import { SERVER_ENDPOINTS } from "../utils/constants";
import authFetchHandler from "./authFetchHandler";

export const sendMessage = async ({
  body,
  conversationId,
  senderId,
}: {
  body?: string;
  conversationId: string;
  senderId: string;
}) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.MESSAGE.CREATE,
    method: "POST",
    data: { body, conversationId, senderId },
  });
  return response?.data;
};
export const sendMessageHasFile = async ({
  body,
  conversationId,
  senderId,
  fileName,
  fileUrl,
}: {
  body?: string;
  conversationId: string;
  senderId: string;
  fileName?: string;
  fileUrl?: string;
}) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.MESSAGE.CREATEHASFILE,
    method: "POST",
    data: { body, conversationId, senderId, fileName, fileUrl },
  });
  return response?.data;
};

export const deleteMessage = async (messageId: string) => {
  const response = await authFetchHandler({
    endPoint: `${SERVER_ENDPOINTS.MESSAGE.DELETE}/${messageId}`,
    method: "DELETE",
    data: { messageId },
  });
  return response?.data;
};

export const getMessages = async (conversationId: string) => {
  const response = await authFetchHandler({
    endPoint: `${SERVER_ENDPOINTS.MESSAGE.GET}/${conversationId}`,
    method: "POST",
    data: { conversationId },
  });
  return response?.data ?? [];
};
