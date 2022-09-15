import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function StepChart({ dataArray, dayArray, arrayName }) {



    const chartData = [{
        name: dayArray[0],
        steps: dataArray[0]
    },
    {
        name: dayArray[1],
        steps: dataArray[1]
    },
    {
        name: dayArray[2],
        steps: dataArray[2]
    },
    {
        name: dayArray[3],
        steps: dataArray[3]
    },
    {
        name: dayArray[4],
        steps: dataArray[4]
    }
    ]

    let chartName = arrayName;


    return (
        <>
            <ResponsiveContainer className="responsiveContainer" width="100%" height="100%">
                <div className='chartItem'>
                    <div className="chartHeader">{chartName}</div>
                    <BarChart width={500} height={300} data={chartData}>
                        <CartesianGrid strokeDashArray="3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="steps" fill="#000" />
                    </BarChart>
                </div>
            </ResponsiveContainer>
        </>
    )
}

export default StepChart