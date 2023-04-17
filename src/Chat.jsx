import React, { useState } from "react";

const Chat = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUserMessage = { role: "user", content: inputMessage };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    setIsFetchingResponse(true);

    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userInfo: {
          level: userData.level,
          username: userData.username,
          interests: userData.interests,
          age: userData.age,
        },
        messages: [...messages, newUserMessage],
      }),
    });

    const data = await response.json();

    setIsFetchingResponse(false);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: data.aiMessage },
    ]);

    setInputMessage("");
  };

  return (
    <div>
      <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
    <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h2>Chat für {userData.username}</h2>
      <span>Stellen Sie eine Frage.</span>
      <div className="mb-4">
        <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Senden
        </button>
      </div>
    </form>
    <div>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.role === "assistant" ? "left  " : "right",
            }}
          >
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}

        {isFetchingResponse && (
          <div>
            <strong>ChatGPT</strong> ...denkt
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Chat