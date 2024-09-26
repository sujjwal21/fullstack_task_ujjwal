// App.tsx
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { FaBook } from "react-icons/fa";
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    // Fetch tasks from backend
    axios.get('http://localhost:3000/fetchAllTasks')
      .then(response => {
        console.log(response)
        setTasks(response.data.tasks);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className='flex justify-center items-start flex-col gap-4 border border-gray-300 rounded-lg shadow-md bg-white-100 p-8 w-1/3 mx-auto mt-10 h-4/6 overflow-y-auto '>
      <h1  className='flex items-center text-3xl font-bold gap-3'> <FaBook /> Note App</h1>
      <TodoInput setTasks={setTasks} />
      <TodoList tasks={tasks} />
    </div>
  );
};

export default App;
