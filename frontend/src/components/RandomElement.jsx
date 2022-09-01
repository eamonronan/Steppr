import React from 'react'

function RandomElement(list) {
  return (
   list[Math.floor(Math.random() * list.length)]
  )
}

export default RandomElement