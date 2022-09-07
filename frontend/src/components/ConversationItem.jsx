import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function ConversationItem() {




   /*  const chartData = [
        {
            name: 'Step count',
            uv: conversation.stepCount,
        },
        {
            name: 'Primary goal rating',
            pv: conversation.PrimaryGoalRating,
        },
        {
            name: 'Secondary goal rating',
            amt: conversation.SecondaryGoalRating,
        }

    ] */

    return (
        <>
            <div>Conversation</div>
            <div>Hello</div>
            {/* <div>
                {new Date(conversation.createdAt).toLocaleString('en-US')}
            </div>
            <h4>Daily feeling: {conversation.feeling}</h4>
            <BarChart width={500} height={300} data={chartData}>
                <CartesianGrid strokeDashArray = "3" />
                <XAxis dataKey="Daily step count" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8884d8"/>
                <Bar datakey="pv" fill="#82ca9d" />
                <Bar dataKey="amt" fill="#ffc658" />
            </BarChart> */}
        </>

    )
}

export default ConversationItem