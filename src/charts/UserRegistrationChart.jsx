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
                { x: '2024-09-01', y: 30 },
                { x: '2024-09-02', y: 32 },
                { x: '2024-09-03', y: 31 },
                { x: '2024-09-04', y: 29 },
                { x: '2024-09-05', y: 28 },
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
