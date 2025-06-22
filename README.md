Taskstack

**Taskstack** is a sleek, dark-themed blogging platform built with React, Firebase, Redux, and Tailwind CSS. It allows users to register, log in, create and browse posts. The UI is responsive and modern, following best practices for accessibility and design.

Features
- User authentication (Register, Login, Logout)
- Create and publish posts
- Real-time data with Firebase Firestore
- Dark theme with Poppins font and Tailwind CSS styling
- Smooth animations with Framer Motion
- State management via Redux

Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Auth + Firestore)
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Routing**: React Router

Getting Started


```bash
1. Clone the Repository
git clone https://github.com/your-username/taskstack.git
cd taskstack

2. Install Dependencies
npm install

3. Configure Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

4. Run the App
npm run dev


 Folder Structure
src/
├── Components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ...
├── Pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CreatePost.jsx
│   └── ...
├── Redux/
│   └── Slices/
│       └── authSlice.js
├── Helper/
│   └── firebase.js
└── App.jsx
