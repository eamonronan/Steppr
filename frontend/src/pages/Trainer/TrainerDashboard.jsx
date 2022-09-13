import React from 'react';
import MessageForm from '../../components/MessageForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageItem from '../../components/MessageItem';
import { getUserMessages } from '../../features/messages/messageSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {reset} from '../../features/messages/messageSlice';
import Spinner from '../../components/Spinner';

function TrainerDashboard() {

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { messages, isLoading, isError, message } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redirect to log-in page if user is not logged in
  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/logintrainer');
    }

    dispatch(getUserMessages());

    return () => {
      dispatch(reset());
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <div>TrainerDashboard</div>
    <div>Hello, {user.name}</div>
    <MessageForm />
    <section className="content">
      {messages.length > 0 ? (
        <div>
          {messages.map((message) => (
            <MessageItem key={message._id} id={message._id} message={message} />
          ))}

        </div>
      ) : (<h3>You do not have any messages just yet! </h3>)}

    </section>
    </>
  )
}

export default TrainerDashboard