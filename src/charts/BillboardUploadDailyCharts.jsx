import React, { useEffect, useRef, useState } from 'react'
import Chart from "react-apexcharts";
import { getBoardWeeklyReport } from '../data/lib';
import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import { getISOWeek, getYear, getMonth } from "date-fns";

export default function BillboardUploadDailyChart() {
  const today = new Date();
// setDateFilter([getYear(today),getMonth(today) + 1,getISOWeek(today)])
  const [dateFilter, setDateFilter] = useState([getYear(today),getMonth(today) + 1,getISOWeek(today)]);


  const [chartKey, setChartKey] = useState(0);
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
    // title: {
    //   text: "Billboard Uploads by Day of Week"
    // },
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
  const inputRef = useRef(null);

  useEffect(() => {

  
    

    if (inputRef.current) {
      flatpickr(inputRef.current, {
        enableTime: false,
        dateFormat: "Y-W", // Format: YYYY-WW (Year-Week)
        weekNumbers: true,  // Show week numbers
        altInput: true,
        altFormat: "Y M \\Week W", // Display as "YYYY Week WW"
        defaultDate: new Date(),
        onChange: (selectedDates) => {
          if (selectedDates.length > 0) {
            const selectedDate = selectedDates[0];
            setDateFilter([getYear(selectedDate),getMonth(selectedDate) + 1,getISOWeek(selectedDate)])
           
          }
        }
      });
    }
  }, []);

  useEffect(() =>{
      const fetchWeeklyReport  = async  () => {
        const res =  await getBoardWeeklyReport({
          year: dateFilter[0],
          month: dateFilter[1],
          week: dateFilter[2]
        })
        if(res.status === 200){
          setWeeklyReport(res.data)
        }
      }
      fetchWeeklyReport()
  },[dateFilter])

  useEffect(()=>{

    const data = weeklyReport.map(item => {
      return {
        week : item.weekNumber,
        count : item.totalUploads,
        day : item.dayName
      }
    })

    if(data.length < 1){
      setSeries([{
        name: "Totals",
        type: 'column',
        data: [0, 0, 0, 0, 0, 0, 0]
      }])
      setChartKey((prevKey) => prevKey + 1);
      return
    }

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
    
    setChartKey((prevKey) => prevKey + 1);
  },[weeklyReport])

  
  return (
    <>
      <div className='card card-body mb-3'>
        <div className='d-flex justify-content-between  align-items-center'>
          <h6>Billboard Uploads by Year & Week</h6>
          <div>
            <input type="text" className='week-picker' placeholder='Enter Year' ref={inputRef} style={{ display: "none" }}/>
          </div>
        </div>
        <Chart key={chartKey} options={options} series={series} type="line" height={270} />
      </div>
    </>
  )
}
