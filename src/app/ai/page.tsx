"use client";
import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { user_questions } from "@/lib/utils/question";
import AiPop from "@/components/core/Popups/AIPopups";

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
    <div className="flex flex-col items-center justify-center max-w-screen h-screen animate-fade-up animate-duration-[3000ms]">
      <AiPop/>
      <div className="flex flex-col w-full max-w-screen-sm h-full py-12 mx-auto bg-gray-100 dark:bg-zinc-800 border-1 rounded-lg shadow-xl">
        <div className="flex flex-col flex-grow overflow-y-auto p-6 max-h-min	">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-2 mx-2 text-sm  ${
                m.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`font-bold ${
                  m.role === "user"
                    ? "text-green-800  dark:text-green-200 animate-fade-left animate-duration-[3000ms]"
                    : "text-blue-800 dark:text-blue-200 animate-fade-right animate-duration-[3000ms]"
                }`}
              >
                {m.role === "user" ? (
                  "Kamu "
                ) : (
                  <>
                    <span className="font-bold text-md">MRT AI</span> {""}
                    <span className="font-normal text-xs">by CekMRT</span>
                  </>
                )}
              </span>

              <span
                className={`block whitespace-pre-wrap font-medium ${
                  m.role === "user"
                    ? "bg-green-200 rounded-lg px-4 py-2 text-sm text-gray-800 fill animate-fade-left animate-duration-[3000ms]"
                    : "bg-blue-200 rounded-lg px-4 py-2 text-sm text-black fill animate-fade-right animate-duration-[3000ms]"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between p-2 mx-2"
        >
          <input
            className="flex-grow p-2 border space-x-6 border-gray-300 rounded shadow-xl resize-none text-xs md:text-base"
            value={input}
            placeholder={placeholder}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="flex-grow p-2 mx-2 border space-x-6 border-gray-300  resize-none rounded shadow-xl dark:bg-slate-900 text-xs md:text-base"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
