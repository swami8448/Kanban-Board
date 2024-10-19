import React, { useState } from 'react';
import { FaPlus, FaEllipsisH } from 'react-icons/fa';
import Task from './Task';
import './Section.css';

const Section = ({ title, tasks, onDrop, onDeleteTask, onDeleteSection }) => {
  const [showOptions, setShowOptions] = useState(false);

  const addTask = () => {
    const newTask = {
      name: prompt("Enter Task Name"),
      description: prompt("Enter Task Description"),
      dueDate: prompt("Enter Task Due Date"),
      assignee: prompt("Enter Assignee"),
      tag: prompt("Enter Task Tag"),
      sourceSection: title, // Include section when creating a task
    };
    if (newTask.name) {
      onDrop(newTask, title); // Add the new task to the current section
    }
  };

  const handleDeleteTask = (taskToDelete) => {
    onDeleteTask(taskToDelete, title);
  };

  const handleDragStart = (event, task) => {
    const taskWithSection = { ...task, sourceSection: title }; // Add section information to the task
    event.dataTransfer.setData("task", JSON.stringify(taskWithSection));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const taskData = JSON.parse(event.dataTransfer.getData("task"));
    onDrop(taskData, title); // Notify Board.js of the drop
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow the drop
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteSection = () => {
    onDeleteSection(title);
    setShowOptions(false);
  };

  return (
    <div className="section" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="section-header">
        <h2>{title}</h2>
        <button className="add-task-icon-btn" onClick={addTask}>
          <FaPlus />
        </button>
        <FaEllipsisH className="task-options" onClick={toggleOptions} />
        {showOptions && (
          <div className="task-options-dropdown">
            <button onClick={handleDeleteSection}>Delete Section</button>
          </div>
        )}
      </div>
      
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div 
              key={index} 
              draggable 
              onDragStart={(event) => handleDragStart(event, task)}
            >
              <Task task={task} onDelete={handleDeleteTask} />
            </div>
          ))
        ) : (
          <div className="no-tasks">
            <p>No tasks available</p>
          </div>
        )}
      </div>

      {/* Only show "Add Task" button if the section is "To Do" */}
    {title === 'To Do' && (
      <button className="add-task-btn" onClick={addTask}>
        + Add Task
      </button>
    )}
    </div>
  );
};

export default Section;
