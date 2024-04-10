import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const App = () => {
  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
    console.log(socket.connected);
  };
  return (
    <div>
      <input type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};
export default App;
