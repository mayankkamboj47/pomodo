import { ItemInterface, ReactSortable } from "react-sortablejs";
import Task from "./Task";
import { AppState, dispatchType } from "../utils/types";

export default function Tasks({ state, dispatch, listId } : { state : AppState, dispatch : dispatchType, listId : number }) {
    return (
      <ReactSortable
        list={state.lists[listId].taskOrder as unknown as ItemInterface[]}
        setList={(newOrder) =>
          dispatch({ type: "task.reorder", order: newOrder, listId })
        }
        style={{ paddingBottom: "5rem" }}
        group="tasks"
        draggable=".task"
        animation={150}
        easing="linear"
        forceFallback={true}
        fallbackOnBody={true}
        fallbackTolerance={0}
      >
        {state.lists[listId].taskOrder.map((taskId: number) => {
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
  }
  