import { Toaster } from 'react-hot-toast';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="flex flex-col items-center bg-zinc-900 min-h-[100vh]">
      <TodoForm />
      <TodoList />
      <Toaster position='bottom-center' />
    </div>
  );
}

export default App;
