"use client";
import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { user_questions } from "@/lib/utils/question";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [placeholder, setPlaceholder] = useState(
    "Tanyakan seputar Layanan MRT dan Kota Jakarta"
  );

  // Dynamically change placeholder every 5 seconds
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(user_questions[index]);
      index = (index + 1) % user_questions.length;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-screen">
      <div className="flex flex-col w-full max-w-screen-sm h-full py-12 mx-auto bg-gray-100 rounded-lg shadow-xl">
        <div className="flex flex-col flex-grow overflow-y-auto p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-2 text-sm  ${
                m.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`font-bold ${
                  m.role === "user" ? "text-blue-700" : "text-green-600"
                }`}
              >
                {m.role === "user" ? "User Bingung: " : "MRT AI: "}
              </span>
              <span>{m.content}</span>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between p-2"
        >
          <input
            className="flex-grow p-2 border border-gray-300 rounded shadow-xl resize-none text-sm md:text-base"
            value={input}
            placeholder={placeholder}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-600 rounded shadow-xl"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
