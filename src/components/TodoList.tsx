import React from 'react';
import { useTodoStore } from '../store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    // Zustand Store State
    const todos = useTodoStore((state) => state.todos);

    return (
        <div className='flex flex-col items-center'>
            {todos.length === 0 ? (
                <div className='w-[28rem] h-[220px] my-4 rounded-xl shadow-lg flex flex-col bg-[#171619]'>
                    <img src='/rocket.svg' alt='Empty' className='w-36 h-36 mx-auto ' />

                    <h3 className='text-white text-center text-xl font-semibold mt-4'>
                        Yay! You got nothing to do.
                    </h3>
                </div>
            ) : (
                todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))
            )}
        </div>
    );
};

export default TodoList;
