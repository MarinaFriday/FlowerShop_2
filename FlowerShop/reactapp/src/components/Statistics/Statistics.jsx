import React from 'react';
import Chart from 'chart.js';

const Statistics = () => {
    // Graph
    var ctx = document.getElementById("myChart");

    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            datasets: [
                {
                    data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: "#007bff",
                    borderWidth: 4,
                    pointBackgroundColor: "#007bff",
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });

    return (
        <>  
            <div >
            <div className="card-body">
                <canvas className="my-4 w-100" id="myChart" height="380"></canvas>
                </div>            
            </div>
        </>
    );
}
export default Statistics
