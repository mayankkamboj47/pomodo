import { AppState, dispatchType } from "@/utils/types";
import React from "react";

interface propTypes {
  name: AppState["lists"][number]["name"];
  dispatch: dispatchType;
  children: any[];
  id: number;
}

export default function List({ name, dispatch, children, id }: propTypes) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [editing, setEditing] = React.useState(false);
  const [listName, setListName] = React.useState(name);

  return (
    <div
      className="list bg-white shadow-xl rounded-lg p-4 cursor-move w-64"
      style={{ minHeight: "25rem"}}
      data-testid={'list'+id}
    >
      <div className="flex items-center justify-between mb-4">
        <label className="sr-only" htmlFor="listname_edit">List name</label>
        {editing ? (
          <input
            className="text-xl w-full font-medium outline-none"
            value={listName}
            name="listname_edit"
            data-testid="listname-edit"
            onChange={(e) => setListName(e.target.value)}
            ref={inputRef}
            onBlur={(e) => {
              dispatch({ type: "list.rename", id, name: e.target.value });
              setEditing(false);
            }}
          />
        ) : (
          <h1
            className="text-xl font-medium cursor-text w-full"
            data-testid="list-name"
            style={{minHeight : '1.5rem'}}
            onClick={() => {
              setEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
          >
            {name}
          </h1>
        )}

        <button
          className="py-2 px-4 rounded"
          data-testid="add-task"
          onClick={() => dispatch({ type: "task.add", id })}
        >
          <span className="sr-only">Add</span>+
        </button>
      </div>

      <div className="list-body">{children}</div>
    </div>
  );
}
