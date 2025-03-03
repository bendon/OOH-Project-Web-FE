import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getOrganizationUploadsYearlyReport } from '../data/lib';

export default function DashboardChart() {

    const [yearlyReport, setYearlyReport] = useState(2025)
    const [reports, setReports] = useState([])
    const [series, setSeries] = useState([{
        name: "Billboards",
        data: Array(12).fill(0),
    },]);
    const [chartKey, setChartKey] = useState(0);

    // array of years from 2025 to 2040
    const years = Array.from({ length: 16 }, (_, i) => 2025 + i);

    const options = {
        chart: {
            type: "bar",
            height: 270,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
    };

    

    useEffect(() => {
        const fetchYearlyReport = async () => {
            const res = await getOrganizationUploadsYearlyReport({
                year: yearlyReport
            })
            if (res.status === 200) {
                setReports(res.data)
            }
        }
        fetchYearlyReport()
    }, [yearlyReport])

    useEffect(() => {

        const data = reports.map((report) => {
            return {
                month: report.month,
                total_uploads: report.totalUploads
            }
        });
        series[0].data = Array(12).fill(0);

        data.forEach((report) => {
            series[0].data[report.month - 1] = report.total_uploads
        });
        setChartKey((prevKey) => prevKey + 1);
    }, [reports])
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h6>Total Monthly uploads</h6>
                <div>
                    <select className='form-select form-control' onChange={(e) => setYearlyReport(e.target.value)}>
                        {
                            years.map((year) => (
                                <option value={year} key={year}>{year}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <Chart key={chartKey} options={options} series={series} type="bar" height={270} />
        </div>
    )
}
