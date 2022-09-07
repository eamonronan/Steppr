import React from 'react'
import { getLastFiveConversations } from '../features/conversations/conversationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../features/auth/authSlice';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



function StepChart() {

    
    const { user } = useSelector((state) => state.auth);
    const { lastFiveConversations } = useSelector((state) => state.conversations);

    let lastFiveStepArray = [];
    let lastFiveDatesArray = [];

    lastFiveStepArray = lastFiveConversations.map((conversation) => (
        ([conversation.stepCount, conversation.createdAt])
    ))

    console.log(lastFiveStepArray);

    /* console.log(lastFiveStepArray[0][0]); */

    const chartData = [{
        name: 'Monday',
        uv: 100
    },
    ]


    return (
        <>
            <div>StepChart</div>
            <BarChart width={500} height={300} data={chartData}>
                <CartesianGrid strokeDashArray = "3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8884d8"/>
            </BarChart> 
            <div>{lastFiveStepArray[0]}</div>

        </>
    )
}

export default StepChart