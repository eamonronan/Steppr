import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



function StepChart( {dataArray, dayArray, arrayName} ) {

    

    const chartData = [{
        name: dayArray[0],
        goal: dataArray[0]
    },
    {
        name: dayArray[1],
        goal: dataArray[1]
    }, 
    {
        name: dayArray[2],
        goal: dataArray[2]
    },
    {
        name: dayArray[3],
        goal: dataArray[3]
    },
    {
        name: dayArray[4],
        goal: dataArray[4]
    }
    ]

    let chartName = arrayName.toUpperCase();


    return (
        <>
            <div className="chartHeader">{chartName}</div>
            <BarChart className='chart' width={500} height={300} data={chartData}>
                <CartesianGrid strokeDashArray = "3" />
                <XAxis dataKey="name" />
                <YAxis ticks={[0, 1, 2, 3, 4, 5]} domain={[0,5]}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="goal" fill="#000"/>
            </BarChart> 
        </>
    )
}

export default StepChart