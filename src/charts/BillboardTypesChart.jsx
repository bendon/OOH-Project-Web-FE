import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

export default function BillboardTypesChart() {

    const [billboardTypes, setBillboardTypes] = useState([])

    useEffect(() => {
        
    })

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
        title: {
            text: "Billboard Types counts"
          },
        plotOptions: {
            bar: {
              borderRadius: 4,
              borderRadiusApplication: 'end',
              horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ["Static Billboard", "Digital Billboard", "Banner Ads", "Wallscapes", "Mobile Billboards","Lamp Posts","Interactive Billboards"],
        },
    };

    const series = [
        {
            data: [400, 430, 448, 470, 540, 580, 690]
          }
    ];
    return (
        <div className='card card-body  mb-3'>
            <Chart options={options} series={series} type="bar" height={270}  />
        </div>
    )
}
