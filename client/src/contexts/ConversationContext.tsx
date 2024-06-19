import { createContext, useCallback, useEffect, useRef, useState } from "react";
//import { ConversationContextType } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { ConversationType, Member, Message, User } from "../utils/types";
import { getAllUsers, getUsersBySearchValue } from "../api/usersApiHandlers";
import { useDebounce } from "../hooks/useDebounce";
import { useAuthContext } from "../hooks/useAllContextHooks";
import toast from "react-hot-toast";
import {
  createDirectConversation,
  createGroupConversation,
  deleteConversation,
  getConversations,
  getConversationsBySearchName,
} from "../api/conversationApiHandlers";
import { getMessages } from "../api/messageApiHandlers";
import ChatServices from "./ChatServices";
interface ConversationContextType {
  allMessages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  currentConversation: Member | null;
  setCurrentConversation: React.Dispatch<React.SetStateAction<Member | null>>;
  handleGoToHome: () => void;
  newMessagesInConversations: Message[];
  setNewMessageInConversations: React.Dispatch<React.SetStateAction<Message[]>>;
  groupTitle: string;
  setGroupTitle: React.Dispatch<React.SetStateAction<string>>;
  conversations: Member[];
  allUsers: User[];
  addChatAnchorEl: HTMLElement | null;
  setAddChatAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  openCreateConversationModal: {
    isOpen: boolean;
    type: ConversationType;
  };
  setOpenCreateConversationModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      type: ConversationType;
    }>
  >;
  selectedUserForConversation: string[];
  setSelectedUserForConversation: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  handleCreateConversation: () => Promise<void>;
  handleSearchUserChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDeleteConversation: () => Promise<void>;
  chatMenuAnchorEl: HTMLElement | null;
  setChatMenuAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  searchConversationValue: string;
  setSearchConversationValue: React.Dispatch<React.SetStateAction<string>>;
  handleGetNumberOfOnlineUsersInCurrentConversation: (
    conversationId: string
  ) => Promise<number>;
  //   handleResetNewMessagesInConversation: (cId: string) => void;
  searchUserValue: string;
}

export const ConversationContext = createContext<ConversationContextType>(
  {} as ConversationContextType
);

export default function ConversationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { loggedInUser } = useAuthContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  //const [loggedInUserId, setLoggedInUserId] = useState<number>(0);
  const loggedInUserId = loggedInUser?.user?.id;
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchUserValue, setSearchUserValue] = useState<string>("");
  const [addChatAnchorEl, setAddChatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [openCreateConversationModal, setOpenCreateConversationModal] =
    useState<{ isOpen: boolean; type: ConversationType }>({
      isOpen: false,
      type: "DIRECT_MESSAGE",
    });
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [selectedUserForConversation, setSelectedUserForConversation] =
    useState<string[]>([]);
  const [chatMenuAnchorEl, setChatMenuAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [currentConversation, setCurrentConversation] = useState<Member | null>(
    null
  );
  const [conversations, setConversations] = useState<Member[]>([]);
  const [searchConversationValue, setSearchConversationValue] =
    useState<string>("");
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [newMessagesInConversations, setNewMessageInConversations] = useState<
    Message[]
  >([]);
  //functions
  const handleGetUsers = useCallback(
    async (searchUserValue?: string) => {
      let users;
      if (searchUserValue && searchUserValue !== "") {
        users = await getUsersBySearchValue(searchUserValue);
      } else {
        users = await getAllUsers();
      }
      if (loggedInUserId) {
        if (users && Array.isArray(users) && users?.length > 0) {
          setAllUsers(
            users?.filter((item) => item?.id !== loggedInUser?.user?.id)
          );
        } else {
          setAllUsers([]);
        }
      }
    },
    [loggedInUserId]
  );
  function handleSearchUserChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchUserValue(event.target.value);
  }
  async function handleCreateConversation() {
    if (Boolean(groupTitle)) {
      try {
        const response = await createGroupConversation({
          admin: loggedInUser?.user?.id as string,
          members: selectedUserForConversation,
          groupTitle,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to create the conversation please try again later",
          {
            style: {
              borderRadius: "10px",
              backgroundColor: "#333",
              color: "#fff",
            },
          }
        );
      }
    } else {
      try {
        const response = await createDirectConversation({
          admin: loggedInUser?.user?.id as string,
          members: selectedUserForConversation,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to create the conversation please try again later",
          {
            style: {
              borderRadius: "10px",
              backgroundColor: "#333",
              color: "#fff",
            },
          }
        );
      }
    }
    setOpenCreateConversationModal({ isOpen: false, type: "DIRECT_MESSAGE" });
    setAddChatAnchorEl(null);
    setSelectedUserForConversation([]);
    setGroupTitle("");
    handleGetConversation();
  }
  function handleGoToHome() {
    setCurrentConversation(null);
    setSearchConversationValue("");
    navigate("/");
  }
  const handleGetConversation = useCallback(
    async (searchConversationValue?: string) => {
      let allConversations;
      if (searchConversationValue && searchConversationValue !== "") {
        try {
          allConversations = await getConversationsBySearchName({
            id: loggedInUser?.user?.id as string,
            searchName: searchConversationValue,
          });
          setConversations(allConversations);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch conversations please try again", {
            style: {
              borderRadius: "10px",
              backgroundColor: "#333",
              color: "#fff",
            },
          });
        }
      } else {
        try {
          allConversations = await getConversations({
            id: loggedInUser?.user?.id as string,
          });
          setConversations(allConversations);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch conversations please try again", {
            style: {
              borderRadius: "10px",
              backgroundColor: "#333",
              color: "#fff",
            },
          });
        }
      }
    },
    [searchConversationValue, loggedInUser]
  );
  const handleGetMessages = useCallback(
    async (conversationId?: string) => {
      if (conversationId && conversationId !== "") {
        const response = await getMessages(conversationId);
        if (response) {
          setAllMessages(response ?? []);
        } else {
          setAllMessages([]);
        }
      } else {
        setAllMessages([]);
      }
    },
    [allMessages]
  );
  async function handleDeleteConversation() {
    try {
      const response = await deleteConversation(
        currentConversation?.conversationId as string
      );
      if (response) {
        setChatMenuAnchorEl(null);
        handleGoToHome();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ?? "Failed to delete conversation please try again",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
    handleGoToHome();
  }
  const handleGetNumberOfOnlineUsersInCurrentConversation = async (conversationId: string) => {
    const count = await ChatServices.getNumberOfMembersInConversation(
      conversationId
    );
    return count;
  };
  //useEffect
  useEffect(()=>{
    if(loggedInUser.isAuthenticated) {
      conversations?.forEach(async (conversation)=>{
        await ChatServices.joinConversation(conversation.conversationId);
      })
    }
    else{
      conversations?.forEach(async (conversation) => {
        await ChatServices.leaveConversation(conversation.conversationId);
      });
    }
  })
  useEffect(() => {
    if (openCreateConversationModal?.isOpen) {
      if (searchUserValue) {
        debouncedSearchUser(searchUserValue);
      } else {
        handleGetUsers();
      }
    }
  }, [openCreateConversationModal, searchUserValue, handleGetUsers]);
  useEffect(() => {
    if (!messagesEndRef?.current || !allMessages.length) {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages, messagesEndRef]);
  useEffect(() => {
    if (
      loggedInUser &&
      loggedInUser?.isAuthenticated &&
      loggedInUser?.user?.id
    ) {
      if (searchConversationValue) {
        debouncedSearchChat(searchConversationValue);
      } else {
        handleGetConversation();
      }
    }
  }, [
    searchConversationValue,
    loggedInUser,
    handleGetConversation,
    handleDeleteConversation,
    handleCreateConversation,
  ]);

  useEffect(() => {
    if (currentConversation && currentConversation?.conversationId) {
      handleGetMessages(currentConversation?.conversationId);
    }
  }, [currentConversation, handleGetMessages]);
  //debounced
  const debouncedSearchUser = useDebounce(handleGetUsers, 500);
  const debouncedSearchChat = useDebounce(handleGetConversation, 500);
  return (
    <ConversationContext.Provider
      value={{
        allUsers,
        handleSearchUserChange,
        setOpenCreateConversationModal,
        openCreateConversationModal,
        searchUserValue,
        groupTitle,
        setGroupTitle,
        selectedUserForConversation,
        setSelectedUserForConversation,
        addChatAnchorEl,
        setAddChatAnchorEl,
        handleCreateConversation,
        chatMenuAnchorEl,
        setChatMenuAnchorEl,
        handleGoToHome,
        currentConversation,
        setCurrentConversation,
        conversations,
        searchConversationValue,
        setSearchConversationValue,
        allMessages,
        newMessagesInConversations,
        setNewMessageInConversations,
        handleDeleteConversation,
        messagesEndRef,
        handleGetNumberOfOnlineUsersInCurrentConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
