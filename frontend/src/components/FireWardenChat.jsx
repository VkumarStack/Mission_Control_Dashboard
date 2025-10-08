import { useState } from "react";
import apiClient from "../api/apiClient";

export default function FireWardenChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    // Mocked API call
    const res = { data: { reply: "AI Warden: Evacuate zone 2 immediately." } };
    setResponse(res.data.reply);
  };

  return (
    <div>
      <h2>AI Fire Warden Chat</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask the AI Warden something..."
      />
      <br />
      <button onClick={sendMessage}>Send</button>
      <p>{response}</p>
    </div>
  );
}