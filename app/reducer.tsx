export default function reducer(state: any, action: any) {
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
        newState.endTime = Math.floor(new Date().getTime() / 1000) +  25 * 60;
      } else {
        newState.clockType = "break";
        newState.endTime = Math.floor(new Date().getTime() / 1000) +  5 * 60;
      }
      break;

      case "beep" :
        // play audio
        new Audio('/beep.mp3').play();
        
        if (state.clockType === "break") {
          newState.clockType = "work";
          newState.endTime = Math.floor(new Date().getTime() / 1000) +  25 * 60;
        } else {
          if(newState.tasks[newState.selectedTask])
            newState.tasks[newState.selectedTask].points += 1;
          newState.clockType = "break";
          newState.endTime = Math.floor(new Date().getTime() / 1000) +  5 * 60;
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
  