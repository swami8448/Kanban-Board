import React, { useState } from 'react';
import './AddSectionButton.css';

const AddSectionButton = ({ onAddSection }) => {
  const [sectionTitle, setSectionTitle] = useState('');

  const handleAddSection = () => {
    const title = prompt("Enter Section Title");
    if (title) {
      setSectionTitle(title);
      onAddSection(title);
    }
  };

  return (
    <button className="add-section-btn" onClick={handleAddSection}>
      + Add Section
    </button>
  );
};

export default AddSectionButton;
