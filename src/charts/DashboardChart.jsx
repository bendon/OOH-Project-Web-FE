import React from 'react'
import Chart from "react-apexcharts";

export default function DashboardChart() {

    const options = {
        chart: {
            type: "bar",
            height: 270,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        },
    };

    const series = [
        {
            name: "Billboards",
            data: [30, 40, 35, 50, 49, 60],
        },
        {
            name: "Unique Locations",
            data: [10, 20, 15, 5, 10, 13],
        },
    ];
    return (
        <div>
            <h2>Bill board uploads</h2>
            <Chart options={options} series={series} type="bar" height={270}  />
        </div>
    )
}
