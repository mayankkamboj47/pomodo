import { useEffect, useState } from "react";

const Clock = ({endTime, type, status, dispatch} : any) => {

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
    <div className="absolute" onClick={()=>dispatch({type:"clock.type"})}>

      <div className="w-40 h-40 shadow-2xl rounded-full bg-blue-50"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-column justify-center align-center text-center w-40">
        
        <div className="m-0 p-0">{type}</div>
        
        <div className="text-2xl font-bold">
          {clocktimeToString(clockTime)}
        </div>

        
          {status === 'running' ? (
            <button 
              className=""
              onClick={(e) => dispatchStopResume(e, dispatch, clockTime)}
            >
                           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg>
            </button>
          ) : (
            <button
              className=""
              onClick={(e) => dispatchStopResume(e, dispatch, clockTime)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 16 16">
  <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg>

            </button>  
          )}

        </div>


    </div>
  );
}

function dispatchStopResume(e : any, dispatch : any, clockTime : any) {
  e.stopPropagation();
  dispatch({ type: "clock.stop-resume", clockTime });
}

function clocktimeToString(clockTime : any) {
  let minutes = Math.floor(clockTime / 60);
  let seconds = clockTime % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
export default Clock;