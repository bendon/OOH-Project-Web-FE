import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getUserWeeklyReport } from '../../../data/lib';
import { getISOWeek, getYear, getMonth, subMonths } from "date-fns";
export default function RadarWeeklyUserReport({ user }) {
    const today = new Date();
    const [dateFilter, setDateFilter] = useState([getYear(today), getMonth(today) + 1, getISOWeek(today)]);

    const [weeklyUserReport, setWeeklyUserReport] = useState(null)
    const [chartKey, setChartKey] = useState(0);
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'polarArea',
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            colors: ['#fff']
        },
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
        }],
    });

    const [series, setSeries] = useState([1, 1,1, 1, 1, 1, 1]);
    useEffect(() => {

        const fetchWeeklyUserReport = async () => {
            console.log(user);
            
            if (user && user.userId) {
                const res = await getUserWeeklyReport({
                    year: dateFilter[0],
                    month: dateFilter[1],
                    week: dateFilter[2],
                    userId: user.userId
                })
                if (res.status === 200) {

                    setWeeklyUserReport(res.data)
                }
            }
        }
        fetchWeeklyUserReport()
    }, [user])

    useEffect(() => {
        if (weeklyUserReport) {


            const data = weeklyUserReport.map((report) => {
                return {
                    dayOfWeek: report.dayOfWeek,
                    count: report.billboardCount
                }
            })

            data.forEach((report) => {
                if (report.dayOfWeek === "Monday") {
                    report.dayOfWeek = 'Monday'
                    series[0] = report.count
                } else if (report.dayOfWeek === "Tuesday") {
                    report.dayOfWeek = 'Tuesday'
                    series[1] = report.count
                } else if (report.dayOfWeek === "Wednesday") {
                    report.dayOfWeek = 'Wednesday'
                    series[2] = report.count
                } else if (report.dayOfWeek === "Thursday") {
                    report.dayOfWeek = 'Thursday'
                    series[3] = report.count
                } else if (report.dayOfWeek === "Friday") {
                    report.dayOfWeek = 'Friday'
                    series[4] = report.count
                } else if (report.dayOfWeek === "Saturday") {
                    report.dayOfWeek = 'Saturday'
                    series[5] = report.count
                } else if (report.dayOfWeek === "Sunday") {
                    report.dayOfWeek = 'Sunday'
                    series[6] = report.count
                }
            });


            setChartKey((prevKey) => prevKey + 1);
        }
    }, [weeklyUserReport])


    return (
        <>
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>Weekly Uploads Analysis</h6>
                    <div>

                    </div>
                </div>
                <Chart key={chartKey} options={options} series={series} type="polarArea" height={270} />
            </div>
        </>
    )
}

