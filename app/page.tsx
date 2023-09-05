"use client";
import { useReducer } from "react";
import List from "../comp/List";
import Task from "../comp/Task";
import Clock from "../comp/Clock";
import { ReactSortable } from "react-sortablejs";

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
    <div className="app flex flex-wrap gap-5">
      <Clock
        endTime={state.endTime}
        type={state.clockType}
        status={state.clockStatus}
        dispatch={dispatch}
      />
      <ReactSortable
        list={state.listOrder}
        setList={(newOrder) =>
          dispatch({ type: "list.reorder", order: newOrder })
        }
        className="flex gap-5"
      >
        {state.listOrder.map((listId) => {
          const list = state.lists[listId];
          let tasks = (
            <ReactSortable
              list={list.taskOrder}
              setList={(newOrder) =>
                dispatch({ type: "task.reorder", order: newOrder, listId })
              }
              className="list-body"
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
              </List>
          );
        })}
      </ReactSortable>
      <div
        className="add-list bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => dispatch({ type: "list.add" })}
      >
        +
      </div>
    </div>
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
      if (state.clockType === "break") {
        newState.clockType = "work";
        newState.endTime = Math.floor(new Date().getTime() / 1000) + 60 * 60;
      } else {
        newState.clockType = "break";
        newState.endTime = Math.floor(new Date().getTime() / 1000) + 60 * 5;
      }
      newState.clockStatus = "stopped";
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
