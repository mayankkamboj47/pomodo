import { AppState, dispatchType } from "@/utils/types";
import React from "react";
import Markdown from "markdown-to-jsx";

interface propTypes {
  value: AppState["tasks"][number]["value"];
  id: number;
  points: AppState["tasks"][number]["points"];
  dispatch: dispatchType;
  selected: boolean;
}

const Task = ({ value, id, points, dispatch, selected }: propTypes) => {
  const [taskValue, setTaskValue] = React.useState(value);
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={`task relative ${randomColor(
        id
      )} shadow-lg p-4 cursor-pointer ${
        selected ? "border-blue-500 border-2" : ""
      } mb-2 rounded-lg`}
      onClick={() => dispatch({ type: "task.select", taskId: id })}
      data-testid={id}
    >
      <button
        className="text-red-500 hover:text-red-600 font-bold text-xl absolute top-1 right-2.5"
        onClick={() => dispatch({ type: "task.delete", taskId: id })}
      >
        &times;
      </button>
      <div className="flex justify-between content-start">
        <label htmlFor="task_edit" className="sr-only">Edit task</label>
        {editing ? (
          <textarea
            className="w-full focus:outline-none bg-transparent"
            style={{'height' : Math.max((taskValue.split('\n').length+1)*1.5, 10) + 'rem'}}
            value={taskValue}
            name="task_edit"
            ref={inputRef}
            onChange={(e) => setTaskValue(e.target.value)}
            onBlur={() => {
              dispatch({ type: "task.edit", id, value: taskValue });
              setEditing(false);
            }}
          ></textarea>
        ) : (
          <div
            className="cursor-text mb-2 markdown-view w-full"
            data-testid="task-value"
            onDoubleClick={() => {
              setEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            style={{minHeight : '1.5rem'}}
          >
            <Markdown>{value}</Markdown>
          </div>
        )}
      </div>

      <Points points={points} />
    </div>
  );
};

export function Points({ points }: { points: number }) {
  type valueEmojiPair = [number, string];
  let values: valueEmojiPair[] = [
    [25, "🍩"],
    [10, "🍫"],
    [5, "🍭"],
    [1, "🍬"],
  ];
  let emojis: { [emoji: string]: number } = {};
  for (let [value, emoji] of values) {
    emojis[emoji] = Math.floor(points / value);
    points = points % value;
  }
  let emojiString = values.map(([_, emoji]) =>
    emojis[emoji] ? (
      <span className="emoji p-0.5 rounded-md mr-0.5" style={{background:'#ffffff77'}} key={emoji}>
        {emoji}
        <span className="emoji-count">{emojis[emoji]}</span>
      </span>
    ) : (
      " "
    )
  );
  return <span className="emojis">{emojiString}</span>;
}
// a pseudorandom number generator, that is seeded with a number
// and returns a function that returns a number between 0 and 1
// every time it is called
const random = (seed: number) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const randomColor = (seed: number) => {
  let colors = [
    "bg-red-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-pink-200",
  ];
  return colors[Math.floor(random(seed) * colors.length)];
};

export default Task;
