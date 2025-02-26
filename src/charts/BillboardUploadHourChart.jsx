import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getBoardMonthlyReport } from '../data/lib';

export default function BillboardUploadHourChart() {

  const [monthReport, setMonthReport] = useState([])
  const [series,setSeries] = useState([{
    name: "Desktops",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
}])
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
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              title: {
                text: 'Hours'
              }
            }
        
    };


    useEffect(() => {
        const fetchMonthlyReport  = async () => {
          const res = await getBoardMonthlyReport({
            year: null,
            month: null,
          })

          if(res.status === 200){
            setMonthReport(res.data)
          }
        }
        fetchMonthlyReport()
    },[])


    useEffect(()=>{

      const data = monthReport.map(item => {
          return {
            month: item.month,
            count: item.totalUploads
          }
        })

        console.log(data);
        

        data.forEach(item => {

          if(item.month === 1){
            series[0].data[0] = item.count
          }else if(item.month === 2){
            series[0].data[1] = item.count
          }else if(item.month === 3){
            series[0].data[2] = item.count
          }else if(item.month === 4){
            series[0].data[3] = item.count
          }else if(item.month === 5){
            series[0].data[4] = item.count
          }else if(item.month === 6){
            series[0].data[5] = item.count
          }else if(item.month === 7){
            series[0].data[6] = item.count
          }else if(item.month === 8){
            series[0].data[7] = item.count
          }else if(item.month === 9){
            series[0].data[8] = item.count
          }else if(item.month === 10){
            series[0].data[9] = item.count
          }else if(item.month === 11){
            series[0].data[10] = item.count
          }else if(item.month === 12){
            series[0].data[11] = item.count
          }
        })
    },[monthReport])

    
  return (
   <>
               <div className='card card-body mb-3'>
                   <Chart options={options} series={series} type="line" height={270} />
               </div>
           </>
  )
}
