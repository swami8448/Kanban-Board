import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import './Task.css';

const Task = ({ task, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);

  // Toggle the dropdown menu
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Handle task deletion
  const handleDelete = () => {
    onDelete(task); // Call the onDelete function passed as a prop
    setShowOptions(false); // Hide the options menu after deletion
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-name">{task.name}</span>
        {/* More options (three dots) button */}
        <FaEllipsisH className="task-options" onClick={toggleOptions} />
        {/* Dropdown menu for more options */}
        {showOptions && (
          <div className="task-options-dropdown">
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span className="task-due">{task.dueDate}</span>
        <span className="task-assignee">{task.assignee}</span>
        <span className="task-tag">{task.tag}</span>
      </div>
    </div>
  );
};

export default Task;
