import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Panel, Divider } from "rsuite";


export default function GroupCard({ item, isOwner, setRemoveLoad }) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [interval, setTimerInterval] = useState();
    const navigate = useNavigate();
    const time = <div className={`${(hours + minutes + seconds) > 0 ? 'text-black' : 'text-red-300'}`}> {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} </div>



    const getTime = () => {
        let time = Date.parse(item.endDate + " GMT") - Date.parse(new Date().toUTCString())
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
        // if (time < 0) {
        //     clearInterval(interval);
        //     setTimerInterval(undefined)
        // }
    }


    useEffect(() => {

        clearInterval(interval);
        if (item.status == 0) {

            getTime()
            setTimerInterval(setInterval(() => getTime(), 1000));
        }
        // if (Date.parse(item.endDate + " GMT") >= Date.parse(new Date().toUTCString())) {
        // }
    }, []);


    return <Panel className="bg-white shadow" bodyFill xs={24}>
        <div className="grid sm:grid-cols-5 panel" onClick={() => { navigate("/Group/" + item.id); }}>
            <img src={item.photo} className={`object-cover h-32 w-full sm:col-span-1 ${(item.status === 4) ? "grayscale" : "grayscale-0"}`} alt='' draggable="false" />
            <div className="flex flex-col justify-between p-3 sm:col-span-4">
                <div>
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <h5>{item.name}</h5>
                        <div className="flex flex-row items-center">
                            <GroupStatus status={item.status} />
                            <div className="ml-1 w-14" hidden={!item.status == 0}>
                                {time}
                            </div>
                        </div>
                    </div>
                    <Divider hidden={!item.firstName} className="my-2" />
                </div>
                <div className="text-xs" hidden={!item.firstName}>by {item?.firstName} {item?.lastName}</div>

            </div>
        </div>
    </Panel>
}



export const GroupStatus = ({ status, className}) => {
    const groupStatus = ['Collecting ', 'Ordering', 'Ship has sailed', 'Orders arrived', 'Closed']
    let indicatorColorLight = 'bg-gray-300'
    let indicatorColor = 'bg-gray-500'

    switch (status) {
        case 0:
            indicatorColorLight = 'bg-green-300'
            indicatorColor = 'bg-green-400'
            break;
        case 1:
            indicatorColorLight = 'bg-yellow-400'
            indicatorColor = 'bg-yellow-500'
            break;
        case 2:
            indicatorColorLight = 'bg-red-400'
            indicatorColor = 'bg-red-500'
            break;
        case 3:
            indicatorColorLight = 'bg-blue-400'
            indicatorColor = 'bg-blue-500'
            break;
        case 4:
            indicatorColorLight = 'bg-gray-400'
            indicatorColor = 'bg-gray-500'
            break;
    }
    return (<div className={`flex flex-row gap-1 items-center`}>
            {/* <span className={`flex w-3 h-3 ${indicatorColor}  rounded-full mx-1`} /> */}
            <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${indicatorColorLight} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${indicatorColor}`}></span>
            </span>
            <div className={`${className}`}>{groupStatus[status]}</div>
        </div>
    )
}

