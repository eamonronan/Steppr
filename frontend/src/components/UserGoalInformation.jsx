import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getConversations } from '../features/conversations/conversationSlice';
import { reset } from '../features/auth/authSlice';
import ConversationItem from './ConversationItem';



function UserGoalInformation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { conversations, isLoading, isError, message } = useSelector((state) => state.conversations);

    // redirect to log-in page if user is not logged in
    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getConversations());

        return () => {
            dispatch(reset());
        }

    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <h1>Goal Information for {user.name}</h1>
            <h2>Daily step goal: {user.userStepCount}</h2>
            <h2>Primary goal: {user.userPrimaryGoal}</h2>
            <h2>Secondary goal: {user.userSecondaryGoal}</h2>

            <section className="content">
                {conversations.length > 0 ? (
                    <div className="workouts">
                        {conversations.map((conversation) => (
                            <ConversationItem key={conversation._id} conversation={conversation} />
                        ))}
                    </div>
                    ) : (<h3>You have not logged any conversations with Rosa yet! </h3>)}
            </section>
        </>
                )
}

                export default UserGoalInformation