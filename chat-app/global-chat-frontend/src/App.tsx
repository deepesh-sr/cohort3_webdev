import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [msg , setMsg] = useState(["Hello everyone"])
  const wsRef = useRef<WebSocket>(null);
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (e) => {
      setMsg(m => [...m,e.data])
    }
    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        "type" : "join",
        "payload" : {
          "room_id" : "red"
        }
      }))
    }

    wsRef.current = ws;

    return ()=> ws.close();

  },[]);

  return (
    <>
      <div>
        <div>

        </div>
        <div>
          <input id='inputbox' type="text" placeholder='Enter your message'/>
          <button onClick={()=>{
            // @ts-ignore
            const msg = document.getElementById('inputbox').value;
            wsRef.current?.send(JSON.stringify({
              "type" : "chat",
              "payload" : {
                "message" : msg
              }
            }))
          }}>Send</button>
        </div>
      </div>
    </>
  )
}

export default App
