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
        border: '1px solid #718096', 
        maxWidth: '480px',
        width: '100%',
        margin: '0 auto', 
        padding: '20px', 
        boxSizing: 'border-box', 
        position: 'relative', 
        paddingBottom: qrVisible ? '20px' : '60px',
        marginBottom: '20px' 
      }}
    >
     
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {icon && <FontAwesomeIcon icon={icon} />}
            <h2 style={{marginLeft: "10px", marginBottom: "10px" }}>{name}</h2>
          </div>
          <h3 style={{marginBottom: ""}}>{subname}</h3>
          <p className="Darkblock-BodyText">{description}</p>
          {qrVisible ? (
        <QRCode
          style={{ marginTop: "20px" }}
          value={`https://staging.darkblock.io/share?url=${encodeURIComponent(
            url
          )}&walletAddress=${walletAddress}`}
        />
      ) : (
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
          )}
        </>
      
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
