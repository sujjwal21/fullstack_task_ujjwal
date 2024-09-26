import React from 'react';

interface TodoListProps {
  tasks: string[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="w-full h-80 overflow-y-auto max-w-lg mx-auto p-5 bg-white-100 scrollbar-thin ">
    <h2 className="text-2xl flex font-semibold text-center items-start mb-4 text-gray-700 border-b-2">Notes</h2>
    <ul className="list-none p-0">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <li
            key={index}
            className="p-3 mb-2 bg-white border-b-2"
          >
            {task}
          </li>
        ))
      ) : (
        <p className="text-gray-500 text-center">No tasks yet! Add your first task.</p>
      )}
    </ul>
  </div>
  );
};

export default TodoList;
