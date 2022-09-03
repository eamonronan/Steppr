import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUserConversation } from '../features/conversations/conversationSlice';

import Delayed from './Delayed';
import WelcomeBack from './RosaMessages/WelcomeBack';
import RandomElement from './RandomElement';
import DailyStepsMessage from './RosaMessages/DailyStepsMessage';
import FeelingTodayMessage from './RosaMessages/FeelingTodayMesage';
import UserResponseButton from './UserResponses/UserResponseButton';
import PositiveAndGoalSet from './RosaMessages/PositiveAndGoalSet';
import HandleUserEmotion from './HandleUserEmotion';

import FantasticRosa from './RosaImages/FantasticRosa';
import GoodRosa from './RosaImages/GoodRosa';
import NotSoGoodRosa from './RosaImages/NotSoGoodRosa';
import TerribleRosa from './RosaImages/TerribleRosa';

import neutral_Rosa from '../rosaimages/neutral_Rosa.PNG';
import hi_rosa from '../rosaimages/hi_rosa.PNG';
import hi_rosa2 from '../rosaimages/hi_rosa2.PNG';
import hello_sunshine from '../rosaimages/hello_sunshine_rosa.PNG';


function RosaDaily() {

    let userFeeling = "";
    let primaryGoalRating = 0;
    let secondaryGoalRating = 0;


    const dispatch = useDispatch();

    const welcomeRosa = [neutral_Rosa, hi_rosa, hi_rosa2, hello_sunshine];

    const randomRosa = RandomElement(welcomeRosa);

    const [rosaImage, setRosaImage] = useState(randomRosa);

    const { user } = useSelector((state) => state.auth);

    const [stepCount, setStepCount] = useState();

    const [rosaMessage, setRosaMessage] = useState(<WelcomeBack name={user.name} />);

    const [conversationData, setConversationData] = useState({
        user,
        feeling: 'amazing',
        stepCount: 1,
        primaryGoalRating: 0,
        secondaryGoalRating: 0
    });

    const submitConversation = () => {

        dispatch(createUserConversation({ conversationData }));
        console.log(conversationData);
    }



    const handleUserEmotion = (userEmotion) => {
        if (userEmotion === "fantastic") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} />);
            setRosaImage(RandomElement(FantasticRosa));
        } else if (userEmotion == "good") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} />)
            setRosaImage(RandomElement(GoodRosa));
        } else if (userEmotion == "not so good") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} />)
            setRosaImage(RandomElement(NotSoGoodRosa));
        } else if (userEmotion == "terrible") {
            setRosaMessage(<DailyStepsMessage dailyEmotion={userEmotion} />);
            setRosaImage(RandomElement(TerribleRosa));
        } else {
            setRosaMessage(<DailyStepsMessage />)
            setRosaImage(RandomElement(welcomeRosa));
        }
        let steps;
        setUserOptions(
            <section className='form'>
                <form onSubmit={(e) => { handleSteps(e, steps) }}>
                    <div className='form-group'>
                        <label htmlFor='daily step count'>Daily step count</label>
                        <input type='number' name='stepCount' id='stepCount' value={steps}
                            onChange={(e) => {steps = e.target.value}} />
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
        submitConversation();
        setRosaMessage(<div>Fantastic! Your secondary user goal is to <b>{userSecondaryGoal}</b>. Together, {user.name}, we can achieve these goals. Would you like to hear more about how Steppr works?</div>);
        setUserOptions(<div><UserResponseButton textInput="Yes" onClick={() => handleYesOrNo(true)} />
            <UserResponseButton textInput="No" onClick={() => handleYesOrNo(false)} /></div>)
    }

    const handlePrimaryGoal = (userPrimaryGoal) => {
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
    }


    const [userOptions, setUserOptions] = useState(<div><UserResponseButton textInput="Fantastic!" onClick={() => handleUserEmotion("fantastic")} />
        <UserResponseButton textInput="Good." onClick={() => handleUserEmotion("good")} />
        <UserResponseButton textInput="Not so good today." onClick={() => handleUserEmotion("not so good")} />
        <UserResponseButton textInput="Terrible." onClick={() => handleUserEmotion("terrible")} /></div>)



    const handleSteps = (e, steps) => {
        e.preventDefault();
        setStepCount(steps);
        setRosaMessage(<div> {steps} steps! Well done. Now let's see how you did on your primary user goal. On a scale of 1-5, how much progress did you make toward it today?</div>);
        setUserOptions(<div><UserResponseButton textInput="1" onClick={() => handlePrimaryGoal("1")} />
            <UserResponseButton textInput="2" onClick={() => handlePrimaryGoal("2")} />
            <UserResponseButton textInput="3" onClick={() => handlePrimaryGoal("3")} />
            <UserResponseButton textInput="4" onClick={() => handlePrimaryGoal("4")} />
            <UserResponseButton textInput="5" onClick={() => handlePrimaryGoal("5")} />
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