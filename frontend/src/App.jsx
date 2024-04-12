import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const App = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([""]);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };

  useEffect(() => {
    const handleNewMessage = (data) => {
      setReceivedMessage((prev) => [...prev, data.message]);
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === "enter") {
            sendMessage();
            // setMessage("");
          }
        }}
      />
      <button
        // onClick={() => {
        // sendMessage();
        // setMessage("");
        // }}
        onClick={sendMessage}
      >
        Send Message
      </button>
      <br />
      <p>
        {receivedMessage.map((message, i) => {
          return <p key={message + i}>{message}</p>;
        })}
      </p>
    </div>
  );
};
export default App;
