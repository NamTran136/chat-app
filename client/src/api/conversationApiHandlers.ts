import { SERVER_ENDPOINTS } from "../utils/constants";
import authFetchHandler from "./authFetchHandler";
export const createDirectConversation = async (data: {
  admin: string;
  members: string[];
}) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.CONVERSATION.CREATE,
    method: "POST",
    data,
  });
  return response?.data;
};

export const createGroupConversation = async (data: {
  admin: string;
  groupTitle: string;
  members: string[];
}) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.CONVERSATION.CREATEGROUP,
    method: "POST",
    data,
  });
  return response?.data;
};

export const getConversations = async ({ id }: { id: string }) => {
  const response = await authFetchHandler({
    endPoint: `${SERVER_ENDPOINTS.CONVERSATION.GET}?id=${id}`,
    method: "POST",
    data: {
      id,
    },
  });
  return response?.data;
};

export const getConversationsBySearchName = async ({
  id,
  searchName,
}: {
  id: string;
  searchName: string;
}) => {
  const response = await authFetchHandler({
    endPoint: `${SERVER_ENDPOINTS.CONVERSATION.GET}/searchName?id=${id}&searchName=${searchName}`,
    method: "POST",
    data: { id, searchName},
  });
  return response?.data;
};

export const deleteConversation = async (id: string) => {
  const response = await authFetchHandler({
    endPoint: `${SERVER_ENDPOINTS.CONVERSATION.DELETE}/${id}`,
    method: "DELETE",
    data: {
      id,
    },
  });
  return response?.data;
};