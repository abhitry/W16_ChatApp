import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [messages,setMessage]=useState(["hi there","hello"]);
  const wsRef=useRef();
  const inputRef=useRef();


  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:8080");
    ws.onmessage=((event)=>{setMessage(m=>[...m,event.data])})
    //@ts-ignore
    wsRef.current=ws;

    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }

    return ()=>{
      ws.close();
    }
  },[]);


  return (
    <div className='h-screen bg-black '>
      <br/><br/><br/>
      <div className='h-[85vh] '>
        {messages.map(message=><div className='m-8'><span className='bg-white text-black rounded p-4 m-8'>{message}</span></div>)}
      </div>

      <div className='bg-white w-full bg-white flex '>
        <input ref={inputRef} id="message" className="text  p-4 flex-1 p-4" ></input>
        <button onClick={()=>{
          // @ts-ignore
          const message=inputRef.current?.value;
          // @ts-ignore
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))
        }} className='bg-purple-600 text-white p-4'>Send Message</button>
      </div>
    </div>
  )
}

export default App
