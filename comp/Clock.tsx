import { AppState, dispatchType } from "@/utils/types";

interface propTypes {
  time: AppState["time"];
  type: AppState["clockType"];
  status: AppState["clockStatus"];
  totalMins: AppState["totalMins"];
  dispatch: dispatchType;
}

const Clock = ({ time, type, status, totalMins, dispatch }: propTypes) => {
  const onPausePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: "clock.stop-resume" });
    e.stopPropagation();
  };
  return (
    <div className="clock absolute" data-testid="clock">
      <div className="w-40 h-40 shadow-2xl rounded-full bg-blue-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-column justify-center align-center text-center w-40">
        <div className="m-0 p-0">{type}</div>
        <TimeDisplay time={time} totalMins={totalMins} dispatch={dispatch} />
        <button className="" onClick={onPausePlay}>
          {status === "running" ? (
            <>
              {pauseSvg}
              <span className="sr-only">Pause</span>
            </>
          ) : (
            <>
              {playSvg}
              <span className="sr-only">Play</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

function TimeDisplay({
  time,
  totalMins,
  dispatch,
}: {
  time: number;
  totalMins: number;
  dispatch: dispatchType;
}) {
  return time === totalMins * 60 ? (
    <div className="">
      <label className="sr-only" htmlFor="clockTime">Time in minutes</label>
      <input
        type="number"
        name="clockTime"
        className="w-11 text-2xl bg-blue-50"
        value={totalMins}
        min={1}
        onChange={(e) =>
          dispatch({ type: "clock.setTime", time: Number(e.target.value) })
        }
      />
      minutes
    </div>
  ) : (
    <div className="text-2xl font-bold">{clocktimeToString(time)}</div>
  );
}
function clocktimeToString(clockTime: number) {
  let minutes = Math.floor(clockTime / 60);
  let seconds = clockTime % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}
export default Clock;

// helper variables

const pauseSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="black"
    viewBox="0 0 16 16"
  >
    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
  </svg>
);

const playSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="black"
    viewBox="0 0 16 16"
  >
    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
  </svg>
);
