import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import AudioMessage from "./AudioMessage";
import "./bubble.css";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  console.log("Messages:", messages); // Debugging: Check if messages contain audio URLs

  // Fetch messages and subscribe to real-time updates
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  // Scroll to the latest message when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Loading state
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // Fallback if no user is selected
  if (!selectedUser) {
    return <div className="flex items-center justify-center h-full text-gray-500">Select a user to start chatting.</div>;
  }

  return (
    <div className="flex-1 flex flex-col h-full max-h-screen">
  <ChatHeader />
  <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-10rem)]">
    {messages.length > 0 ? (
      messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-image avatar">
            <div className="w-12 h-12 rounded-full border-2 border-primary">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>

          <div
            className={`${
              message.senderId === authUser._id ? "bg-primary" : "bg-base-300/100"
            } p-4 rounded-lg shadow-lg w-auto max-w-[75%] md:max-w-[60%]`}
          >
            {/* Text Messages */}
            {message.text && (
              <p
                className={`${
                  message.senderId === authUser._id ? "text-primary-content" : "text-base-content"
                } break-words`}
              >
                {message.text}
              </p>
            )}

            {/* Images with fixed size constraints */}
            {message.image && (
              <div className="overflow-hidden rounded-md shadow-md mt-3 max-w-full">
                <img
                  src={message.image}
                  alt="Attachment"
                  className="w-full h-auto max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] object-contain rounded-lg"
                />
              </div>
            )}

            {/* Voice Notes */}
            {message.audio && (
              <div className="w-full max-w-[250px] md:max-w-[300px]">
                <AudioMessage audioSrc={message.audio} />
              </div>
            )}

            {/* Timestamp */}
            <div
              className={`mt-1 text-xs ${
                message.senderId === authUser._id ? "text-primary-content/70" : "text-base-content/60"
              }`}
            >
              <time className="text-[10px]">{formatMessageTime(message.createdAt)}</time>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
    )}
    <div ref={messageEndRef}></div>
  </div>
  <MessageInput />
</div>

  );
};

export default ChatContainer;
