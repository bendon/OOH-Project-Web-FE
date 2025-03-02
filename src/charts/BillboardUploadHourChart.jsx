import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getBoardMonthlyReport, getOrganizationUploadsYearlyReport } from '../data/lib';

export default function BillboardUploadHourChart() {

  const [chartKey, setChartKey] = useState(0);
  const [monthReport, setMonthReport] = useState([])
  const [yearReport, setYearReport] = useState(2025)
  const [series, setSeries] = useState([{
    name: "Uploads",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    const fetchMonthlyReport = async () => {
      const res = await getOrganizationUploadsYearlyReport({
        year: +yearReport,
      })


      if (res.status === 200) {
        setMonthReport(res.data)

      }
    }
    fetchMonthlyReport()
  }, [yearReport])


  useEffect(() => {
console.log(monthReport);

    const data = monthReport.map(item => {
      return {
        month: item.month,
        count: item.totalUploads
      }
    })
    if (data.length < 1) {
      setSeries([{
        name: "Uploads",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }])
    }


    data.forEach(item => {

      if (item.month === 1) {
        series[0].data[0] = item.count
      } else if (item.month === 2) {
        series[0].data[1] = item.count
      } else if (item.month === 3) {
        series[0].data[2] = item.count
      } else if (item.month === 4) {
        series[0].data[3] = item.count
      } else if (item.month === 5) {
        series[0].data[4] = item.count
      } else if (item.month === 6) {
        series[0].data[5] = item.count
      } else if (item.month === 7) {
        series[0].data[6] = item.count
      } else if (item.month === 8) {
        series[0].data[7] = item.count
      } else if (item.month === 9) {
        series[0].data[8] = item.count
      } else if (item.month === 10) {
        series[0].data[9] = item.count
      } else if (item.month === 11) {
        series[0].data[10] = item.count
      } else if (item.month === 12) {
        series[0].data[11] = item.count
      }
    })
    setChartKey((prevKey) => prevKey + 1);
  }, [monthReport])





  return (
    <>
      <div className='card card-body mb-3'>
        <div className='d-flex justify-content-between  align-items-center'>
          <h6>Billboard Uploads by year</h6>
          <div className=''>
            <select className='form-control form-select mb-3 ' value={yearReport} onChange={(e) => {
              setYearReport(e.target.value);
            }}>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
              <option value="2034">2034</option>
            </select>
          </div>
        </div>
        <Chart key={chartKey} options={options} series={series} type="line" height={270} />
      </div>
    </>
  )
}
