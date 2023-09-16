export interface TaskType {
  value: string;
  points: number;
}

export interface ListType {
  name: string;
  taskOrder: number[];
}

export interface AppState {
  time: number;
  totalMins: number;
  clockType: "work" | "break";
  clockStatus: "running" | "stopped";
  listOrder: number[];
  lists: {
    [id: number]: ListType;
  };
  tasks: {
    [id: number]: Task;
  };
  selectedTask: null | number;
}

export type actionType = { type: string } & { [key: string]: any } & {
  [key: number]: any;
};

export type dispatchType = (action: actionType) => void;
