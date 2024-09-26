import React, { useState } from "react";

const ws = new WebSocket("ws://localhost:3000");

const TodoInput = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = task;
      ws.send(JSON.stringify({ event: "add", data: newTask }));
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask("");
    }
  };

  return (
    <div className="flex items-center" >
      <input
        type="text"
        value={task}
        className="w-80 border-2 border-gray-300 p-2 rounded-lg"
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Note..."
      />
      <button className="ml-2 px-4 py-2 bg-orange-800 text-white rounded-lg hover:bg-orange-700" onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default TodoInput;
