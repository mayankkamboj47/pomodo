"use client";
import { useEffect, useReducer, useState } from "react";
import List from "../comp/List";
import Task from "../comp/Task";
import Clock from "../comp/Clock";
import { ReactSortable } from "react-sortablejs";
import reducer from "./reducer";
import { dispatchType, initialState, shellState } from "./utils";
import Lists from "@/comp/Lists";

function App() {
  const [state, dispatch] = useReducer(reducer, null, shellState);

  useEffect(() => {
    if (state.listOrder.length === 0) {
      // this servers two purposes. The appshell has an empty listorder, so it populates the appshell.
      // secondly, it prevents deletion of all the lists, replacing it with the state just before the deletion
      if (localStorage.getItem("state")) {
        let newState = JSON.parse(localStorage.getItem("state") || "");
        dispatch({ type: "init", state: newState });
      } else {
        dispatch({ type: "init", state: initialState() });
      }
    } else {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (state.clockStatus === "running") dispatch({ type: "clock.tick" });
    const interval = setInterval(() => {
      if (state.clockStatus === "running") dispatch({ type: "clock.tick" });
      else if (state.clockStatus === "stopped") clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [state.clockStatus, state.clockType]);

  return (
    <>
      <link rel="preload" as="audio" href="/beep.mp3" fetchPriority="low" />
      <AppContainer>
        <Clock
          time={state.time}
          type={state.clockType}
          status={state.clockStatus}
          dispatch={dispatch}
        />
        <ListsContainer>
          <Lists state={state} dispatch={dispatch} />
          <AddList dispatch={dispatch} />/
        </ListsContainer>
      </AppContainer>
    </>
  );
}

interface containerProps {
  children : any[]
}
function AppContainer(props : containerProps) {
  return (
    <div className="app flex flex-wrap gap-5 justify-center bg-gray-100 min-h-screen">
      {props.children}
    </div>
  );
}

function ListsContainer(props : containerProps) {
  return (
    <div className="flex mt-44 w-full overflow-auto gap-5 justify-center">
      {props.children}
    </div>
  );
}

function AddList(props : { dispatch : dispatchType}) {
  return (
    <button
      className="add-list h-10 bg-black text-white font-bold py-2 px-4 rounded ml-4"
      onClick={() => props.dispatch({ type: "list.add" })}
    >
      <span className="sr-only">Add list</span>+
    </button>
  );
}

export default App;
