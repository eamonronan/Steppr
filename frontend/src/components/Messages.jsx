import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const navigate = useNavigate();
const dispatch = useDispatch();

const { user } = useSelector((state) => state.auth);
const { messages, isLoading, isError, message } = useSelector((state) => state.messages);

function Messages() {
  return (
    <div>Messages</div>
  )
}

export default Messages