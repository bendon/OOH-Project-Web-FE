import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getBoardLocationsUploads } from '../data/lib';
export default function LocationRadarChart() {
    const [locationReport, setLocationReport] = useState(null)
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
        labels: [],
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
        xaxis: {
            categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
        }
    });

    const [series, setSeries] = useState([14, 23, 21, 17, 15, 10, 12, 17, 21]);
    useEffect(() => {

        const fetchBillBoardLocationReport = async () => {
            const res = await getBoardLocationsUploads({})
            if (res.status === 200) {

                setLocationReport(res.data)
            }
        }
        fetchBillBoardLocationReport()
    }, [])

    useEffect(() => {
        if (locationReport) {


            const data = locationReport.data.map((report) => {
                return {
                    location: report.location,
                    data: report.countPerLocation
                }
            })

            // set options categories
            const labels = data.map((report) => report.location)
           

            setOptions((prevOptions) => ({
                ...prevOptions,
                labels: labels
            }))

            // set series
            const seriesData = data.map((report) => report.data)
            setSeries(seriesData)

            setChartKey((prevKey) => prevKey + 1);
        }
    }, [locationReport])


    return (
        <>
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>Location Analysis</h6>
                    <div>

                    </div>
                </div>
                <Chart key={chartKey} options={options} series={series} type="polarArea" height={270} />
            </div>
        </>
    )
}
