import React from 'react'
import './Chat.css'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import ChatBox from './ChatBox/ChatBox';
import RightSideBar from './RightSideBar/RightSideBar';
function Chat() {
  return (
    <div className='chat'>
      <div className="chat-conatiner">
       <LeftSideBar/>
       {/* <ChatBox/> */}
       <RightSideBar/>
      </div>
    </div>
  )
}

export default Chat
