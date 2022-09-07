import React from 'react'
import { getLastFiveConversations } from '../features/conversations/conversationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../features/auth/authSlice';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



function StepChart( {stepArray, dayArray} ) {

    

    const chartData = [{
        name: dayArray[0],
        uv: stepArray[0]
    },
    {
        name: dayArray[1],
        uv: stepArray[1]
    }, 
    {
        name: dayArray[2],
        uv: stepArray[2]
    },
    {
        name: dayArray[3],
        uv: stepArray[3]
    },
    {
        name: dayArray[4],
        uv: stepArray[4]
    }
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
        </>
    )
}

export default StepChart