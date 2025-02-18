'use client'
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react'

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardChart() {

    const options: ApexOptions = {
        chart: {
          type: "bar",
          height: 270,
          toolbar : {
            show: false
          },
          zoom: {
            enabled: false,
          },
        },
        
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
      ]

  return (
     <div>
      <h5>Bill board uploads</h5>
      <Chart options={options} series={series} type="bar" height={270} />
    </div>
  )
}
