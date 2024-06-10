"use client";
import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { user_questions } from "@/lib/utils/question";
import AiPop from "@/components/core/Popups/AIPopups";
import { markdownToHtml } from "@/lib/utils/remarkHtml";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [loading, setLoading] = useState(false); 
  const [placeholder, setPlaceholder] = useState(
    "Tanyakan seputar Layanan MRT dan Kota Jakarta"
  );
  const [formattedMessages, setFormattedMessages] = useState<
    { id: string; role: string; content: string }[]
  >([]);
  const [chatActive, setChatActive] = useState(true); 
  
  // Ganti text placeholder
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(user_questions[index]);
      index = (index + 1) % user_questions.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const formatMessages = async () => {
      const formatted = await Promise.all(
        messages.map(async (m) => {
          const htmlContent = await markdownToHtml(m.content);
          return { ...m, content: htmlContent };
        })
      );
      setFormattedMessages(formatted);
    };

    formatMessages();
  }, [messages]);

  const handleStopChat = () => {
    setChatActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-screen animate-fade-up animate-duration-[3000ms]">
      <AiPop />
      <div className="flex flex-col w-full max-w-screen-sm h-full py-12 mx-auto bg-gray-100 dark:bg-zinc-900 border-1 rounded-lg shadow-xl">
        <div className="flex flex-col flex-grow overflow-y-auto p-6 max-h-min">
          {/* Your chat UI */}
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
            disabled={!chatActive} // Disable input if chat is stopped
          />
          <button
            type="submit"
            className="flex p-2 mx-2 border space-x-6 border-gray-300  resize-none rounded shadow-xl dark:bg-slate-900 text-xs md:text-base"
            disabled={!chatActive} // Disable button if chat is stopped
          >
            Kirim
          </button>
          <button onClick={handleStopChat}>Stop Chat</button>
        </form>
        <div className="flex items-center justify-center text-xs text-gray-400 mx-4">
          <span className="text-center">
            MRT AI dapat membuat kesalahan. Pembatasan penggunaan berlaku.
          </span>
        </div>
      </div>
    </div>
  );
}
