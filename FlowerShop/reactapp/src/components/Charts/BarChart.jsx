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

//    var myChart = new Chart(ctx, {
//        type: 'bar',
//        data: {
//            labels: ["Red", "Blue", "Black", "Green"],
//            datasets: [{
//                label: '#',
//                data: [12, 14, 15, 12],
//                backgroundColor: ['green', 'black', 'blue', 'red'],
//                borderColor: ['red', 'bkue', 'black', 'green'],
//                borderWidth: 2
//            }]
//        },
//        options: {
//            scales: {
//                yAxes: [{
//                    ticks: {
//                        beginAtZero: true
//                    }
//                }]
//            }
//        }
//    });
  

  
    return (
        <>
           <h1>Статистика</h1><br/>                    
           <Bar data={data} options={options}></Bar>                    
        </>
    );
}
export default BarChart;