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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = chart.chartArea.left + chart.chartArea.width / 2;
        const centerY = chart.chartArea.top + chart.chartArea.height / 2;
        ctx.fillText(`${portId}`, centerX, centerY);
    }
});

const MemoizedDoughnutChart = React.memo(({ port }) => {
    const filteredLabels = Object.keys(port.issue).filter(label => port.issue[label] > 0);
    const filteredData = filteredLabels.map(label => port.issue[label]);

    // Set backgroundColor to yellow if port condition is "disable", else use default colors
    const backgroundColor = port.condition === "disable" ? 'rgba(255, 206, 86, 0.2)' : [
        'rgba(75,192,192,0.2)',
        'rgba(255,99,132,0.2)',
        
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(153,102,255,0.2)',
    ];

    // Set borderColor to yellow if port condition is "disable", else use default colors
    const borderColor = port.condition === "disable" ? 'rgba(255, 206, 86, 1)' : [
        'rgba(75,192,192,1)',
        'rgba(255,99,132,1)',
        
        'rgba(54,162,235,1)',
        'rgba(255,206,86,1)',
        'rgba(153,102,255,1)',
    ];

    // Custom function to set label colors
    const setLabelColor = (context) => {
        return context.dataIndex === filteredLabels.findIndex(label => label === "no issues") ? 'green' : 'white';
    };

    return (
        <Doughnut
            data={{
                labels: filteredLabels,
                datasets: [{
                    label: 'Port Data',
                    data: filteredData,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 2
                }]
            }}
            options={{
                plugins: {
                    text: {
                        color: setLabelColor // Change color based on label
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: 'white',
                            font: {
                                size: 15
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.formattedValue; // Customize tooltip label if needed
                            }
                        }
                    }
                }
            }}
            height={250}
            width={250}
            plugins={[textCenter(port.port_id.toString())]}
        />
    );
}, (prevProps, nextProps) => {
    // Memoization function to determine if the component should re-render
    // Only re-render if portData or its properties change
    return prevProps.port === nextProps.port;
});


const Home = () => {
    const [portData, setPortData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/ports_id', {
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
            //
            const fetchData = async () => {
                try {
                    const response = await axios.post('http://localhost:5000/ports_id', {
                        "station_id": 100
                    });
                    console.log(response);
                    setPortData(response.data.port_documents);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();



            // Handle success or any further actions here
        } catch (error) {
            console.error("Error enabling port:", error);
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
            //
            //
            const fetchData = async () => {
                try {
                    const response = await axios.post('http://localhost:5000/ports_id', {
                        "station_id": 100
                    });
                    console.log(response);
                    setPortData(response.data.port_documents);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
            // Handle success or any further actions here
        } catch (error) {
            console.error("Error disabling port:", error);
        }
    };

    return (
        <>
            <div className='bg-[#000] h-[70px] text-[#ffffff] text-[1.5rem] font-poppins flex justify-around items-center flex-wrap'>
                <div></div>
                <div>ELECTRODE 
                <span className="material-symbols-outlined  relative top-[5px] color-[red]">
                    bolt
                </span>
                </div>
                <div>
                <span class="material-symbols-outlined relative left-[150px]">
                    settings
                </span>
                </div>
            </div>
            

            <div className='flex w-[100vw] h-[100%]' >

            
                <div className=' flex-col justify-center content-center bg-[#000] w-[300px] h-[600px]'>
                    <div className='pl-[100px] drop-shadow-[0_37px_37px_rgba(40, 67, 135,0.25)]'>
                        <Avatar style={{ height: "80px", width: "80px" }}>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback >CN</AvatarFallback>
                        </Avatar>
                    </div>
                    
                        <p className='text-[#ffffff] font-poppins text-center text-[18px]'>Welcome back</p>
                        <p className='text-[#9ad9f8] font-poppins text-center text-[30px]'>Mr.Cooper</p>
                        <p className='text-[#ffffff] font-poppins text-center filter drop-shadow(0 37px 37px rgba(40, 67, 135, 0.25)) p-[10px]' >
                        Look's Like we have some <span className='text-sky-400'>Work</span> to do...
                        </p>
                </div>
                
                <div className='bg-gradient-to-tr from-blue-900 via-black via-50% to-blue-800 w-[1200px] h-[auto] p-[100px]'>
                    <div className='flex justify-around items-center flex-wrap '>
                        {portData && portData.map((port, index) => (
                            <div key={index}>
                                <MemoizedDoughnutChart port={port} />
                                <AlertDialog>
                                    <AlertDialogTrigger className=' w-[160px] h-[160px] rounded-full relative left-[40px] bottom-[280px] '></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. Select one.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            {port.condition !== "disable" && <AlertDialogAction onClick={() => handlePortEnable(port.port_id)}>Disable</AlertDialogAction>}
                                            <AlertDialogAction onClick={() => handlePortAccess(port.port_id)}>Enable</AlertDialogAction>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
