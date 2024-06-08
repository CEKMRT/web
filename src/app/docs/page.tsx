"use client";
import React, { useState } from "react";
import { codeExamples } from "@/lib/utils/codeExample";

const Page = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleChangeLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleCopyToClipboard = () => {
    const codeToCopy = codeExamples[selectedLanguage];
    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying code to clipboard:", error);
        alert("Failed to copy code to clipboard. Please try again.");
      });
  };

  return (
    <div className="p-4 relative overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        {/* <h1>Akan Hadir Dokumentasi API</h1> */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">API Documentation</h1>

          <section className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              Welcome to our API documentation! Our API allows you to access
              various resources and perform action like fetching station data.
            </p>
          </section>

          <section className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p>
              To get started, you&apos;ll need to sign up for an API key. Once
              you have your API key, you can authenticate your requests by
              including it in the headers of your HTTP requests. Sign up now for
              API key{" "}
              <a
                href="/api/authkey"
                target="_blank"
                className=" hover:text-green-600 hover:font-bold"
              >
                here
              </a>
              .
            </p>
          </section>

          <section className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
            <ul className="list-disc ml-6">
              <li>
                <strong>GET /api/schedules</strong>: Get a list of entire
                stations schedules.
              </li>
              <li>
                <strong>GET /api/schedules/&apos;id&apos;</strong>: Get a
                specific station by ID.
              </li>
              {/* Add more endpoints here */}
            </ul>
          </section>

          <section className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <h2 className="text-2xl font-bold mb-4">Rate Limiting</h2>
            <p>
              We enforce rate limiting to ensure fair usage of our API. You can
              make up to 12 requests per hour with your API key.
            </p>
          </section>

          <section className="mb-8 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <h2 className="text-2xl font-bold mb-4">Sample Code</h2>
            <div className="flex items-center mb-4">
              <label className="mr-2">Select Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => handleChangeLanguage(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="golang">Golang</option>

                {/* Add more language options here */}
              </select>
            </div>
            <div className="relative">
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code>{codeExamples[selectedLanguage]}</code>
            </pre>
            <button
              className="absolute bottom-2 right-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleCopyToClipboard}
            >
              Copy
            </button>
            </div>
          </section>

          <section className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <h2 className="text-2xl font-bold mb-4">FAQs</h2>
            <p>
              <strong>Q: How do I obtain an API key?</strong>
              <br />
              A: You can obtain an API key by signing up on our website and
              generating one in the developer portal.
            </p>
            {/* Add more FAQs here */}
          </section>

          <section className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p>
              If you have any questions or need further assistance, please
              contact us at support@cekmrt.xyz
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;

{
  /* <p>
Akses Link API
<Link
  rel="stylesheet"
  href="https://mrt-production.up.railway.app/api/schedules"
  target="_blank"
  className="font-bold"
>
  {" "}
  disini
</Link>
</p> */
}
