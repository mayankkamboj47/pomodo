import { AppState, actionType } from "./types";

export default function reducer(state: AppState, action: actionType) : AppState {
  let newState : AppState = { ...state };
  switch (action.type) {
    case "init":
      return action.state;
    break;
    
    case "clock.stop-resume":
      if (state.clockStatus === "running") {
        newState.clockStatus = "stopped";
      } else {
        if(state.selectedTask === null) throw new Error('Cannot start clock without a selected task');
        newState.clockStatus = "running";
      }
      break;

    case "clock.setTime":
      if(newState.clockStatus !== 'stopped') throw new Error('Cannot change time while clock is running');
      if(typeof action.time !== 'number') throw new Error('Time must be a number');
      newState.time = action.time * 60;
      newState.totalMins = action.time;
    break;

    case "clock.tick":
      newState.time--;
      if (newState.time === 0) {
        new Audio("/beep.mp3").play();
        newState.clockStatus = "stopped";
        if (state.clockType === "break") {
          newState.clockType = "work";
          newState.time = 25 * 60;
          newState.totalMins = 25;
        } else {
          if (newState.selectedTask && newState.tasks[newState.selectedTask])
            newState.tasks[newState.selectedTask].points += state.totalMins;
          newState.clockType = "break";
          newState.time = 5 * 60;
          newState.totalMins = 5;
        }
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
      const newTaskId = new Date().getTime();
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
      const newListId : number = new Date().getTime();
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