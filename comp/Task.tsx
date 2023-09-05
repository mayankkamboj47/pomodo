import React from "react";

export default function Task({value, id, points, dispatch, selected}) {

  const [taskValue, setTaskValue] = React.useState(value);
  const [editing, setEditing] = React.useState(false);

  return (
    <div 
      className={`${selected ? 'border-2 border-blue-500' : ''} p-3 bg-gray-100 rounded cursor-pointer`}
      onClick={() => dispatch({type: 'task.select', taskId: id})}  
    >

      <div className="flex justify-between items-center mb-2">

        {editing ?

          <input 
            className="border border-gray-400 rounded p-2" 
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            onBlur={(e) => {
              dispatch({type: 'task.edit', id, value: e.target.value});
              setEditing(false);
            }}  
          />

        :

          <h4 
            className="text-lg font-medium"
            onClick={() => setEditing(true)}  
          >
            {value}
          </h4>
        
        }

        <button
          className="font-bold py-2 px-4 rounded"
          onClick={() => dispatch({type: 'task.delete', taskId: id})} 
        >
          x
        </button>

      </div>

      <div className="text-gray-600 text-sm">
        {points} points
      </div>

    </div>
  );

}