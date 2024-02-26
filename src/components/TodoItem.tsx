import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTodoStore } from '../store';
import { RiCheckboxLine, RiDeleteBin2Line, RiEdit2Line, RiRecycleLine } from 'react-icons/ri';


// Validation Schema for the Todo Form
const schema = z.object({
    text: z.string().min(3, 'Todo must be at least 3 characters long').max(100, 'Todo must be at most 100 characters long').nonempty('Todo must not be empty')
});

// FormData type for the Todo Form
type FormData = {
    text: string;
};

// Todo Item Component Props
type Props = {
    todo: {
        text: string;
        isCompleted: boolean;
        id: number;
    };
};


const TodoItem: React.FC<Props> = ({ todo }) => {
    // To check if the todo is being edited or not
    const [isEditing, setIsEditing] = useState(false);
    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { text: todo.text },
    });

    // Zustand Store Actions
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const deleteTodo = useTodoStore((state) => state.deleteTodo);
    const updateTodo = useTodoStore((state) => state.updateTodo);

    // Edit Handler
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Update Handler

    const handleUpdate = (data: FormData) => {
        updateTodo(todo.id, data.text);
        setIsEditing(false);
        toast.success('Todo updated successfully!');
    };

    // Toggle Handler to mark the todo as completed or incomplete
    const handleToggle = () => {
        toggleTodo(todo.id);
        toast.success(todo.isCompleted ? 'Todo marked as incomplete!' : 'Todo marked as complete!');
    };

    // Delete Handler to delete the todo

    const handleDelete = () => {
        deleteTodo(todo.id);
        toast.success('Todo deleted successfully!');
    };

    return (
        <div className='flex items-center p-4 bg-zinc-800 rounded-xl my-2 w-[28rem]'>
            {isEditing ? (
                <form onSubmit={handleSubmit(handleUpdate)} className='flex w-full'>
                    <Input
                        {...register('text')}
                        className='bg-zinc-800 w-full text-white placeholder-gray-400 focus:ring-0 focus:border-0 focus:outline-none'
                    />
                    <Button type='submit' className='p-2 px-4 bg-blue-500 ml-2'>
                        Update
                    </Button>
                    {errors.text && <p className='text-sm text-red-500'>{errors.text.message}</p>}
                </form>
            ) : (
                <>
                    <div className='flex flex-col w-full'>
                        {/* Todo Text */}
                        <div className='border-b border-zinc-600 py-2 text-base font-semibold'>
                            <p className={`flex-1 text-white ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                {todo.text}
                            </p>
                        </div>
                        {/* Actions */}
                        <div className='flex items-center justify-between'>
                            <div>
                                {
                                    todo.isCompleted ? (
                                        <Button onClick={handleToggle} className='p-0 bg-transparent hover:bg-transparent text-white flex gap-x-1 items-center text-base'>
                                            <RiRecycleLine size={18} />
                                            Mark Undone
                                        </Button>
                                    ) : (
                                        <Button onClick={handleToggle} className='p-0 bg-transparent hover:bg-transparent text-white flex gap-x-1 items-center text-base'>
                                            <RiCheckboxLine size={18} />
                                            Mark as Completed
                                        </Button>
                                    )
                                }
                            </div>
                            <div className='flex items-center gap-x-4 '>
                                <Button onClick={handleEdit} className='p-0  bg-transparent hover:bg-transparent text-white flex gap-x-1 items-center text-base'>
                                    <RiEdit2Line size={18} />
                                    Edit
                                </Button>
                                <Button onClick={handleDelete} className='p-0 bg-transparent hover:bg-transparent text-red-500 flex gap-x-1 items-center text-base'>
                                    <RiDeleteBin2Line size={18} />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;
