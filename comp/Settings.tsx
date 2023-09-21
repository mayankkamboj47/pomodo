import { dispatchType } from "@/utils/types";
import { useState } from "react";

export default function Settings(props : {dispatch : dispatchType}) {
  return <Drawer>
    <ul className="w-64 py-3 grid gap-1">
        <li><label className="flex items-center">Reset clock <Button onClick={()=>props.dispatch({type : "clock.reset"})}>Reset</Button></label></li>
        <li><label className="flex items-center">Clear app data <ResetButton dispatch={props.dispatch} /></label></li>
    </ul>
  </Drawer>
}

function Drawer(props: { children: any }) {
  let [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-2 right-2">
      <div
        className={`absolute bg-white bottom-10 right-0 rounded-2xl ${open ? '' : 'hidden'}`}
      >
        {props.children}
      </div>
      <button onClick={() => setOpen(!open)} className="h-10 bg-gray-100 p-2">
        <span className="sr-only">Settings</span>
        <SettingsSvg />
      </button>
    </div>
  );
}

function SettingsSvg(){
    return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
  </svg>);
}

function ResetButton(props : {dispatch : dispatchType}){
    return <Button onClick={()=>{
        if(confirm('Warning : All your app data will go away'))
            props.dispatch({type : "app.reset"});
    }}>Reset</Button>
}

function Button(props : {onClick? : ()=>void, children : any}){
    return <button onClick={props.onClick} className="py-2 px-4 bg-blue-100 hover:bg-blue-200 rounded-lg ml-auto">{props.children}</button>
}