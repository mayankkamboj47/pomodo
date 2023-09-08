"use client";
import { useReducer } from "react";
import List from "../comp/List";
import Task from "../comp/Task";
import Clock from "../comp/Clock";
import { ReactSortable } from "react-sortablejs";
import Head from "next/head";

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    endTime: Math.floor(new Date().getTime() / 1000) + 60 * 60,
    clockType: "break",
    clockStatus: "running",
    listOrder: [2, 1, 3, 0],
    lists: {
      0: {
        name: "To Do",
        taskOrder: [0, 1, 2],
      },
      1: {
        name: "Doing",
        taskOrder: [3],
      },
      2: {
        name: "Done",
        taskOrder: [4],
      },
      3: {
        name: "Blocked",
        taskOrder: [5],
      },
    },
    tasks: {
      0: {
        value: "Task 1",
        points: 1,
      },
      1: {
        value: "Task 2",
        points: 2,
      },
      2: {
        value: "Task 3",
        points: 3,
      },
      3: {
        value: "Task 4",
        points: 4,
      },
      4: {
        value: "Task 5",
        points: 5,
      },
      5: {
        value: "Task 6",
        points: 6,
      },
    },
    selectedTask: null,
  });

  return (
    <>
    <link rel="preload" as="audio" href="/beep.mp3"  fetchPriority="low"/>
    <div className="app flex flex-wrap gap-5 justify-center bg-gray-100 h-screen">
      <Clock
        endTime={state.endTime}
        type={state.clockType}
        status={state.clockStatus}
        dispatch={dispatch}
      />
      <div className="flex mt-40 w-full overflow-auto gap-5">
        <ReactSortable
          list={state.listOrder}
          setList={(newOrder) =>
            dispatch({ type: "list.reorder", order: newOrder })
          }
          className="flex gap-5"
          group="shared"
        >
          {state.listOrder.map((listId) => {
            const list = state.lists[listId];
            let deleteButton = (
              <button
                onClick={() => dispatch({ type: "list.delete", id: listId })}
                className="bg-gray-50 px-4 py-2 flex-column justify-center align-center text-center rounded-lg w-full h-32"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" style={{margin:"0 auto"}}>
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
                Delete list 
              </button>
            );
            let tasks = (
              <ReactSortable
                list={list.taskOrder}
                setList={(newOrder) =>
                  dispatch({ type: "task.reorder", order: newOrder, listId })
                }
                style={{ paddingBottom: "5rem" }}
                group="tasks"
              >
                {list.taskOrder.map((taskId) => {
                  let task = state.tasks[taskId];
                  return (
                    <Task
                      key={taskId}
                      value={task.value}
                      id={taskId}
                      selected={state.selectedTask === taskId}
                      points={task.points}
                      dispatch={dispatch}
                    />
                  );
                })}
              </ReactSortable>
            );
            return (
              <List
                key={listId}
                name={list.name}
                dispatch={dispatch}
                id={listId}
              >
                {tasks}
                {list.taskOrder.length === 0 && deleteButton}
              </List>
            );
          })}
        </ReactSortable>
        <button
          className="add-list h-10 bg-black text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch({ type: "list.add" })}
        >
          +
        </button>
      </div>
    </div>
    </>
  );
}

function reducer(state: any, action: any) {
  let newState = { ...state };
  switch (action.type) {
    case "clock.stop-resume":
      if (state.clockStatus === "running") {
        newState.clockStatus = "stopped " + action.clockTime;
      } else if (state.clockStatus.match(/^stopped \d+$/)) {
        newState.clockStatus = "running";
        newState.endTime =
          Math.floor(new Date().getTime() / 1000) +
          Number(state.clockStatus.split(" ")[1]);
      } else {
        newState.clockStatus = "running";
      }
      break;

    case "clock.type":
    newState.clockStatus = "stopped";
    if (state.clockType === "break") {
      newState.clockType = "work";
      newState.endTime = Math.floor(new Date().getTime() / 1000) +  25;
    } else {
      newState.clockType = "break";
      newState.endTime = Math.floor(new Date().getTime() / 1000) +  5;
    }
    break;
    case "beep" :
      // play audio
      new Audio('/beep.mp3').play();
      if (state.clockType === "break") {
        newState.clockType = "work";
        newState.endTime = Math.floor(new Date().getTime() / 1000) +  25;
      } else {
        newState.clockType = "break";
        newState.endTime = Math.floor(new Date().getTime() / 1000) +  5;
      }
      break;
    

    case "task.delete":
      delete newState.tasks[action.taskId];
      for (let listId in newState.lists) {
        newState.lists[listId].taskOrder = newState.lists[
          listId
        ].taskOrder.filter((taskId: any) => taskId !== action.taskId);
      }
      break;

    case "task.select":
      newState.selectedTask = action.taskId;
      break;

    case "task.add":
      const newTaskId =
        Math.max(
          ...Object.keys(newState.tasks).map((taskId: any) => Number(taskId))
        ) + 1;
      newState.tasks[newTaskId] = {
        value: "New Task",
        points: 0,
      };
      newState.lists[action.id].taskOrder.push(newTaskId);
      break;

    case "task.edit":
      if ("value" in action) newState.tasks[action.id].value = action.value;
      if ("points" in action) newState.tasks[action.id].points = action.points;
      break;

    case "task.reorder":
      newState.lists[action.listId].taskOrder = action.order;
      break;
    case "list.add":
      const newListId =
        Math.max(
          ...Object.keys(newState.lists).map((listId: any) => Number(listId))
        ) + 1;
      newState.lists[newListId] = {
        name: "New List",
        taskOrder: [],
      };
      newState.listOrder.push(newListId);
      break;

    case "list.delete":
      delete newState.lists[action.id];
      newState.listOrder = newState.listOrder.filter(
        (listId: any) => listId !== action.id
      );
      break;

    case "list.rename":
      newState.lists[action.id].name = action.name;
      break;

    case "list.reorder":
      newState.listOrder = action.order;
      break;
  }
  return newState;
}
