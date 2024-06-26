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
  const [formattedMessages, setFormattedMessages] = useState<{id: string, role: string, content: string}[]>([]);

  // Dynamically change placeholder every 5 seconds
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

  
  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-screen animate-fade-up animate-duration-[3000ms]">
      <AiPop />
      <div className="flex flex-col w-full max-w-screen-sm h-full py-12 mx-auto bg-gray-100 dark:bg-zinc-900 border-1 rounded-lg shadow-xl">
        <div className="flex flex-col flex-grow overflow-y-auto p-6 max-h-min">
          <div className="text-left mb-2 mx-2 text-sm ">
            <div className="font-bold text-sm text-gray-800 dark:text-zinc-200 animate-fade-right animate-duration-[3000ms]">
              Tips MRT AI
            </div>
            <span
              className=" block whitespace-pre-wrap font-medium text-sm text-gray-800 dark:text-zinc-900 animate-fade-right animate-duration-[3000ms]
              bg-gray-200 rounded-lg px-4 py-2 fill"
            >
              Masukan pesan yang ingin kamu kirimkan pada kolom input dibagian
              bawah untuk memulai!
            </span>
          </div>
          {formattedMessages.map((m) => (
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
                    MRT AI{" "}
                    <span className="font-normal text-xs">by CekMRT</span>
                  </>
                )}
              </span>

              <div
                className={`block font-medium ${
                  m.role === "user"
                    ? "bg-green-200 rounded-lg px-4 py-2 text-sm text-gray-800 fill animate-fade-left animate-duration-[3000ms]"
                    : "bg-blue-200 rounded-lg px-4 py-2 text-sm text-black fill animate-fade-right animate-duration-[3000ms]"
                }`}
                dangerouslySetInnerHTML={{ __html: m.content }}
              />
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
            className="flex p-2 mx-2 border space-x-6 border-gray-300  resize-none rounded shadow-xl dark:bg-slate-900 text-xs md:text-base"
          >
            Kirim
          </button>
        </form>
        <div className="flex items-center justify-center text-xs text-gray-400 mx-4">
          <span className="text-center">MRT AI dapat membuat kesalahan. Pembatasan berlaku.</span>
        </div>
      </div>
    </div>
  );
}
