import { Grid } from "@mui/material";
import { useConversationContext } from "../../hooks/useAllContextHooks";
import MessageCard from "./MessageCard";

const MessageList = () => {
  const { allMessages, messagesEndRef } = useConversationContext();
  return (
    <Grid
      container
      height={`calc(100vh - 130px)`}
      sx={{
        overflowY: "scroll",
        flexWrap: "nowrap",
      }}
      p={2}
      flexDirection="column"
      gap={1}
    >
      {allMessages &&
        Array.isArray(allMessages) &&
        allMessages?.length > 0 &&
        allMessages?.map((message, index) => (
          <MessageCard
            key={message?.id}
            messagesEndRef={messagesEndRef}
            passRef={index === allMessages?.length - 1}
            message={message}
          />
        ))}
    </Grid>
  );
};

export default MessageList;
