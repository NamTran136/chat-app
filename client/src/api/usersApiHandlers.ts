import { SERVER_ENDPOINTS } from "../utils/constants";
import authFetchHandler from "./authFetchHandler";

export const getAllUsers = async  () => {
    const response = await authFetchHandler({
      endPoint: SERVER_ENDPOINTS.USERS.GET,
      method: "GET",
      data: {}
    });
    console.log(response);
    return response?.data ?? [];
}

export const getUsersBySearchValue = async (searchUserValue?: string) => {
  const response = await authFetchHandler({
    endPoint: `${SERVER_ENDPOINTS.USERS.GET}/${searchUserValue}`,
    method: "GET",
    data: {},
  });
  console.log(response);
  return response?.data ?? [];
};