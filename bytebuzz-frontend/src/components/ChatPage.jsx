import React, { useRef } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      content: "Hello, how are you?",
      sender: "Rachit",
    },
    {
      content: "I'm good, thanks! How about you?",
      sender: "Doe",
    },
    {
      content: "Doing well, just working on some projects.",
      sender: "Rachit",
    },
    {
      content: "Sounds great! Let me know if you need any help.",
      sender: "Mausam",
    },
    {
      content: "Hello, how are you?",
      sender: "Rachit",
    },
    {
      content: "I'm good, thanks! How about you?",
      sender: "Doe",
    },
    {
      content: "Doing well, just working on some projects.",
      sender: "Rachit",
    },
    {
      content: "Sounds great! Let me know if you need any help.",
      sender: "John",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [currentUser] = useState("Rachit");

  return (
    <div className="">
      {/* header section */}
      <header className="dark:border-gray-700 h-20 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        {/* room name container */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>Friends Room</span>
          </h1>
        </div>
        {/* username container */}
        <div>
          <h1 className="text-xl font-semibold">
            User : <span>Rachit Sharma</span>
          </h1>
        </div>
        {/* button leave room */}
        <div>
          <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      <main className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            } `}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-blue-800": "bg:blue-800"
              } p-2 max-w-xs rounded `}
            >
              <div className="flex flex-row gap-2">
                <img className="h-10 w-10" src="https://i.pravatar.cc" alt="" />
                <div className="flex-flex-col-gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input message container */}
      <div className="fixed bottom-4 w-full h-16">
        <div className="h-full pr-10 gap-4 flex items-center justify-between rounded-full w-11/12 md:w-2/3 lg:w-1/2 mx-auto dark:bg-gray-900 shadow-lg">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full dark:bg-gray-800 px-5 py-2 rounded-full h-full focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
          />
          <div className="flex gap-2">
            <button
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 h-10 w-10 flex justify-center items-center rounded-full transition-transform duration-300 hover:scale-110 shadow-md"
              title="Attach file"
            >
              <MdAttachFile size={20} className="text-white" />
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 h-10 w-10 flex justify-center items-center rounded-full transition-transform duration-300 hover:scale-110 shadow-md"
              title="Send message"
            >
              <MdSend size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
