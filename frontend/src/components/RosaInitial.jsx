import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStepCount, updateUserGoals, getMe } from '../features/auth/authSlice';
import { useEffect } from 'react';


import Delayed from './Delayed';
import WelcomeMessage from './RosaMessages/WelcomeMessage';
import InitialStepsMessage from './RosaMessages/InitialStepsMessage';
import UserResponseButton from './UserResponses/UserResponseButton';
import RandomElement from './RandomElement';



import FantasticRosa from './RosaImages/FantasticRosa';
import GoodRosa from './RosaImages/GoodRosa';
import NotSoGoodRosa from './RosaImages/NotSoGoodRosa';
import TerribleRosa from './RosaImages/TerribleRosa';
import FarewellRosa from './RosaImages/FarewellRosa';
import ExcellentRosa from './RosaImages/ExcellentRosa';
import MotivationalRosa from './RosaImages/MotivationalRosa';

import neutral_Rosa from '../rosaimages/neutral_Rosa.PNG';
import hi_rosa from '../rosaimages/hi_rosa.PNG';
import hi_rosa2 from '../rosaimages/hi_rosa2.PNG';
import hello_sunshine from '../rosaimages/hello_sunshine_rosa.PNG';
import stars_rosa from '../rosaimages/stars_rosa.PNG';
import yesorno_rosa from '../rosaimages/yesorno_rosa.PNG';


function Rosa() {

  const welcomeRosa = [neutral_Rosa, hi_rosa, hi_rosa2, hello_sunshine];

  const randomRosa = RandomElement(welcomeRosa);
  const [rosaImage, setRosaImage] = useState(randomRosa);

  let userSteps = "";
  let userPrimary = "";
  let userSecondary = "";

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [rosaMessage, setRosaMessage] = useState(<WelcomeMessage name={user.name} />);


  useEffect(() => {
    dispatch(getMe());
  }, [])


  const handleUserEmotion = (userEmotion) => {
    if (userEmotion === "fantastic") {
      setRosaMessage(<InitialStepsMessage dailyEmotion={userEmotion} />);
      setRosaImage(RandomElement(FantasticRosa));
    } else if (userEmotion == "excellent") {
      setRosaMessage(<InitialStepsMessage dailyEmotion={userEmotion} />);
      setRosaImage(RandomElement(ExcellentRosa));
    } else if (userEmotion == "good") {
      setRosaMessage(<InitialStepsMessage dailyEmotion={userEmotion} />)
      setRosaImage(RandomElement(GoodRosa));
    } else if (userEmotion == "not so good") {
      setRosaMessage(<InitialStepsMessage dailyEmotion={userEmotion} />)
      setRosaImage(RandomElement(NotSoGoodRosa));
    } else if (userEmotion == "terrible") {
      setRosaMessage(<InitialStepsMessage dailyEmotion={userEmotion} />);
      setRosaImage(RandomElement(TerribleRosa));
    } else {
      setRosaMessage(<InitialStepsMessage />)
      setRosaImage(RandomElement(welcomeRosa));
    }
    setUserOptions(
      <div><UserResponseButton textInput="10,000" onClick={() => handleSteps(10000)} />
        <UserResponseButton textInput="8,000" onClick={() => handleSteps(8000)} />
        <UserResponseButton textInput="6,000" onClick={() => handleSteps(6000)} />
        <UserResponseButton textInput="4,000" onClick={() => handleSteps(4000)} />
        <UserResponseButton textInput="2,000" onClick={() => handleSteps(2000)} /></div>)

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
    setRosaImage(neutral_Rosa);
    setUserOptions(<div><UserResponseButton textInput="View Resources" onClick={() => navigate('/resources')} />
            <UserResponseButton textInput="Message Trainer" onClick={() => console.log('Trainer')} />
            <UserResponseButton textInput="Visit Workout Dashboard" onClick={() => navigate('/usergoalinfo')} />
            <UserResponseButton textInput="Explore Other Users" onClick={() => console.log('Other Users')} /></div>)
  }

  const handleSecondaryGoal = (userSecondaryGoal) => {
    userSecondary = userSecondaryGoal;
    dispatch(updateUserGoals({ ...user, userPrimaryGoal: userPrimary, userSecondaryGoal: userSecondary }));
    dispatch(getMe());
    setRosaImage(yesorno_rosa);
    setRosaMessage(<div>Fantastic! Your secondary user goal is to <i>{userSecondaryGoal}</i>. Together, {user.name}, we can achieve these goals. Would you like to hear more about how Steppr works?</div>);
    setUserOptions(<div><UserResponseButton textInput="Yes" onClick={() => handleYesOrNo(true)} />
      <UserResponseButton textInput="No" onClick={() => handleYesOrNo(false)} /></div>
    )

  }

  const handlePrimaryGoal = (userPrimaryGoal) => {
    userPrimary = userPrimaryGoal;
    setRosaImage(stars_rosa);
    setRosaMessage(<div>Noted! I will remember that your primary goal, after increasing overall step count, is to <i>{userPrimaryGoal}</i>. Next, let's select your second goal from the same list.</div>);
    setUserOptions(<div><UserResponseButton textInput="Improve strength" onClick={() => handleSecondaryGoal("improve strength")} />
      <UserResponseButton textInput="Increase flexibility" onClick={() => handleSecondaryGoal("increase flexibility")} />
      <UserResponseButton textInput="Boost cardio endurance" onClick={() => handleSecondaryGoal("boost cardio endurance")} />
      <UserResponseButton textInput="Optimize overall health" onClick={() => handleSecondaryGoal("optimize overall health")} />
      <UserResponseButton textInput="Lose weight" onClick={() => handleSecondaryGoal("lose weight")} />
      <UserResponseButton textInput="Build a stronger core" onClick={() => handleSecondaryGoal("build a stronger core")} />
    </div>
    )
  }


  const [userOptions, setUserOptions] = useState(<div>
    <UserResponseButton textInput="Fantastic!" onClick={() => handleUserEmotion("fantastic")} />
    <UserResponseButton textInput="Excellent" onClick={() => handleUserEmotion("excellent")} />
    <UserResponseButton textInput="Good." onClick={() => handleUserEmotion("good")} />
    <UserResponseButton textInput="Not so good today." onClick={() => handleUserEmotion("not so good")} />
    <UserResponseButton textInput="Terrible." onClick={() => handleUserEmotion("terrible")} /></div>)


  const handleSteps = (textInput) => {
    userSteps = textInput;
    dispatch(updateStepCount({ ...user, stepGoal: userSteps }));
    setRosaImage(RandomElement(MotivationalRosa));
    setRosaMessage(<div>{textInput} steps! Wow. I love the ambition. Next, we can decide on some secondary goals too. Along with your daily step count, you can set two other goals related to your health and fitness. Then, each day you can rate the progress you've made toward these goals. Select the first one from the choices on the right.</div>);
    setUserOptions(<div><UserResponseButton textInput="Improve strength" onClick={() => handlePrimaryGoal("improve strength")} />
      <UserResponseButton textInput="Increase flexibility" onClick={() => handlePrimaryGoal("increase flexibility")} />
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
        <img src={rosaImage} alt="Rosa expression" />
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