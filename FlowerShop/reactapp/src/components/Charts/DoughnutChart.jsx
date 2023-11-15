import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const DoughnutChart = () => {
    const data = {
        labels: ['Show', 'Hide'],
        datasets: [
            {
                label: 'Shop 1',
                data: [3, 6],
                backgroundColor: ['#61DBFB', 'black'],
                borderColor: ['#61DBFB', 'black']
            }
        ]
    }
    const options = {}

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
}
export default DoughnutChart