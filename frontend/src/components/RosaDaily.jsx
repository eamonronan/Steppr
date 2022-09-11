import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUserConversation } from '../features/conversations/conversationSlice';
import { getMe } from '../features/auth/authSlice';
import { useEffect } from 'react';


import Delayed from './Delayed';
import WelcomeBack from './RosaMessages/WelcomeBack';
import RandomElement from './RandomElement';
import DailyStepsMessage from './RosaMessages/DailyStepsMessage';
import FeelingTodayMessage from './RosaMessages/FeelingTodayMesage';
import UserResponseButton from './UserResponses/UserResponseButton';
import PositiveAndGoalSet from './RosaMessages/PositiveAndGoalSet';
import HandleUserEmotion from './HandleUserEmotion';

import HandlePrimaryGoal from './HandlePrimaryGoal';

import FantasticRosa from './RosaImages/FantasticRosa';
import GoodRosa from './RosaImages/GoodRosa';
import NotSoGoodRosa from './RosaImages/NotSoGoodRosa';
import TerribleRosa from './RosaImages/TerribleRosa';
import FarewellRosa from './RosaImages/FarewellRosa';
import ExcellentRosa from './RosaImages/ExcellentRosa';

import neutral_Rosa from '../rosaimages/neutral_Rosa.PNG';
import hi_rosa from '../rosaimages/hi_rosa.PNG';
import hi_rosa2 from '../rosaimages/hi_rosa2.PNG';
import hello_sunshine from '../rosaimages/hello_sunshine_rosa.PNG';


function RosaDaily() {

    let userDailyFeeling = "";
    let userPrimaryGoalRating = 0;
    let userSecondaryGoalRating = 0;
    let userStepCountRating = 0;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    let userGoalOne = user.userPrimaryGoal;
    let userStepGoal = user.userStepCount;
    let userGoalTwo = user.userSecondaryGoal;

    const welcomeRosa = [neutral_Rosa, hi_rosa, hi_rosa2, hello_sunshine];

    const randomRosa = RandomElement(welcomeRosa);

    const [rosaImage, setRosaImage] = useState(randomRosa);

    const [rosaMessage, setRosaMessage] = useState(<WelcomeBack name={user.name} />);




    const [userOptions, setUserOptions] = useState(<div><UserResponseButton textInput="Fantastic!" onClick={() => handleUserEmotion("fantastic", userStepGoal)} />
        <UserResponseButton textInput="Excellent." onClick={() => handleUserEmotion("excellent", userStepGoal)} />
        <UserResponseButton textInput="Good." onClick={() => handleUserEmotion("good", userStepGoal)} />
        <UserResponseButton textInput="Not so good today." onClick={() => handleUserEmotion("not so good", userStepGoal)} />
        <UserResponseButton textInput="Terrible." onClick={() => handleUserEmotion("terrible", userStepGoal)} /></div>)

    const [conversationData, setConversationData] = useState();

    const submitConversation = () => {
        dispatch(createUserConversation({ conversationData }));
    }

    useEffect(() => {
        submitConversation({ conversationData });
    }, [conversationData]);

   /*   useEffect(() => {
        dispatch(getMe( {user} ));
    }, []) */






    const handleUserEmotion = (userEmotion, userStepGoal) => {
        userDailyFeeling = userEmotion;
        if (userEmotion === "fantastic") {
            console.log(userStepGoal);
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} stepGoal={userStepGoal} />);
            setRosaImage(RandomElement(FantasticRosa));
        } else if (userEmotion == "excellent") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} stepGoal={userStepGoal} />);
            setRosaImage(RandomElement(ExcellentRosa));
        } else if (userEmotion == "good") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} stepGoal={userStepGoal} />)
            setRosaImage(RandomElement(GoodRosa));
        } else if (userEmotion == "not so good") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} stepGoal={userStepGoal} />)
            setRosaImage(RandomElement(NotSoGoodRosa));
        } else if (userEmotion == "terrible") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} stepGoal={userStepGoal} />);
            setRosaImage(RandomElement(TerribleRosa));
        } else {
            setRosaMessage(<DailyStepsMessage stepGoal={userStepGoal} />)
            setRosaImage(RandomElement(welcomeRosa));
        }
        let steps;
        setUserOptions(
            <section className='form'>
                <form onSubmit={(e) => { handleSteps(e, steps) }}>
                    <div className='form-group'>
                        <label htmlFor='daily step count'>Daily step count</label>
                        <input type='number' name='stepCount' id='stepCount' value={steps}
                            onChange={(e) => { steps = e.target.value }} />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block' type='submit'>
                            Enter steps
                        </button>
                    </div>
                </form>
            </section>
        )
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
        if (userSecondaryGoal === 1) {
            setRosaImage(RandomElement(TerribleRosa));
        } else if (userSecondaryGoal === 2) {
            setRosaImage(RandomElement(NotSoGoodRosa));
        } else if (userSecondaryGoal === 3) {
            setRosaImage(RandomElement(GoodRosa));
        } else if (userSecondaryGoal === 4) {
            setRosaImage(RandomElement(ExcellentRosa));
        } else if (userSecondaryGoal === 5) {
            setRosaImage(RandomElement(FantasticRosa));
        }
        setConversationData({
            user,
            feeling: userDailyFeeling,
            stepCount: userStepCountRating,
            primaryGoalRating: userPrimaryGoalRating,
            secondaryGoalRating: userSecondaryGoal,
        })
        setRosaMessage(<div>Thanks for checking in with me today, {user.name}! I always enjoy our chats. Until tomorrow, feel free to explore some other areas of the Steppr app. Speak to you soon!</div>);
        setRosaImage(RandomElement(FarewellRosa));
        setUserOptions(<div><UserResponseButton textInput="View Resources" onClick={() => navigate('/resources')} />
            <UserResponseButton textInput="Message Trainer" onClick={() => console.log('Trainer')} />
            <UserResponseButton textInput="Visit Workout Dashboard" onClick={() => navigate('/usergoalinfo')} />
            <UserResponseButton textInput="Explore Other Users" onClick={() => console.log('Other Users')} /></div>)
    }

    const handlePrimaryGoal = (userPrimaryGoal) => {
        userPrimaryGoalRating = userPrimaryGoal;
        if (userPrimaryGoal === 1) {
            setRosaMessage("That's okay. We all have bad days sometimes. What's important is to keep on trying! What about your secondary goal, which is to " + userGoalTwo + ". On a scale of 1-5, how did that go today?");
            setRosaImage(RandomElement(TerribleRosa));
        } else if (userPrimaryGoal === 2) {
            setRosaMessage("Even though you maybe didn't do as well as you would have liked, I'm happy to hear that you are making progress. How about your secondary goal, which is to " + userGoalTwo + ". On a scale of 1-5, how did that go today?");
            setRosaImage(RandomElement(NotSoGoodRosa));
        } else if (userPrimaryGoal === 3) {
            setRosaMessage("Okay! Nice job. Little steps each day can add up in no time. Now, let's turn to your secondary goal, which is to " + userGoalTwo + ". On a scale of 1-5, how did that go today?");
            setRosaImage(RandomElement(GoodRosa));
        } else if (userPrimaryGoal === 4) {
            setRosaMessage("Very well done. I could learn a thing or two from you! How is your secondary goal, which is to " + userGoalTwo + ", going? On a scale of 1-5, how did you do on that today?");
            setRosaImage(RandomElement(ExcellentRosa));
        } else if (userPrimaryGoal === 5) {
            setRosaMessage("Amazing job! You inspire me. Truly! Now how about your secondary goal, which is to " + userGoalTwo + "? On a scale of 1-5, how did that go today?");
            setRosaImage(RandomElement(FantasticRosa));
        }
        console.log(userPrimaryGoalRating);

        setUserOptions(<div><UserResponseButton textInput="1" onClick={() => handleSecondaryGoal(1)} />
            <UserResponseButton textInput="2" onClick={() => handleSecondaryGoal(2)} />
            <UserResponseButton textInput="3" onClick={() => handleSecondaryGoal(3)} />
            <UserResponseButton textInput="4" onClick={() => handleSecondaryGoal(4)} />
            <UserResponseButton textInput="5" onClick={() => handleSecondaryGoal(5)} />
        </div>)
    }



    const handleSteps = (e, steps) => {

        e.preventDefault();
        userStepCountRating = Number(steps);
        console.log(userGoalOne);
        setRosaImage(neutral_Rosa);
        setRosaMessage(<div> {steps} steps! Well done. Now let's see how you did on your primary goal, which is to {userGoalOne}. On a scale of 1-5, how much progress did you make toward it today?</div>);
        setUserOptions(<div><UserResponseButton textInput="1" onClick={() => handlePrimaryGoal(1)} />
            <UserResponseButton textInput="2" onClick={() => handlePrimaryGoal(2)} />
            <UserResponseButton textInput="3" onClick={() => handlePrimaryGoal(3)} />
            <UserResponseButton textInput="4" onClick={() => handlePrimaryGoal(4)} />
            <UserResponseButton textInput="5" onClick={() => handlePrimaryGoal(5)} />
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
                <Delayed>
                    {userOptions}
                </Delayed>
            </div>
        </div>
    )
}

export default RosaDaily