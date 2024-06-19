import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ConversationContext } from "../contexts/ConversationContext";

export function useAuthContext() {
  return useContext(AuthContext);
}

export const useConversationContext = () => {
  return useContext(ConversationContext);
};
