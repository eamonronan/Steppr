import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { reset } from '../features/conversations/conversationSlice';
import ConversationItem from './ConversationItem';
import { getUserConversations } from '../features/conversations/conversationSlice';
import { getLastFiveConversations } from '../features/conversations/conversationSlice';
import StepChart from './StepChart';



function UserGoalInformation() {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { lastFiveConversations, isLoading, isError, message } = useSelector((state) => state.conversations);
    /* const { stepArray } = useSelector((state) => state.lastFiveConversations.) */
    let lastFiveStepArray = [];
    let lastFiveDayArray = [];
    let lastFivePrimaryGoalArray = [];
    let lastFiveSecondaryGoalArray = [];

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getLastFiveConversations());

        return () => {
            dispatch(reset());
        }

    }, [])

    if (isLoading) {
        return <Spinner />;
    }

    function lastFive(conversations) {
        for (let i=0; i < conversations.length; i++) {
            lastFiveStepArray.push(conversations[i].stepCount);
            lastFiveDayArray.push(conversations[i].createdAt);
            lastFivePrimaryGoalArray.push(conversations[i].primaryGoalRating);
            lastFiveSecondaryGoalArray.push(conversations[i].secondaryGoalRating);
        }
    }

  /*   lastFiveStepArray = {lastFiveConversations.map((conversation) => (
        steps: conversation.stepCount
    )} */

    

    {/* lastFiveConversations.map((conversation) => (
       lastFiveStepArray.push(conversation.stepCount)
    ))} */

    lastFive(lastFiveConversations);


    }


    return (
        <>
            <h1>Goal Information for {user.name}</h1>
            <h2>Daily step goal: {user.userStepCount}</h2>
            <h2>Primary goal: {user.userPrimaryGoal}</h2>
            <h2>Secondary goal: {user.userSecondaryGoal}</h2>

            <StepChart stepArray={lastFiveStepArray} dayArray={lastFiveDayArray}/>
            <StepChart stepArray={lastFivePrimaryGoalArray} dayArray={lastFiveDayArray}/>
            <StepChart stepArray={lastFiveSecondaryGoalArray} dayArray={lastFiveDayArray}/>
        </>
    )
}

export default UserGoalInformation