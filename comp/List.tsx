import React from "react";

export default function List({name, dispatch, tasks, id}) {

  const [editing, setEditing] = React.useState(false);

  const [listName, setListName] = React.useState(name);

  return (
    <div className="bg-white shadow rounded-lg p-4 w-64" style={{minHeight : '25rem'}}>
      
      <div className="flex items-center justify-between mb-4">

        {editing ? 

          <input 
            className="border border-gray-400 rounded p-2"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onBlur={(e) => {
              dispatch({type:'list.rename', id, name: e.target.value});
              setEditing(false);
            }}
          />
          
        : 
        
          <h1 
            className="text-xl font-medium cursor-pointer" 
            onClick={() => setEditing(true)}
          >
            {name}
          </h1>
        
        }

        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch({type: 'task.add', id})}
        >
          +
        </button>

      </div>

      <div className="list-body">
        {tasks.length ? tasks :

          <button
            className="font-bold w-full min-h-60"
            onClick={() => dispatch({type: 'list.delete', id})}  
          >
            Delete List
          </button>
          
        }
      </div>

    </div>
  );

}