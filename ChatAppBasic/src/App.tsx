import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();
  function handleMessage() {
    if (!socket) {
      return;
    }
    //sending client side msg
    const msg = inputRef.current.value;


    // @ts-ignore
    socket.send(msg)
  }

  try {
    useEffect(() => {
      const ws = new WebSocket('ws://localhost:8080');
      setSocket(ws);
      ws.onmessage = (ev) => {
        alert(ev.data);
      };
    }, [])
  } catch (error) {
    console.log("Error while connecting with the WS server: ", error);
  }

  return (
    <div>
      <input type="text" ref={inputRef} name="" id="" placeholder='messgae....' />
      <button type='submit' onClick={handleMessage}>Send</button>
    </div>
  )
}

export default App
