import React, { useState } from 'react';
import Section from './Section';
import AddSectionButton from './AddSectionButton';
import './Board.css';

const Board = () => {
  const [sections, setSections] = useState(['To Do', 'In Progress', 'Done']);
  const [tasksBySection, setTasksBySection] = useState({
    'To Do': [{ name: 'Task 1' }],
    'In Progress': [{ name: 'Task 2' }],
    'Done': [{ name: 'Task 3' }],
  });

  const handleDeleteTask = (taskToDelete, sectionTitle) => {
    const updatedTasks = tasksBySection[sectionTitle].filter(task => task.name !== taskToDelete.name);
    setTasksBySection({
      ...tasksBySection,
      [sectionTitle]: updatedTasks
    });
  };

  // Function to delete a section
  const handleDeleteSection = (sectionTitle) => {
    const updatedSections = sections.filter(section => section !== sectionTitle);
    setSections(updatedSections);

    const updatedTasks = { ...tasksBySection };
    delete updatedTasks[sectionTitle];
    setTasksBySection(updatedTasks);
  };

  // Handle the task drop
  const handleDrop = (task, destinationSection) => {
    const sourceSection = task.sourceSection;

    // Remove the task from the source section
    const updatedSourceTasks = tasksBySection[sourceSection].filter(t => t.name !== task.name);

    // Add the task to the destination section
    const updatedDestinationTasks = [...tasksBySection[destinationSection], task];

    setTasksBySection({
      ...tasksBySection,
      [sourceSection]: updatedSourceTasks,
      [destinationSection]: updatedDestinationTasks,
    });
  };

  return (
    <div className="board">
      {sections.map((section, index) => (
        <Section 
          key={index} 
          title={section} 
          tasks={tasksBySection[section]} 
          onDeleteTask={handleDeleteTask} 
          onDeleteSection={handleDeleteSection}
          onDrop={handleDrop} // Pass the drop handler
        />
      ))}
      <AddSectionButton onAddSection={title => setSections([...sections, title])} />
    </div>
  );
};

export default Board;
