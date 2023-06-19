import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "../../../Button";
import QRCode from "qrcode.react";


const Card = ({ icon, name, subname, description, buttonFunc, buttonName, qrVisible, url, walletAddress }) => {
  return (
    <div 
  style={{ 
    borderRadius: '20px',
    border: '1px solid #718096', // Corresponds to text-gray-500 in Tailwind
    maxWidth: '480px',
    width: '100%',
    margin: '0 auto', // Center the card horizontally
    padding: '20px', // Add some padding inside the card
    boxSizing: 'border-box', // To include the padding and border in the element's total width and height
    position: 'relative', // Make this a positioning context
    paddingBottom: '60px', // Make room for the button
    marginBottom: '20px' // Add some space between cards
  }}
>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <h2 style={{marginLeft: "10px", marginBottom: "10px" }}>{name}</h2>
      </div>
      <h3 style={{marginBottom: ""}}>{subname}</h3>
      <p className="Darkblock-BodyText">{description}</p>
      <div
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
        }}
      >
        <Button
          onClick={buttonFunc}
          variant="secondary"
          size="medium"
          layout="auth"
        >
          {buttonName}
        </Button>
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.object,  // FontAwesomeIcon prop type
  name: PropTypes.string.isRequired,
  subname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonFunc: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired
};

export default Card;
