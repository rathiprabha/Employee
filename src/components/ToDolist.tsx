import React, { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Task {
  id: number;
  name: string;
}

const ToDolist: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  // Form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskItem: Task = { id: Date.now(), name: newTask }; // Assign ID to each task
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  // Delete task
  const handleDelete = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <span className="heading mt-5">TASKIFY</span>
      <form className="input" onSubmit={handleSubmit}>
        <input type="text" className="input_box" value={newTask} onChange={handleInputChange} placeholder="Enter a new task"/>
        <button type="submit" className="input_submit">Go</button>
      </form>
      <h3>Tasks</h3>
      </div>
  );
};

export default ToDolist;
