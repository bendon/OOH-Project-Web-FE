import React from 'react'
import Chart from "react-apexcharts";

export default function BillboardUploadDailyChart() {
    const options = {
        chart: {
            type: "line",
            height: 270,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            },
        },
          title: {
            text: "Billboard Uploads by Day of Week"
          },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [0, 4]
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              title: {
                text: 'Hours'
              }
            }
        
    };

    const series = [{
        name: "Totals",
        type: 'column',
        data: [10, 41, 35, 51, 49, 62, 69]
    },
    {
      name: "Average",
      type: 'line',
      data: [10, 41, 35, 51, 49, 62, 69]
  }];
  return (
   <>
               <div className='card card-body mb-3'>
                   <Chart options={options} series={series} type="line" height={270} />
               </div>
           </>
  )
}
