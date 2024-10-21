import React, { useState } from 'react';
import Board from './components/Board';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCog, faDownload } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>

      {/* Top Right Container */}
      <div className="top-right-container">
        {/* Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-box"
          />
        </div>

        {/* Settings Icon */}
        <div className="icon-container">
          <FontAwesomeIcon icon={faCog} className="top-icon" title="Settings" />
        </div>

        {/* Download Icon */}
        <div className="icon-container">
          <FontAwesomeIcon
            icon={faDownload}
            className="top-icon"
            title="Download"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <Board searchQuery={searchQuery} />
    </div>
  );
}

export default App;
