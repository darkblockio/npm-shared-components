import React, { useState, useEffect } from "react";
import Head from "./components/head";
import Card from "./components/card";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import the qr icon from the free solid svg icons
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RegistrationSteps from "./components/registrationSteps";
import {
  faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons'; // import the envelope icon


const SendToKindleModal = ({ open, onClose, url, walletAddress, db }) => {
  const [screen, setScreen] = useState(window.innerHeight);
  const [modal, setModal] = useState(null);
  const [registered, setRegistered] = useState(true);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const [webShareAvailable, setWebShareAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResSuccess, setApiResSuccess] = useState(null);
  const [downloadable, setDownloadable] = useState(false);
  const handleClose = () => {
    // Reset state variables
    // setRegistered(true);
    setEmailAddress('');
    // setDownloadable(false);
    // setQrVisible(false);
    // setWebShareAvailable(false);
    setLoading(false);
    setApiResSuccess(null);

    // Call onClose prop function
    onClose();
  };

  useEffect(() => {
    
    if (db.downloadable.toString().toLowerCase() === "true") {

      setDownloadable(true);
    } else {
      setDownloadable(false);
    }
    if (navigator.share) {
      setWebShareAvailable(true);
    } else {
      setQrVisible(true);
    }
  }, [db]);

  

  

  const checkRegistered = async () => {
    // endpoint to check if user is registered - https://api.darkblock.io/v1/kindle/is-registered?wallet_address=<wallet_address>
    // if registered, setRegistered(true)

    fetch(`https://api.darkblock.io/v1/kindle/is-registered?wallet_address=${walletAddress.toLowerCase()}`)
      .then(response => response.json())
      .then(data => {
        
        // example response: {"message":"wallet is registered","email_address":"darriulfsson@kindle.com","is_wallet_registered":true}
        if (data.is_wallet_registered) {
          setShowUpdateEmail(true);
          setEmailAddress(data.email_address);
        } else {
          setRegistered(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      checkRegistered();
      if (document.querySelector("darkblock-modal-box")) {
        const boxModal = document.getElementById("darkblock-modal-box").clientHeight;
        setModal(boxModal);
      }
    }, 100);
  }, []);


  const sendFetch = async (url, walletAddress) => {
    // for testing purposes
    // remove for production build
    // if (registered) {
    //   setRegistered(false);
    //   return;
    // }
    // for testing purposes

    setLoading(true);
    const encodedUrl = encodeURIComponent(url);

    try {
      const response = await fetch("https://api.darkblock.io/v1/kindle/send-to-kindle", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `wallet_address=${walletAddress.toLowerCase()}&asset=${encodedUrl}`,
      });

      const data = await response.json();
      
      setLoading(false);
      if (data.message === 'Email sent successfully') {
        setApiResSuccess(true);
      }
      if (data.message === 'registration request') {
        // setRegistered(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };



  const generateQr = () => {
    setQrVisible(true);
  };

  const shareViaWebShare = async () => {
    if (!navigator.share) {
      console.log("Web Share API not available.");
      return;
    }

    try {
      await navigator.share({
        title: 'Darkblock', // Update as per your requirements
        url: url
      });
    } catch (err) {
      console.log("Web Share API Error: ", err);
    }
  };

  const handleShareClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && webShareAvailable) {
      shareViaWebShare();
    } else {
      generateQr();
    }
  };


  return (
    <>
      {open ? (
        <>
          <div className="darkblock-modal-container">
            <div
              id={`darkblock-modal-bg-${screen >= modal ? "center" : "start"}`}
            >
              <div id="darkblock-modal-root">
                <Head name={"Send to Kindle"} onClose={handleClose} />


                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto',
                      maxWidth: '512px',
                      padding: '16px', // changed this from margin to padding
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ) : apiResSuccess ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto',
                        maxWidth: '512px',
                        padding: '16px', // changed this from margin to padding
                      }}
                    >
                      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ marginBottom: "20px", color: "#00FF00", fontSize: "40px", marginTop: "20px" }} />
                        <h1 style={{ marginBottom: "20px" }} className="Darkblock-H1">Your ebook has been successfully sent to your Kindle!</h1>
                        <p1 style={{ marginBottom: "20px" }} className="Darkblock-P1">You can now access it in the Kindle app or on any of your Kindle devices.</p1>
                        <button
                          className='Darkblock-primary-button'
                          style={{
                            padding: '0.5rem 1rem', marginLeft: '1rem',
                            borderRadius: '0.5rem',
                          }}
                          variant="primary"
                          size="medium"
                          layout="auth"
                          onClick={handleClose}>Done</button>
                      </div>
                    </div>
                  </>
                ) : !registered ? (
                  <>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'left',
                        textAlign: 'left',
                        margin: '0 auto',
                        maxWidth: '512px',
                        padding: '16px', // changed this from margin to padding
                      }}
                    >

                      <RegistrationSteps
                        url={url}
                        walletAddress={walletAddress}
                        handleClose={handleClose}
                      />
                    </div>
                    </>
                    ) : (
                    <>

                      <h1 style={{ margin: '32px 32px 0 32px'}} className="Darkblock-RegCardItem Darkblock-H1 ">Select your preferred method</h1>
                      <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto',
                        maxWidth: '512px',
                        padding: '16px', // changed this from margin to padding
                      }}
                    >
                      <Card
                        name="Send to Kindle via email"
                        subname="This will send the file to all your Kindle devices and apps."
                        description=""
                        buttonName="Send to my Kindle email"
                        buttonFunc={() => sendFetch(url, walletAddress)}
                        icon={faPaperPlane}
                        showUpdateEmail={showUpdateEmail}
                        emailAddress={emailAddress}
                        walletAddress={walletAddress}
                      />
                      {downloadable && (
                      !qrVisible ? (
                        <>
                          <Card
                            name="Share to Kindle mobile app"
                            subname=""
                            description="Kindle mobile app required."
                            buttonName="Share Now"
                            buttonFunc={() => handleShareClick()}
                            icon={faArrowUpFromBracket}
                            url={url}
                            qrVisible={qrVisible}
                            walletAddress={walletAddress}
                            
                          />
                        </>
                      ) : (
                        <>
                          <Card
                            name='Scan to Kindle'
                            subname="Kindle mobile app required."
                            description="Scan the QR code to share the file directly to the Kindle App on your phone/tablet."
                            buttonName="Share Now"
                            buttonFunc={() => handleShareClick()}
                            icon={faQrcode}
                            url={url}
                            qrVisible={qrVisible}
                            walletAddress={walletAddress}
                          />
                        </>
                      )
                      )}
                       </div>
                    </>
                )}
                 
              </div>
            </div>
          </div>
        </>
      ) : null
      }
    </>
  );

};

export default SendToKindleModal;
