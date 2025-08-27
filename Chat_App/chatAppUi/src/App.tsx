import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    "hii, there",
    "helo",
  ]);
  const wsRef = useRef();
  const inputRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const wss = new WebSocket("ws://localhost:8080");
    wsRef.current = wss;

    wss.onmessage = (msgData) => {
      setMessages((m) => [...m, msgData.data]); // append new msg
    };

    wss.onopen = () => {
      wss.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: "red" },
        })
      );
    };

    return () => wss.close();
  }, []);

  useEffect(() => {
    // Auto-scroll on new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const message = inputRef.current.value.trim();
    if (!message) return;

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: { message },
      })
    );

    setMessages((m) => [...m, `You: ${message}`]); 
    inputRef.current.value = ""; 
  };

  return (
    <div className="flex flex-col items-center w-[60vw] mx-auto h-screen bg-gradient-to-br from-gray-900 to-black text-white shadow-xl rounded-xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-center font-bold text-lg shadow-md">
        💬 Chat Room (red)
      </div>

      {/* Messages */}
      <div className="flex-1 w-full overflow-y-auto p-4 space-y-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-md break-words ${
              m.startsWith("You:")
                ? "ml-auto bg-indigo-600 text-white"
                : "mr-auto bg-gray-200 text-black"
            }`}
          >
            {m}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="w-full bg-gray-800 p-3 flex items-center gap-3 border-t border-gray-700">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-white"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
