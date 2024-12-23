"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  // Function to add a new task
  const addTask = () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      const newTask = { name: taskName, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  // Function to remove a task
  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  return (
    <div className="task-list">
      <button className="add-button" onClick={addTask}>
        Add Task
      </button>
      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span className={task.completed ? "completed" : ""}>
              {task.name}
            </span>
            <button className="remove-button" onClick={() => removeTask(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
