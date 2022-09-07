import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { reset } from '../features/auth/authSlice';
import ConversationItem from './ConversationItem';
import { getUserConversations } from '../features/conversations/conversationSlice';
import { getLastFiveConversations } from '../features/conversations/conversationSlice';
import StepChart from './StepChart';



function UserGoalInformation() {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {

        dispatch(getLastFiveConversations());

    }, [])

    const { lastFiveConversations, isError, message } = useSelector((state) => state.conversations);


    return (
        <>
            <h1>Goal Information for {user.name}</h1>
            <h2>Daily step goal: {user.userStepCount}</h2>
            <h2>Primary goal: {user.userPrimaryGoal}</h2>
            <h2>Secondary goal: {user.userSecondaryGoal}</h2>

            <StepChart />

            {/* <section>
               {lastFiveConversations.length > 0 ? (
                    <div>
                        {lastFiveConversations.map((conversation) => (
                            

                            <div key={conversation._id}>{conversation.createdAt}{conversation.feeling} {conversation.stepCount} {conversation.primaryGoalRating} {conversation.secondaryGoalRating} </div>

                        ))}
                    </div>
                ) : (<h3>No conversations with Rosa yet!</h3>)} 
            </section> */}
        </>
    )
}

export default UserGoalInformation