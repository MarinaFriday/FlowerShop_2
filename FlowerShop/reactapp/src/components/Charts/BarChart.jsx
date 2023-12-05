import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);
const BarChart = () => {   
    const data = {
        labels: ['Mon', 'Tue', 'Wed',],
        datasets: [
            {
                label: 'Sales',
                data: [33, 66, 99],
                bacgroundColor: 'green'
            }
        ]
    }
    const options = {

    }

    return (
        <>
           <h1>Статистика</h1><br/>                    
           <Bar data={data} options={options}></Bar>                    
        </>
    );
}
export default BarChart;