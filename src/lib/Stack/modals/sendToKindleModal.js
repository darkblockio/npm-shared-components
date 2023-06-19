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
  faEnvelope,
  faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons'; // import the envelope icon


const SendToKindleModal = ({ open, onClose, url, walletAddress }) => {
  const [screen, setScreen] = useState(window.innerHeight);
  const [modal, setModal] = useState(null);
  const [registered, setRegistered] = useState(true);
  const [emailAddress, setEmailAddress] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const [webShareAvailable, setWebShareAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResSuccess, setApiResSuccess] = useState(null);

  const handleClose = () => {
    // Reset state variables
    setRegistered(true);
    setEmailAddress('');
    setQrVisible(false);
    setWebShareAvailable(false);
    setLoading(false);
    setApiResSuccess(null);

    // Call onClose prop function
    onClose();
  };

  useEffect(() => {
    if (navigator.share) {
      setWebShareAvailable(true);
    } else {
      setQrVisible(true);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector("darkblock-modal-box")) {
        const boxModal = document.getElementById("darkblock-modal-box").clientHeight;
        setModal(boxModal);
      }
    }, 100);
  }, []);

  const sendFetch = async (url, walletAddress) => {
    // for testing purposes
    // remove for production build
    if (registered) {
      setRegistered(false);
      return;
    }
    // for testing purposes

    setLoading(true);
    const encodedUrl = encodeURIComponent(url);

    try {
      const response = await fetch("https://dev1.darkblock.io/v1/kindle/send-to-kindle", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `wallet_address=${walletAddress}&asset=${encodedUrl}`,
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (data.message === 'Email sent successfully') {
        setApiResSuccess(true);
      }
      if (data.message === 'registration request') {
        setRegistered(false);
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

                  {loading ? (
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
                  ) : apiResSuccess ? (
                    <>
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
                    </>
                  ) : !registered ? (
                    <>



                      <RegistrationSteps
                        url={url}
                        walletAddress={walletAddress}
                        handleClose={handleClose}
                      />
                    </>
                  ) : (
                    <>

                      <h1 className="Darkblock-RegCardItem">Select your preferred method</h1>

                      <Card
                        name="Connect your Kindle email address"
                        subname="One-time setup."
                        description="Receive your Darkblock ePub or PDF files via your Kindle email address which automatically adds the file to all your Kindle devices and apps."
                        buttonName="Connect Email"
                        buttonFunc={() => sendFetch(url, walletAddress)}
                        icon={faPaperPlane}
                      />
                      {qrVisible ? (    
                        <>         
                      <Card
                        name="Share to the Kindle App"
                        subname="Kindle mobile app required."
                        description="Download your Darkblock ePub or PDF files and add them to your Kindle app. If you don’t have it installed, you can download it from this device’s app store."
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
                        name='Scan QR code to share to Kindle mobile app'
                        subname="Kindle mobile app required."
                        description="Download your Darkblock ePub or PDF files and add them to your Kindle app. If you don’t have it installed, you can download it from this device’s app store."
                        buttonName="Share Now"
                        buttonFunc={() => handleShareClick()}
                        icon={faQrcode}
                        url={url}
                        qrVisible={qrVisible}
                        walletAddress={walletAddress}
                      />
                      </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );

};

export default SendToKindleModal;
