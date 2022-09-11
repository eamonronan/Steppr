import React from 'react'

function MessageItem( {message} ) {
    console.log({message});
  return (
   <div>
    <h3 className="message">{message.text}</h3>
    <h4>{message.createdAt}</h4>
   </div>
  )
}

export default MessageItem