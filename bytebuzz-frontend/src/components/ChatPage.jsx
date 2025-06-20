import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAttachFile, MdSend, MdExitToApp } from "react-icons/md";
import { FiUser, FiHash } from "react-icons/fi";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { baseURL } from "../config/AxiosHelper";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";
// import AIAssistantPanel from "../components/AIAssistantPanel";

const ChatPage = () => {
  const { roomId, currentUser, connected, setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (!connected) navigate("/");
  }, [connected, roomId, currentUser]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {}
    }
    if (connected) loadMessages();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(() => sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    if (connected) connectWebSocket();
  }, [roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message), {});
      setInput("");
    }
  };

  function handleLogOut() {
    stompClient?.disconnect();
    toast.success("See you soon!");
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="dark:border-gray-700 h-20 fixed w-full bg-white dark:bg-gray-900 py-5 shadow-md flex justify-between items-center px-6 z-10"
      >
        <div className="flex items-center gap-2">
          <FiHash className="text-blue-600 dark:text-blue-400 text-xl" />
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {roomId}
          </motion.h1>
        </div>

        <div className="flex items-center gap-2">
          <FiUser className="text-blue-600 dark:text-blue-400 text-xl" />
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            {currentUser}
          </motion.h1>
        </div>

        <motion.button
          onClick={handleLogOut}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all"
        >
          <MdExitToApp size={18} />
          <span>Leave</span>
        </motion.button>
      </motion.header>

      {/* Chat Messages */}
      <motion.main
        ref={chatBoxRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-28 px-6 w-full max-w-4xl mx-auto h-screen overflow-y-auto"
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"} mb-4`}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`p-3 rounded-2xl max-w-xs md:max-w-md ${
                  message.sender === currentUser
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-tl-none"
                } shadow-md`}
              >
                <div className="flex gap-3 items-start">
                  <img 
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-600" 
                    src={`https://i.pravatar.cc/150?u=${message.sender}`} 
                    alt={message.sender} 
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${message.sender === currentUser ? "text-white" : "text-blue-600 dark:text-blue-400"}`}>
                      {message.sender}
                    </p>
                    <p className={`mt-1 ${message.sender === currentUser ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>
                      {message.content}
                    </p>
                    <p className={`text-xs mt-1 ${message.sender === currentUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                      {timeAgo(message.timeStamp)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.main>

      {/* Message Input */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-6 w-full px-4"
      >
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl w-full max-w-2xl mx-auto p-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            title="Attach file"
          >
            <MdAttachFile size={22} />
          </motion.button>
          
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          
          <motion.button
            onClick={sendMessage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!input.trim()}
            className={`p-2 rounded-full ${input.trim() ? "bg-gradient-to-r from-green-500 to-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"}`}
            title="Send message"
          >
            <MdSend size={22} />
          </motion.button>
        </div>
      </motion.div>
      
    </div>
  );
};

export default ChatPage;