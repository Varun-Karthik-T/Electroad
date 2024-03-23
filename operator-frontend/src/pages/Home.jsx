import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const textCenter = (portId) => ({
    id: 'textCenter',
    beforeDatasetsDraw(chart, args) {
        const { ctx, data } = chart;
        ctx.save();
        ctx.font = 'bolder 30px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = chart.chartArea.left + chart.chartArea.width / 2;
        const centerY = chart.chartArea.top + chart.chartArea.height / 2;
        ctx.fillText(`${portId}`, centerX, centerY);
    }
});


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

    const handlePortAccess = async (portId) => {
        try {
            const response = await axios.post('http://localhost:5000/update_issue', {
                "station_id": 100,
                "port_id": portId,
                "condition": "working"
            });
            console.log(response);
            setPortData(response.data.port_documents);
            // Handle success or any further actions here
        } catch (error) {
            console.error(error);
        }
    };

    const handlePortEnable = async (portId) => {
        try {
            const response = await axios.post('http://localhost:5000/update_issue', {
                "station_id": 100,
                "port_id": portId,
                "condition": "disable"
            });
            console.log(response);
            setPortData(response.data.port_documents);
            // Handle success or any further actions here
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='bg-[#0f172a] h-[50px] text-[#ffffff] font-poppins flex justify-around items-center flex-wrap'>
                <div></div>
                <div>ELECTRODE 
                <span className="material-symbols-outlined  relative top-[5px] color-[red]">
                    bolt
                </span>
                </div>
                <div></div>
            </div>
            <Button>Click me</Button>
            <div className='flex justify-around items-center gap-10 max-w-full'>
                {portData.map((port, index) => {
                    const filteredLabels = Object.keys(port.issue).filter(label => port.issue[label] > 0);
                    const filteredData = filteredLabels.map(label => port.issue[label]);

                    // Set backgroundColor to yellow if port condition is "disable", else use default colors
                    const backgroundColor = port.condition === "disable" ? 'rgba(255, 206, 86, 0.2)' : [
                        'rgba(255,99,132,0.2)',
                        'rgba(54,162,235,0.2)',
                        'rgba(255,206,86,0.2)',
                        'rgba(75,192,192,0.2)',
                        'rgba(153,102,255,0.2)',
                    ];

                    // Set borderColor to yellow if port condition is "disable", else use default colors
                    const borderColor = port.condition === "disable" ? 'rgba(255, 206, 86, 1)' : [
                        'rgba(255,99,132,1)',
                        'rgba(54,162,235,1)',
                        'rgba(255,206,86,1)',
                        'rgba(75,192,192,1)',
                        'rgba(153,102,255,1)',
                    ];

                    return (
                        <div key={index}>
                            <Doughnut
                                data={{
                                    labels: filteredLabels,
                                    datasets: [{
                                        label: 'Port Data',
                                        data: filteredData,
                                        backgroundColor: backgroundColor,
                                        borderColor: borderColor,
                                        borderWidth: 1
                                    }]
                                }}
                                options={{}}
                                height={250}
                                width={250}
                                plugins={[textCenter(port.port_id.toString())]}
                            />
                            <AlertDialog>
                                <AlertDialogTrigger className=' w-[160px] h-[160px] rounded-full relative left-[40px] bottom-[180px]'></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. Select one.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        {/* <AlertDialogAction onClick={() => handlePortEnable(port.port_id)}>Disable</AlertDialogAction> */}
                                        {port.condition !== "disable" && <AlertDialogAction onClick={() => handlePortEnable(port.port_id)}>Disable</AlertDialogAction>}
                                        <AlertDialogAction onClick={() => handlePortAccess(port.port_id)}>Enable</AlertDialogAction>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Home;
