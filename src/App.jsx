import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Chat from './Chat'
import "./App.css";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleRegistration = () => {
    setShowLoginForm(true);
  };

  const handleLogin = (user, userData) => {
    setUser(user);
    setUserData(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setUserData(null);
  };

  return (
    <div className="App">
      {user ? (
        <>
        <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <ul className="flex">
          <li className="mr-6 cursor-pointer">Home</li>
          <li className="mr-6 cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
        </nav>
          <Chat userData={userData}></Chat>
        </>
      ) : (
        <>
        <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <ul className="flex">
          <li className="mr-6 cursor-pointer">Home</li>
          <li className="mr-6 cursor-pointer" onClick={() => setShowLoginForm(!showLoginForm)}>
            {showLoginForm ? "Registrieren" : "Login"}
          </li>
        </ul>
        </nav>
          {showLoginForm ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegisterForm onRegistration={handleRegistration} />
          )}
        </>
      )}
    </div>
  );
}

export default App;