import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function ConversationItem( {conversation} ) {
    const stepCounts = [];
    stepCounts.push(conversation.stepCount);

    return (
        <>
            <h1>Conversation</h1>
            <div>{conversation.stepCount}</div>
            <div>{conversation.primaryGoalRating}</div>
            <div>{conversation.secondaryGoalRating}</div>
        </>

    )
}

export default ConversationItem