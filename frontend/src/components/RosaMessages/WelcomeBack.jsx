import React from 'react'
import RandomElement from '../RandomElement';

function WelcomeBack( {name} ) {

    const messageList = ["! Hello! Delighted to see you again. How are you doing today?", "! Hey there. Looking wonderful today. How are you feeling?", "! Howdy. How've you been? Not much new here with me.",
    "! Greetings to you, my friend. What's the news? Are you having a good day?"];
    const randomMessage = RandomElement(messageList);

  return (
    <div> {name}{randomMessage}</div>
  )
}

export default WelcomeBack