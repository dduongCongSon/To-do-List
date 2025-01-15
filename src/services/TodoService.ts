import { Todo } from '../types/todo';

export class TodoService {
  private readonly STORAGE_KEY = 'todos';

  getTodos(): Todo[] {
    const todosJson = localStorage.getItem(this.STORAGE_KEY);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  addTodo(todos: Todo[], text: string): Todo[] {
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };
    const newTodos = [...todos, newTodo];
    this.saveTodos(newTodos);
    return newTodos;
  }

  deleteTodo(todos: Todo[], id: number): Todo[] {
    const newTodos = todos.filter(todo => todo.id !== id);
    this.saveTodos(newTodos);
    return newTodos;
  }

  toggleTodo(todos: Todo[], id: number): Todo[] {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos(newTodos);
    return newTodos;
  }

  editTodo(todos: Todo[], id: number, newText: string): Todo[] {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    );
    this.saveTodos(newTodos);
    return newTodos;
  }

  reorderTodos(todos: Todo[]): void {
    this.saveTodos(todos);
  }
}