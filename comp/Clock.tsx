import { useEffect, useState } from "react"

export default function Clock({endTime, type, status, dispatch}: any) {
    const [clockTime, setClockTime] = useState(endTime - Math.floor(Date.now()/1000));
    useEffect(() => {
        setClockTime(Math.floor(endTime - Date.now()/1000));
        if(status !== 'running') return;
        const interval = setInterval(() => {
            setClockTime(Math.floor(endTime - Date.now()/1000));
        }, 1000);
        if (clockTime <= 0) {
            dispatch({ type: 'beep' });
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [endTime, status, type]);
    return (
        <div className="bg-gray-800 text-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{type}</h1>
                <div>
                    {status === 'running' ? (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => dispatch({ type: 'clock.stop-resume', clockTime })}>Stop</button>
                    ) : (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => dispatch({ type: 'clock.stop-resume', clockTime })}>Resume</button>
                    )}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch({ type: 'clock.type' })}>Change</button>
                </div>
            </div>
            <div className="text-4xl font-bold">{clockTime}</div>
        </div>
    )
}