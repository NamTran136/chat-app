import { useConversationContext } from "../../hooks/useAllContextHooks";
import { Member } from "../../utils/types";
import ChatListItem from "./ChatListItem";

const ChatListItems = ({
  conversations,
}: {
  conversations: Member[];
}) => {
  const { currentConversation } = useConversationContext()!;
  if (
    conversations &&
    Array.isArray(conversations) &&
    conversations?.length > 0
  ) {
    return conversations.map((conversation) => (
      <ChatListItem key={conversation?.id} currentConversation={currentConversation} conversation={conversation} />
    ));
  }
};

export default ChatListItems;
