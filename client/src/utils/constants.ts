export const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const VITE_IMAGE_KIT_URL_ENDPOINT = import.meta.env
  .VITE_IMAGE_KIT_URL_ENDPOINT;
export const VITE_IMAGE_KIT_PUBLIC_KEY = import.meta.env
  .VITE_IMAGE_KIT_PUBLIC_KEY;
export const SERVER_ENDPOINTS = {
  AUTH: {
    LOGIN: "Auth/login",
    SIGNUP: "Auth/register",
  },
  CONVERSATION: {
    CREATE: "Conversation/create",
    CREATEGROUP: "Conversation/createGroup",
    GET: "Conversation",
    DELETE: "Conversation",
  },
  IMG_KIT: {
    DELETE: "img-kit/delete",
  },
  MESSAGE: {
    CREATE: "Message/create",
    CREATEHASFILE: "Message/createhasfile",
    DELETE: "Message",
    GET: "Message",
  },
  USERS: {
    GET: "Users/GetAll",
  },
};
