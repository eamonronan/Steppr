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
import GoalChart from './GoalChart';
import { getMe } from '../features/auth/authSlice';



function UserGoalInformation() {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { lastFiveConversations, isLoading, isError, message } = useSelector((state) => state.conversations);
    /* const { stepArray } = useSelector((state) => state.lastFiveConversations.) */
    let lastFiveStepArray = [];
    let lastFiveDayArray = [];
    let lastFivePrimaryGoalArray = [];
    let lastFiveSecondaryGoalArray = [];
    let convertedDates = [];

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }
        dispatch(getMe());
        dispatch(getLastFiveConversations());

        return () => {
            dispatch(reset());
        }

    }, [])

    if (isLoading) {
        return <Spinner />;
    }

    function lastFive(conversations) {
        for (let i = 0; i < conversations.length; i++) {
            lastFiveStepArray.push(conversations[i].stepCount);
            lastFiveDayArray.push(conversations[i].createdAt);
            lastFivePrimaryGoalArray.push(conversations[i].primaryGoalRating);
            lastFiveSecondaryGoalArray.push(conversations[i].secondaryGoalRating);
        }
    }

    function convertDates(lastFiveDayArray) {
        for (let i = 0; i < lastFiveDayArray.length; i++) {
            convertedDates.push(lastFiveDayArray[i].split('T')[0]);
        }
    }

    lastFive(lastFiveConversations);
    convertDates(lastFiveDayArray);


    return (
        <>
            <div className="goalHeader">
            <h1>Goal Information for {user.name}</h1>
            <h2>Daily step goal: {user.userStepCount}</h2>
            <h2>Primary goal: {user.userPrimaryGoal}</h2>
            <h2>Secondary goal: {user.userSecondaryGoal}</h2>
            </div>
            <div className="charts">
            <StepChart dataArray={lastFiveStepArray} dayArray={convertedDates} arrayName='STEPS' />
            <GoalChart dataArray={lastFivePrimaryGoalArray} dayArray={convertedDates} arrayName={user.userPrimaryGoal} />
            <GoalChart dataArray={lastFiveSecondaryGoalArray} dayArray={convertedDates} arrayName={user.userSecondaryGoal} />
            </div>
        </>
    )
}


export default UserGoalInformation