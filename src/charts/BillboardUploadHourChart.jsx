import React from 'react'
import Chart from "react-apexcharts";

export default function BillboardUploadHourChart() {
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
            text: "Billboard Uploads by Hour"
          },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm'],
              title: {
                text: 'Hours'
              }
            }
        
    };

    const series = [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }];
  return (
   <>
               <div className='card card-body mb-3'>
                   <Chart options={options} series={series} type="line" height={270} />
               </div>
           </>
  )
}
