import React from 'react'
import Chart from "react-apexcharts";

export default function UserGenderChart({data}) {
    const options = {
        chart: {
            type: 'donut',
            height: 270,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            },
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
        },
        labels: ['Male', 'Female', 'Others'],
        legend: {
            formatter: function (val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex]
            }
        },
        title: {
            text: 'Team Gender',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    const series = data;
  return (
    <>
    <div>
        <Chart options={options} series={series} type="donut" height={270}  />
    </div>
    </>
  )
}
