import React from 'react'

function HandlePrimaryGoal({userPrimaryGoal, RosaMessage, setRosaMessage}) {



    switch (userPrimaryGoal) {
        case "1": 
            setRosaMessage("That's okay.");
            break;
        case "2":
            setRosaMessage("Not too shabby.");
            break;
        case "3":
            setRosaMessage("Okay! Nice job.");
            break;
        case "4":
            setRosaMessage("Very well done. I could learn a thing or two from you!");
            break;
        case "5":
            setRosaMessage("Amazing job! You inspire me.");
            break;
    }
  
  
    return (
    <div>{RosaMessage}</div>
  )
}

export default HandlePrimaryGoal