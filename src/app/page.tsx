'use client';
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); 
    setResult("");

    const response = await fetch(
      "/api/", {
      method: "POST",
      body: JSON.stringify({ url, alias }),
    });

    const data = await response.json();

    if (response.ok) {
      setResult(`${window.location.origin}/r/${alias}`);
    } else {
      setError(data.error);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-6 bg-black text-white text-xl font-bold">
        Link<span className="text-purple-600">Trim</span>
      </header>


      <main className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 max-w-md w-full p-4"
        >
          <h1 className="text-2xl font-semibold mb-2 text-center">Trim Your <span className="text-purple-600">Link</span></h1>

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-2 focus:outline-none transition duration-300 ease-in-out focus:border-purple-500"
          />

          <input
            type="text"
            placeholder="alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="border p-2 focus:outline-none transition duration-300 ease-in-out focus:border-purple-500"
          />

          <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 focus:bg-purple-700 ">
            Trim
          </button>
          
          {error && (
            <div className="text-red-600 text-center mt-2">
              {error}, please try again.
            </div>
          )}

          {result && (
            <div className="mt-2 text-base text-center">
              <p>Trimmed URL:</p>
              <a
                href={result}
                target="_blank"
                className="text-purple-500 underline"
              >
                {result}
              </a>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}