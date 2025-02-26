import React, { useEffect, useRef, useState } from 'react'
import Chart from "react-apexcharts";
import { getBoardWeeklyReport } from '../data/lib';

export default function BillboardUploadDailyChart() {
  const [weeklyReport, setWeeklyReport] = useState([])
  const [series,setSeries] = useState([{
    name: "Totals",
    type: 'column',
    data: [0, 0, 0, 0, 0, 0, 0]
  }]);
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

  useEffect(() =>{
      const fetchWeeklyReport  = async  () => {
        const res =  await getBoardWeeklyReport({
          year: null,
          month: null,
          week: null
        })

        if(res.status === 200){
          setWeeklyReport(res.data)
        }
      }
      fetchWeeklyReport()
  },[])

  useEffect(()=>{

    const data = weeklyReport.map(item => {
      return {
        week : item.weekNumber,
        count : item.totalUploads,
        day : item.dayName
      }
    })

    data.forEach(item => {
      if(item.day === 'Sunday'){
        series[0].data[0] = item.count
      }
      if(item.day === 'Monday'){
        series[0].data[1] = item.count
      }
      if(item.day === 'Tuesday'){
        series[0].data[2] = item.count
      }
      if(item.day === 'Wednesday'){
        series[0].data[3] = item.count
      }
      if(item.day === 'Thursday'){
        series[0].data[4] = item.count
      }
      if(item.day === 'Friday'){
        series[0].data[5] = item.count
      }
      if(item.day === 'Saturday'){
        series[0].data[6] = item.count
      }
    })
    

  },[weeklyReport])

  
  return (
    <>
      <div className='card card-body mb-3'>
        <Chart options={options} series={series} type="line" height={270} />
      </div>
    </>
  )
}
