import { AppState, dispatchType } from "@/app/utils";
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
      className="bg-white shadow-xl rounded-lg p-4 cursor-move w-64"
      style={{ minHeight: "25rem"}}
    >
      <div className="flex items-center justify-between mb-4">
        {editing ? (
          <input
            className="text-xl w-5/12 font-medium outline-none"
            value={listName}
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
          onClick={() => dispatch({ type: "task.add", id })}
        >
          <span className="sr-only">Add</span>+
        </button>
      </div>

      <div className="list-body">{children}</div>
    </div>
  );
}
