import React, { useState } from 'react';
import Section from './Section';
import AddSectionButton from './AddSectionButton';
import './Board.css';

const Board = () => {
  const [sections, setSections] = useState(['To Do', 'In Progress', 'Done']);
  const [tasksBySection, setTasksBySection] = useState({
    'To Do': [],
    'In Progress': [],
    Done: [],
  });

  const handleDeleteTask = (taskToDelete, sectionTitle) => {
    const updatedTasks = tasksBySection[sectionTitle].filter(
      (task) => task.name !== taskToDelete.name
    );
    setTasksBySection({
      ...tasksBySection,
      [sectionTitle]: updatedTasks,
    });
  };

  // Function to delete a section
  const handleDeleteSection = (sectionTitle) => {
    const updatedSections = sections.filter(
      (section) => section !== sectionTitle
    );
    setSections(updatedSections);

    const updatedTasks = { ...tasksBySection };
    delete updatedTasks[sectionTitle];
    setTasksBySection(updatedTasks);
  };

  // Handle the task drop
  const handleDrop = (task, destinationSection) => {
    const sourceSection = task.sourceSection;

    // Remove the task from the source section
    const updatedSourceTasks = tasksBySection[sourceSection].filter(
      (t) => t.name !== task.name
    );

    // Add the task to the destination section
    const updatedDestinationTasks = [
      ...tasksBySection[destinationSection],
      task,
    ];
    let newDestinationTasks = [];
    for (let ele of updatedDestinationTasks) {
      console.log(ele);
      const stringifiedEle = JSON.stringify(ele);
      console.log(stringifiedEle);

      try {
        const parsedEle = JSON.parse(stringifiedEle);

        if (
          !newDestinationTasks.some(
            (task) => JSON.stringify(task) === stringifiedEle
          )
        ) {
          newDestinationTasks.push(parsedEle);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }

    setTasksBySection({
      ...tasksBySection,
      [sourceSection]: updatedSourceTasks,
      [destinationSection]: newDestinationTasks,
    });
  };

  return (
    <div className="board">
      {sections?.map((section, index) => (
        <Section
          key={index}
          title={section}
          tasks={tasksBySection[section]}
          onDeleteTask={handleDeleteTask}
          onDeleteSection={handleDeleteSection}
          onDrop={handleDrop} // Pass the drop handler
        />
      ))}
      <AddSectionButton
        onAddSection={(title) => setSections([...sections, title])}
      />
    </div>
  );
};

export default Board;
