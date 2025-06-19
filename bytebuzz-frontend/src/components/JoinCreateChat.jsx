import React from "react";
import chatIcon from "../assets/chat.png";
import  toast  from "react-hot-toast";
import { createRoomApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {
  /* Integration to backedend */
  const [detail, setDetail] = React.useState({
    roomId: "",
    userName: "",
  });

  const { roomId, userName, setRoomId, setCurrentUser, setConnected } = useChatContext();
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

  function joinChat() {
    if (validateForm()) {
      //Join the chat
    }
  }

  async function createRoom() {
    if (validateForm()) {
      //Create the room
      console.log(detail);
      // Call API to create room on the backend
      try {
        const response = await createRoomApi(detail.roomId);
        console.log(response);
        toast.success("Room created successfully");
        // Join the room
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);

        navigate("/chat");

// Redirect to chat page
       // joinChat();
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 dark:border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
        <div>
          <img src={chatIcon} className="w-24 mx-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room
        </h1>

        {/* For name div */}
        <div className="">
          <label htmlFor="" className="block font-medium mb-2">
            Your name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="name"
            name="userName"
            placeholder="Enter your name"
            className="w-full dark:bg-gray-600 px-4 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
        </div>

        {/* For room div */}
        <div className="">
          <label htmlFor="" className="block font-medium mb-2">
            Room ID / New Room ID
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="name"
            placeholder="Enter room ID or create new room ID"
            className="w-full dark:bg-gray-600 px-4 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
        </div>

        {/* For button */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={joinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full"
          >
            Join Room
          </button>

          <button
            onClick={createRoom}
            className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
