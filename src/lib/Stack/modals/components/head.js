import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Head = ({ name, onClose }) => {
  return (
    <div 
      style={{ 
        height: '56px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottom: '1px solid #718096', // Corresponds to text-gray-500 in Tailwind
        position: 'relative' // Make this a positioning context
      }}
    >
      <p>{name}</p>
      <button 
        onClick={onClose} 
        style={{ 
          position: 'absolute', 
          right: '20px', 
          cursor: 'pointer' 
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

Head.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Head;
