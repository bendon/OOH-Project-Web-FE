import React from 'react'
import Chart from "react-apexcharts";

export default function UserRegistrationChart() {

    const options = {
        chart: {
            type: 'area',
            height: 270,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false
        },
        title : {
            text: 'User Registration 2025',
        },
        stroke: { curve: 'smooth' },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd MMM',
            },
        },
        tooltip: {
            x: { format: 'dd MMM yyyy' },
        },
    }

    const series = [
        {
            name: "User Registration",
            data: [
                { x: '2025-02-12', y: 1 },
                { x: '2025-02-19', y: 2 },
                { x: '2025-02-20', y: 1 },
                { x: '2025-02-26', y: 2 },
                { x: '2025-03-02', y: 5 },
            ],
        }
    ];
    return (
        <>
            <div>
                <Chart options={options} series={series} type="area" height={270} />
            </div>
        </>
    )
}
