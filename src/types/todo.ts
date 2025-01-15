export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export interface TodoStore {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
  }