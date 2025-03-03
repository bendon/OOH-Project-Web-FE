import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getBillboardTypeReport } from '../data/lib';
import { data } from 'react-router';

export default function BillboardTypesChart() {

    const [chartKey, setChartKey] = useState(0);
    const [billboardTypes, setBillboardTypes] = useState(null)
    const [options, setOptions] = useState({
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
        title: {
            text: "Billboard Types counts"
          },
        plotOptions: {
            bar: {
              borderRadius: 4,
              borderRadiusApplication: 'end',
              horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: [],
        },
    })

    const [series, setSeries] = useState([{ data: [] }]);

    useEffect(() => {
        const fetchBillBoardTypeReport = async () => {
            const res = await getBillboardTypeReport({
              page: null,
              size: null,
              type: null
            })
            if (res.status === 200) {
                setBillboardTypes(res.data)
            }
          }
          fetchBillBoardTypeReport()
    },[])

    useEffect(() =>{
        if(billboardTypes !== null && billboardTypes.data !== null)
        {

            console.log(billboardTypes.data);
            
            const data = billboardTypes.data.map((item) => {
                return {
                    type: item.type,
                    counts: item.typeCount
                }
            })

            const categories = data.map((report) => report.type)
            console.log(categories);
            
            options.xaxis.categories = categories

            // setOptions((prevOptions) => ({
            //     ...prevOptions,
            //     xaxis: {categories : categories}
            // }))

            const values = data.map((report) => report.counts)
            console.log(values);

            series[0].data = values


            setChartKey((prevKey) => prevKey + 1);

        }

    },[billboardTypes])




    return (
        <div className='card card-body  mb-3'>
            <Chart key={chartKey} options={options} series={series} type="bar" height={270}  />
        </div>
    )
}
