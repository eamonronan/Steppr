import React from 'react'
import RandomElement from '../RandomElement';

function WelcomeBack( {name} ) {

    const messageList = ["! Hello! Delighted to see you again.", "! Hey there. Looking wonderful today.", "! Howdy. How've you been? Not much new here with me."];
    const randomMessage = RandomElement(messageList);

  return (
    <div> {name}{randomMessage}</div>
  )
}

export default WelcomeBack