import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStepCount, updateUserGoals } from '../features/auth/authSlice';

import Delayed from './Delayed';
import WelcomeMessage from './RosaMessages/WelcomeMessage';
import FeelingTodayMessage from './RosaMessages/FeelingTodayMesage';
import UserResponseButton from './UserResponses/UserResponseButton';
import PositiveAndGoalSet from './RosaMessages/PositiveAndGoalSet';

import neutral_Rosa from '../rosaimages/neutral_Rosa.PNG';
import hi_rosa from '../rosaimages/hi_rosa.PNG';
import hi_rosa2 from '../rosaimages/hi_rosa2.PNG';
import hello_sunshine from '../rosaimages/hello_sunshine_rosa.PNG';


function Rosa() {

  const [rosaImage, setRosaImage] = useState([]);

  let userSteps = "";
  let userPrimary = "";
  let userSecondary = "";

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
 

  const [rosaMessage, setRosaMessage] = useState(<WelcomeMessage name={user.name} />);

  const handleClick = () => {
    console.log('Good clicked');
    setRosaMessage(<PositiveAndGoalSet />);
    setUserOptions(
      <div><UserResponseButton textInput="10,000" onClick={() => handleSteps(10000)} />
        <UserResponseButton textInput="8,000" onClick={() => handleSteps(8000)} />
        <UserResponseButton textInput="6,000" onClick={() => handleSteps(6000)} />
        <UserResponseButton textInput="4,000" onClick={() => handleSteps(4000)} /></div>)

  }

  const handleYesOrNo = (userYesOrNo) => {
    if (userYesOrNo) {
      setRosaMessage(<div>Great! Steppr aims to help you achieve your health and fitness goals. Each day, log in to the web app, and we can have a conversation together where we log your daily step count. 
        Additionally, you can rate your progress toward your primary and secondary user goals. I can also connect you to helpful resources on exercise and direct you toward
        your messages with your trainer. Elsewhere, you can log daily reflections on your workouts and your overall mood.  
      </div>);
    } else {
      setRosaMessage(<div>No problem. Feel free to explore the rest of the app. Try clicking on the icons in the navigation bar to see more.</div>);
    }
  
  }

  const handleSecondaryGoal = (userSecondaryGoal) => {
    userSecondary = userSecondaryGoal;
    dispatch(updateUserGoals( {...user, userPrimaryGoal: userPrimary, userSecondaryGoal: userSecondary} ));
    console.log('Handle secondary goal clicked');
    setRosaMessage(<div>Fantastic! Your secondary user goal is to <b>{userSecondaryGoal}</b>. Together, {user.name}, we can achieve these goals. Would you like to hear more about how Steppr works?</div>);
    setUserOptions(<div><UserResponseButton textInput="Yes" onClick={()=>handleYesOrNo(true)} />
    <UserResponseButton textInput="No" onClick={()=> handleYesOrNo(false) } /></div>)
  }

  const handlePrimaryGoal = (userPrimaryGoal) => {
    userPrimary = userPrimaryGoal;
    setRosaMessage(<div>Noted! I will remember that your primary goal, after increasing overall step count, is to <b>{userPrimaryGoal}</b>. Next, let's select your second goal from the same list.</div>);
    setUserOptions(<div><UserResponseButton textInput="Improve strength" onClick={() => handleSecondaryGoal("improve strength")} />
      <UserResponseButton textInput="Increase flexibility" onClick={() => handleSecondaryGoal("increase flexibility")} />
      <UserResponseButton textInput="Boost cardio endurance" onClick={() => handleSecondaryGoal("boost cardio endurance")}/>
      <UserResponseButton textInput="Optimize overall health" onClick={() => handleSecondaryGoal("optimize overall health")} />
      <UserResponseButton textInput="Lose weight" onClick={() => handleSecondaryGoal("lose weight")} />
      <UserResponseButton textInput="Build a stronger core" onClick={() => handleSecondaryGoal("build a stronger core")} />
    </div>
    )
  }


  const [userOptions, setUserOptions] = useState(<div><UserResponseButton textInput="Good!" onClick={handleClick} />
    <UserResponseButton textInput="Not so good today." onClick={() => alert("Hello!")} />
    <UserResponseButton textInput="Terrible." onClick={() => alert("Hello!")} /></div>)

  const welcomeRosa = [neutral_Rosa, hi_rosa, hi_rosa2, hello_sunshine];

  const randomRosa = welcomeRosa[Math.floor(Math.random() * welcomeRosa.length)];


  const handleSteps = (textInput) => {
    console.log('Steps clicked');
    console.log(textInput);
    userSteps = textInput;
    console.log(userSteps);
    dispatch(updateStepCount( {...user, stepGoal: userSteps} ));
    setRosaMessage(<div>{textInput} steps! Wow. I love the ambition. Next, we can decide on some secondary goals too. Along with your daily step count, you can set two other goals related to your health and fitness. Then, each day you can rate the progress you've made toward these goals. Select the first one from the choices on the right.</div>);
    setUserOptions(<div><UserResponseButton textInput="Improve strength" onClick={() => handlePrimaryGoal("improve strength")} />
      <UserResponseButton textInput="Increase flexibility" onClick= {() => handlePrimaryGoal("increase flexibility")} />
      <UserResponseButton textInput="Boost cardio endurance" onClick={() => handlePrimaryGoal("boost cardio endurance")} />
      <UserResponseButton textInput="Optimize overall health" onClick={() => handlePrimaryGoal("optimize overall health")} />
      <UserResponseButton textInput="Lose weight" onClick={() => handlePrimaryGoal("lose weight")} />
      <UserResponseButton textInput="Build a stronger core" onClick={() => handlePrimaryGoal("build a stronger core")} />
    </div>
    )
  }




  return (
    <div className='rosaContainer'>
      <div className='rosaItem'>
        <img src={randomRosa} alt="Rosa expression" />
        <div className='rosaMessage'>
        {rosaMessage}
        </div>
        

      </div>
      <div className='rosaItem'>
        <div className='rosaText'>
          <Delayed>
            {userOptions}
          </Delayed>

        </div>
      </div>
    </div>
  )
}

export default Rosa