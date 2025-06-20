<h1 align="center"> ByteBuzz Chat App</h1>
<p align="center">
  A powerful real-time chat app built with ❤️ using modern web technologies.
  <br/>
  <i>Spring Boot + React + WebSockets + MongoDB + Docker</i>
</p>

  <p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/rachitsharma300/bytebuzz-chat-app?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=for-the-badge" />
</p>


---

## 📸 Preview
add soon...


![Preview](assets/demo.gif)

---

##  Tech Stack

<table align="center">
  <tr>
    <td align="center" width="130">
      <img src="https://img.icons8.com/color/96/000000/react-native.png" width="48"/><br/>React
    </td>
    <td align="center" width="130">
      <img src="https://img.icons8.com/color/96/000000/spring-logo.png" width="48"/><br/>Spring Boot
    </td>
    <td align="center" width="130">
      <img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-mongodb-a-cross-platform-document-oriented-database-program-logo-color-tal-revivo.png" width="48"/><br/>MongoDB
    </td>
    <td align="center" width="130">
      <img src="https://img.icons8.com/color/96/000000/docker.png" width="48"/><br/>Docker
    </td>
    <td align="center" width="130">
      <img src="https://img.icons8.com/color/96/tailwind_css.png" width="48"/><br/>Tailwind CSS
    </td>
    <td align="center" width="130">
      <img src="https://www.vectorlogo.zone/logos/websocket/websocket-icon.svg" width="48"/><br/>WebSockets
    </td>
  </tr>
</table>

---
##  Features

- ✅ **Real-Time Messaging** using WebSockets
- 🧑‍🤝‍🧑 **Create & Join Chat Rooms**
- 💾 **MongoDB Storage** for chats
- 🎨 **Animated, Minimal UI** with Tailwind CSS
- 🧠 **Custom Chatbot Support** *(Coming Soon)*
- 🐳 **Dockerized App** – deploy anywhere!
- 🔐 Room-level privacy (optional)
- 🌙 Dark UI with React animations

---

## Project Structure
```
ByteBuzz-Chat-App/
├── bytebuzz-backend/
│   └── src/
│       └── main/
│           └── java/
│               └── com.rachit.bytebuzz.backend/
│                   ├── config/
│                   │   └── WebSocketConfig.java
│                   ├── controllers/
│                   │   ├── ChatController.java
│                   │   └── RoomController.java
│                   ├── entities/
│                   │   ├── Message.java
│                   │   └── Room.java
│                   ├── payload/
│                   │   └── MessageRequest.java
│                   ├── repositories/
│                   │   └── RoomRepository.java
│                   └── BytebuzzBackendApplication.java
│       ├── resources/
│       └── test/
│
├── bytebuzz-frontend/
│   └── src/
│       ├── assets/
│       │   ├── chat.png
│       │   └── react.svg
│       ├── components/
│       │   ├── ChatPage.jsx
│       │   └── JoinCreateChat.jsx
│       ├── config/
│       │   ├── AxiosHelper.js
│       │   ├── helper.js
│       │   └── Routes.jsx
│       ├── context/
│       │   └── ChatContext.jsx
│       ├── services/
│       │   └── RoomService.js
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       └── index.html
│
├── Dockerfile
├── .gitignore
├── README.md
└── package.json
```
