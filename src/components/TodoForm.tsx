import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTodoStore } from '../store';
import { useEffect } from 'react';

// Validation Schema for the Todo Form
const schema = z.object({
    text: z.string().min(3, 'Todo must be at least 3 characters long'),
});

// FormData type for the Todo Form
type FormData = {
    text: string;
};

const TodoForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false); // State to track form submission

    // React Hook Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // Zustand Store
    const addTodo = useTodoStore((state) => state.addTodo);

    // Form Submit Handler
    const onSubmit = (data: FormData) => {
        addTodo(data.text);
        reset();
        setSubmitted(true); // Set submitted to true on form submit
        toast.success('Todo added successfully!');
    };

    // Error Handling for the Todo Form with Toast
    useEffect(() => {
        if (submitted && errors.text?.message) {
            toast.error(errors.text.message);
        }
    }, [errors.text, submitted]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex p-4 gap-x-2 bg-zinc-800 rounded-xl my-2 w-[28rem]'
        >
            <div className='flex flex-col w-full '>
                <Input
                    {...register('text')}
                    placeholder='Start Working on a new task...'
                    className='bg-zinc-800 w-full text-white placeholder-gray-400 focus:ring-0 focus:border-0 focus:outline-none'
                />
            </div>
            <Button type='submit' className='p-4 px-6 bg-green-500'>
                Add
            </Button>
        </form>
    );
};

export default TodoForm;
