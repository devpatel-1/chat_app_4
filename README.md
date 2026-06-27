<div align="center">

# 💬 GatherIn

### Real-Time Room-Based Chat Application

**Connect • Chat • Collaborate**

A modern room-based chat application built with **Node.js**, **Express.js**, **Socket.IO**, and **MongoDB** that enables users to communicate instantly through real-time messaging.

---

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

# 📖 About

GatherIn is a **real-time room-based chat application** that allows users to communicate instantly inside dedicated chat rooms.

Users join a conversation by entering a **display name** and **room name**. Only participants within the same room can communicate, while users in different rooms remain completely isolated.

To provide a better user experience, **duplicate usernames are not allowed within the same room**, ensuring every participant has a unique identity.

The project demonstrates real-time communication, event-driven programming, responsive UI design, MongoDB integration, and cloud deployment.

---

# ✨ Features

- 💬 Real-time messaging using Socket.IO
- 👥 Create or join chat rooms
- 🔒 Private room-based conversations
- 🚫 Duplicate username validation within the same room
- 🟢 Live online users list
- 📍 Live location sharing using the Geolocation API
- 🚫 Profanity filtering using the **bad-words** package
- 📱 Fully responsive design
- 🎨 Modern dark-themed interface
- ☁️ Cloud deployment with Netlify & Render

---

# 🖼️ Project Screenshots

## 🔐 Login Interface

![Login](assets/login.png)

---

## 💬 Real-Time Chat Room

![Chat](assets/chat-room.png)

---

## 📱 Responsive Mobile Interface

![Mobile](assets/mobile.png)

---

## 📍 Live Location Sharing

![Location](assets/location.png)

---

## 🚫 Duplicate Username Validation

![Validation](assets/duplicate-user.png)

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Mustache.js
- Moment.js
- Qs
- Socket.IO Client

## Backend

- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose
- dotenv
- bad-words

## Tools & Deployment

- Git
- GitHub
- npm
- Nodemon
- Netlify
- Render

---

# 📂 Project Structure

```
GatherIn
│
├── assets/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── img/
│   ├── index.html
│   └── chat.html
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/devpatel-1/GatherIn.git
```

## Navigate into the Project

```bash
cd GatherIn
```

## Install Backend Dependencies

```bash
cd backend
npm install
```

## Create Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000
MONGODB_URL=YOUR_MONGODB_CONNECTION_STRING
```

## Start the Development Server

```bash
npm run dev
```

or

```bash
npm start
```

---

# 💡 Key Highlights

✅ Real-time communication using WebSockets

✅ Room-based messaging

✅ Duplicate username validation

✅ Live online users list

✅ Geolocation API integration

✅ Responsive UI

✅ Event-driven architecture

✅ Cloud deployment

---

# 📚 What I Learned

This project helped me gain hands-on experience with:

- Socket.IO
- Event-driven programming
- Express.js
- MongoDB & Mongoose
- Browser Geolocation API
- Environment variables using dotenv
- CORS configuration
- Client-server architecture
- Cloud deployment using Netlify & Render
- Git & GitHub workflow

---

# ⚡ Challenges

One of the biggest challenges during development was deploying the application and resolving **CORS** issues between the frontend and backend services.

Debugging production environments significantly improved my understanding of cross-origin communication, deployment strategies, and real-world application architecture.

---

# 🚀 Future Improvements

- 🔐 User Authentication (JWT)
- 💾 Chat History
- 📷 Image Sharing
- 📁 File Sharing
- ✍️ Typing Indicator
- ✅ Read Receipts
- 😀 Emoji Reactions
- 🌙 Dark / Light Theme
- 🔔 Push Notifications

---

# 👨‍💻 Developer

**Dev Patel**

Computer Engineering Student

GitHub: **https://github.com/devpatel-1**

LinkedIn: *(Add your LinkedIn profile URL here)*

---

# ⭐ Show Your Support

If you like this project, consider giving it a **⭐ Star** on GitHub.

It motivates me to continue building and sharing more projects!

---

# 📄 License

This project is licensed under the **MIT License**.