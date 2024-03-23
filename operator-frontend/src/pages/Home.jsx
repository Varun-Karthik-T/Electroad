import React from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useState } from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw (chart, args, pluginOptions) {
        const {ctx, data} = chart;
        ctx.save();
        ctx.font ='bolder 30px sans-serif ';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = chart.chartArea.left + chart.chartArea.width / 2;
        const centerY = chart.chartArea.top + chart.chartArea.height / 2;
        ctx.fillText('text', centerX, centerY);
    }
}

const Home = () => {
    const [port, setData] = useState({});

    useEffect(() => {
        const postData = async () => {
            try {
                const response = await axios.post('/', {
                    stationid: '1'
                });
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error(error);
                alert('An error occurred while making the request');
            }
        };
        postData();
    }, []);

    const data = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'Poll',
            data: [3, 6],
            backgroundColor: [
                'rgba(255,99,132,0.2)',
                'rgba(54,162,235,0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)'
           ],
        }]
    }
    const options = {}

    return (
        <>
            <div className='bg-[#0f172a] h-[50px] text-[#ffffff] font-poppins flex justify-around  items-center flex-wrap '>
                <div>Home</div>
                <div>Home</div>
                <div>Home</div>
            </div>
            <Button>Click me</Button>
            <div className='flex justify-around  items-center gap-10 max-w-full'>
                <div>
                    <Doughnut
                        data={data}
                        options={options}
                        height={250}
                        width={250}
                        plugins ={[textCenter]}
                    ></Doughnut>
                </div>
                <div>
                <Doughnut
                    data={data}
                    options={options}
                    height={250}
                    width={250}
                    plugins ={[textCenter]} // Add this line
                ></Doughnut>
                </div>
                
            </div>
        </>
    )
}

export default Home