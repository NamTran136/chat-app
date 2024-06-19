import axios, { AxiosRequestConfig } from "axios";
import { VITE_SERVER_URL } from "../utils/constants";
import Cookies from "js-cookie";

export default async function authFetchHandler<T>({
  endPoint,
  method,
  data,
}: {
  endPoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data: T;
}) {
  const url = `${VITE_SERVER_URL}/${endPoint}`;
  const token = Cookies.get("token") as string;
  const options: AxiosRequestConfig<T> = {
    method: method || "GET",
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const response = await axios(url, options);
    return response;
  } catch (error) {
    console.log(error);
  }
}
