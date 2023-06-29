import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "../../../Button";
import QRCode from "qrcode.react";

const Card = ({ icon, name, subname, description, buttonFunc, buttonName, qrVisible, url, walletAddress, showUpdateEmail, emailAddress: initialEmailAddress }) => {
  const [showUpdateEmailModal, setShowUpdateEmailModal] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState(initialEmailAddress);
  
  useEffect(() => {
    setEmailAddress(initialEmailAddress);
  }, [initialEmailAddress]);

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleConfirm = () => {
    if (!newEmail.endsWith('@kindle.com')) {
      alert('Please enter a valid Kindle email address');
      return;
    }
    console.log('Confirm');
    handleSubmit();
  };

  const handleSubmit = async () => {
    console.log('Submit');
    try {
        // Here you'd call your API to update the email, using newEmail value
        const response = await fetch("https://api.darkblock.io/v1/kindle/register", {  // Change the API endpoint as needed
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `wallet_address=${walletAddress.toLowerCase()}&email_address=${newEmail}`,
        });

        // If the request is successful, close the modal and update the emailAddress state
        if (response.ok) {
            setShowUpdateEmailModal(false);
            setEmailAddress(newEmail);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
  };

  const updateEmail = () => {
    console.log("Update email");
    setShowUpdateEmailModal(true);
  }

  if (showUpdateEmailModal) {
    return (
        <div
            style={{
                borderRadius: '20px',
                border: '1px solid #718096',
                maxWidth: '480px',
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                paddingBottom: '20px',
                boxSizing: 'border-box',
                position: 'relative',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <div>
                <div className='Darkblock-RegCardItem' style={{ display: 'flex', alignItems: 'center' }}>
                    {/* {icon && <FontAwesomeIcon icon={icon} />} */}
                    <h2 style={{marginBottom: "auto", marginTop: "auto" }}>Update Email Address</h2>
                </div>
                <p className="Darkblock-BodyText Darkblock-RegCardItem">Your Kindle email address</p>
                <input 
                    type="email" 
                    value={newEmail} 
                    onChange={handleEmailChange} 
                    style={{
                      border: '1px solid gray', 
                      marginBottom: '20px', 
                      padding: '5px', 
                      width: '100%', 
                      borderRadius: '8px'
                    }}                    
                    placeholder="New email address"
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button onClick={() => setShowUpdateEmailModal(false)} variant="secondary" size="medium" layout="auth">Cancel</Button>
                <Button onClick={handleConfirm} variant="primary" size="medium" layout="auth">Save</Button>
            </div>
        </div>
    );
}


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
      <div className='Darkblock-RegCardItem' style={{ display: 'flex', alignItems: 'center' }}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <h2 style={{ marginLeft: "10px", marginBottom: "auto", marginTop: "auto" }}>{name}</h2>
      </div>
      <h3 className='Darkblock-RegCardItem' style={{ marginBottom: "" }}>{subname}</h3>
      <p className="Darkblock-BodyText">{description}</p>
      {showUpdateEmail && <><p className="Darkblock-BodyText">Email: {emailAddress}</p><p className="Darkblock-BodyText" style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={updateEmail}>Update Email</p></>}
      {qrVisible ? (
        <QRCode
          style={{ marginTop: "20px" }}
          value={`https://staging.darkblock.io/share?url=${encodeURIComponent(url)}&walletAddress=${walletAddress}`}
        />
      ) : (
        <div style={{ position: 'absolute', right: '20px', bottom: '20px' }}>
          <Button onClick={buttonFunc} variant="secondary" size="medium" layout="auth">{buttonName}</Button>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.object,  // FontAwesomeIcon prop type
  name: PropTypes.string.isRequired,
  subname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonFunc: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
  qrVisible: PropTypes.bool,
  url: PropTypes.string,
  walletAddress: PropTypes.string,
  showUpdateEmail: PropTypes.bool,
  emailAddress: PropTypes.string
};

export default Card;
