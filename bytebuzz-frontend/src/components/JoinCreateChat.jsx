import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiPlus,
  FiUsers,
  FiLock,
  FiStar,
  FiGlobe,
} from "react-icons/fi";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {
  const [detail, setDetail] = React.useState({
    roomId: "",
    userName: "",
  });
  const [isHoveringJoin, setIsHoveringJoin] = useState(false);
  const [isHoveringCreate, setIsHoveringCreate] = useState(false);
  const [activeTab, setActiveTab] = useState("join");
  const [roomType, setRoomType] = useState("public"); // 'public', 'private', 'premium'

  // Mock data for room availability
  const [roomStats, setRoomStats] = useState({
    public: { active: true, users: 1243 },
    private: { active: true, users: 587 },
    premium: { active: false, users: 256 },
  });

  const { roomId, userName, setRoomId, setCurrentUser, setConnected } =
    useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Joined room successfully");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Room not found");
        }
        console.log(error);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomApi(detail.roomId, roomType);
        toast.success(`Room created successfully (${roomType})`);
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        console.log(error);
        if (error.status === 400) {
          toast.error("Room already exists !");
        } else {
          toast("Error creating room");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 dark:border-gray-700 border w-full flex flex-col gap-6 max-w-md rounded-xl dark:bg-gray-900 shadow-xl bg-white"
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          }}
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, -5, 5, -5, 0],
            transition: { duration: 0.6 },
          }}
          className="flex justify-center"
        >
          <motion.img
            src={chatIcon}
            className="w-20 mx-auto"
            alt="Chat Icon"
            animate={{
              y: [0, -5, 0],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>

        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ByteBuzz Chat
        </h1>

        {/* Tab Navigation */}
        <div className="flex border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab("join")}
            className={`flex-1 py-2 font-medium transition-colors ${
              activeTab === "join"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Join Room
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2 font-medium transition-colors ${
              activeTab === "create"
                ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-500"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Create Room
          </button>
        </div>

        {/* Room Type Selection (Only shown for create tab) */}
        {activeTab === "create" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-2 mt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setRoomType("public")}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                roomType === "public"
                  ? "bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FiGlobe
                className={`text-2xl mb-1 ${
                  roomType === "public"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span className="font-medium">Public</span>
              <span className="text-xs mt-1">
                {roomStats.public.active ? (
                  <span className="text-green-600 dark:text-green-400">
                    Active • {roomStats.public.users} online
                  </span>
                ) : (
                  <span className="text-gray-500">Offline</span>
                )}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setRoomType("private")}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                roomType === "private"
                  ? "bg-purple-100 dark:bg-purple-900 border border-purple-300 dark:border-purple-700"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FiLock
                className={`text-2xl mb-1 ${
                  roomType === "private"
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span className="font-medium">Private</span>
              <span className="text-xs mt-1">
                {roomStats.private.active ? (
                  <span className="text-green-600 dark:text-green-400">
                    Active • {roomStats.private.users} online
                  </span>
                ) : (
                  <span className="text-gray-500">Offline</span>
                )}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setRoomType("premium")}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                roomType === "premium"
                  ? "bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FiStar
                className={`text-2xl mb-1 ${
                  roomType === "premium"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span className="font-medium">Premium</span>
              <span className="text-xs mt-1">
                {roomStats.premium.active ? (
                  <span className="text-green-600 dark:text-green-400">
                    Active • {roomStats.premium.users} online
                  </span>
                ) : (
                  <span className="text-gray-500">Coming soon</span>
                )}
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            Your Name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="name"
            name="userName"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </motion.div>

        {/* Room ID Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label
            htmlFor="roomId"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            {activeTab === "join" ? "Room ID" : "New Room ID"}
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="roomId"
            placeholder={
              activeTab === "join"
                ? "Enter existing room ID"
                : "Create new room ID"
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          {activeTab === "join" ? (
            <motion.button
              onClick={joinChat}
              onHoverStart={() => setIsHoveringJoin(true)}
              onHoverEnd={() => setIsHoveringJoin(false)}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
            >
              Join Room
              <motion.span
                animate={{ x: isHoveringJoin ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <FiUsers />
              </motion.span>
            </motion.button>
          ) : (
            <motion.button
              onClick={createRoom}
              onHoverStart={() => setIsHoveringCreate(true)}
              onHoverEnd={() => setIsHoveringCreate(false)}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg shadow-md transition-all ${
                roomType === "public"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : roomType === "private"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              Create {roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room
              <motion.span
                animate={{ x: isHoveringCreate ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {roomType === "public" ? (
                  <FiGlobe />
                ) : roomType === "private" ? (
                  <FiLock />
                ) : (
                  <FiStar />
                )}
              </motion.span>
            </motion.button>
          )}
        </motion.div>

        {/* Toggle between join/create */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2"
        >
          {activeTab === "join" ? (
            <span>
              Don't have a room?{" "}
              <button
                onClick={() => setActiveTab("create")}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Create one
              </button>
            </span>
          ) : (
            <span>
              Already have a room?{" "}
              <button
                onClick={() => setActiveTab("join")}
                className="text-orange-600 dark:text-orange-400 hover:underline font-medium"
              >
                Join instead
              </button>
            </span>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4"
        >
          <p>
            Built with ❤️ by
            <a
              href="https://rachitsharma300.github.io/rachitsharma/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Rachit Sharma
            </a>
          </p>
          <p className="mt-1">© {new Date().getFullYear()} ByteBuzz Chat</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JoinCreateChat;
