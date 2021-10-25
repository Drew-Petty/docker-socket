import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client'
import React, {useEffect, useState} from 'react';


function App() {
  // const [socket]= useState(()=>io("http://localhost:3001")) //for running on local machine
  const [socket]= useState(()=>io("http://localhost:3001")) // for running in docker network backend needs to be exposed

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    console.log("is this thing on?");
    socket.on('post chat',msg=>{
      setMessages(prevMsgs => {return [...prevMsgs, msg]})
    })
    return () => socket.disconnect(true)
  },[socket])

  const onChangeHandler = e =>{
      setInput(e.target.value);
  }
  const onSubmitHandler =e=>{
    e.preventDefault();
    socket.emit('chat', input);
    setInput("");
  }
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="msg" autoComplete="off" onChange={onChangeHandler} value={input}/>
        <input type="submit" />
      </form>
      {
        messages.map((item, i)=>{
          return <h4 key={i}>{item}</h4>
        })
      }
    </div>
  );
}

export default App;
