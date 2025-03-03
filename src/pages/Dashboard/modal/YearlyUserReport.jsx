import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getISOWeek, getYear, getMonth } from "date-fns";
import { getUserYearlyReport } from '../../../data/lib';
export default function YearlyUserReport({ user }) {
    const [yearlyReport, setYearlyReport] = useState(null)
    const [chartKey, setChartKey] = useState(0);
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'bar',
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            colors: ['#fff']
        },
       
        xaxis: {
            categories: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
        }
    });

    const [series, setSeries] = useState([{
        name: "User Uploads By Month",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }]);
    useEffect(() => {

        const fetchYearlyUserReport = async () => {
            setYearlyReport(null)
            series[0].data = Array(12).fill(0);
            const today = new Date();
            const res = await getUserYearlyReport({
                year : getYear(today),
                userId: user.userId
            })
            if (res.status === 200) {

                setYearlyReport(res.data)
            }
        }
        fetchYearlyUserReport()
    }, [user])

    useEffect(() => {
        if (yearlyReport) {


            const data = yearlyReport.map((report) => {
                return {
                    month: report.uploadMonth,
                    count: report.billboardCount
                }
            })
            
            data.forEach((report) => {
                const monthIndex = report.month - 1;
                series[0].data[monthIndex] = report.count;
            });

            setChartKey((prevKey) => prevKey + 1);
        }
    }, [yearlyReport])


    return (
        <>
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>User uploads by month of the year 2025</h6>
                    <div>

                    </div>
                </div>
                <Chart key={chartKey} options={options} series={series} type="bar" height={270} />
            </div>
        </>
    )
}
