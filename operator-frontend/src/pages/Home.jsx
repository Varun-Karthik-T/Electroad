import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Doughnut } from 'react-chartjs-2';

const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        ctx.font = 'bolder 30px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = chart.chartArea.left + chart.chartArea.width / 2;
        const centerY = chart.chartArea.top + chart.chartArea.height / 2;
        ctx.fillText('text', centerX, centerY);
    }
};

const Home = () => {
    const [portData, setPortData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/documents_id', {
                    "station_id": 100
                });
                console.log(response);
                setPortData(response.data.port_documents);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className='bg-[#0f172a] h-[50px] text-[#ffffff] font-poppins flex justify-around items-center flex-wrap'>
                <div>Home</div>
                <div>Home</div>
                <div>Home</div>
            </div>
            <Button>Click me</Button>
            <div className='flex justify-around items-center gap-10 max-w-full'>
                {portData.map((port, index) => (
                    <div key={index}>
                        <Doughnut
                            data={{
                                labels: Object.keys(port),
                                datasets: [{
                                    label: 'Port Data',
                                    data: Object.values(port),
                                    backgroundColor: [
                                        'rgba(255,99,132,0.2)',
                                        'rgba(54,162,235,0.2)',
                                        'rgba(255,206,86,0.2)',
                                        'rgba(75,192,192,0.2)',
                                        'rgba(153,102,255,0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255,99,132,1)',
                                        'rgba(54,162,235,1)',
                                        'rgba(255,206,86,1)',
                                        'rgba(75,192,192,1)',
                                        'rgba(153,102,255,1)',
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            options={{}}
                            height={250}
                            width={250}
                            plugins={[textCenter]}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
