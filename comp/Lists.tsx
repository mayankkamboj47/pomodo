import { ReactSortable } from "react-sortablejs";
import List from "./List";
import Tasks from "./Tasks";
import { AppState, dispatchType } from "@/utils/types";

export default function Lists({ state, dispatch } : { state : AppState, dispatch : dispatchType  }) {
  return (
    <ReactSortable
      list={state.listOrder as any[]}
      setList={(newOrder) =>
        dispatch({ type: "list.reorder", order: newOrder })
      }
      className={"flex gap-5 w-full flex-wrap justify-center"}
      group="shared"
      forceFallback={true}
      fallbackOnBody={true}
      fallbackTolerance={0}
      animation={150}
      easing="linear"
    >
      {state.listOrder.map((listId) => {
        const list = state.lists[listId];
        let deleteButton = (
          <DeleteList dispatch={dispatch} id={listId} key={listId} />
        );
        let tasks = (
          <Tasks state={state} dispatch={dispatch} listId={listId} />
        );
        return (
          <List key={listId} name={list.name} dispatch={dispatch} id={listId}>
            {tasks}
            {list.taskOrder.length === 0 && deleteButton}
          </List>
        );
      })}
    </ReactSortable>
  );
}

function DeleteList({ dispatch, id } : { dispatch : dispatchType, id : number }) {
  return (
    <button
      onClick={() => dispatch({ type: "list.delete", id })}
      className="bg-gray-50 px-4 py-2 flex-column justify-center align-center text-center rounded-lg w-full h-32"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 16 16"
        style={{ margin: "0 auto" }}
      >
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
      </svg>
      Delete list
    </button>
  );
}
