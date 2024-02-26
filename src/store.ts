import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the type of the todo object
type Todo = {
  text: string;
  isCompleted: boolean;
  id: number;
};

// Define the type of the Todo Store

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
};

export const useTodoStore = create<TodoStore>()(
  // Persist the store to localStorage
  persist(
    (set) => ({
      // Initial State of the Store

      todos: [],
      // Actions for the Store
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { text, isCompleted: false, id: Math.random() },
          ],
        })),
      // Delete a Todo
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      // Toggle a Todo as completed or incomplete
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          ),
        })),
      // Update a Todo with new text
      updateTodo: (id, text) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        })),
    }),
    {
      // Unique name for the storage key
      name: 'todo-store',
      // use localStorage for storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
