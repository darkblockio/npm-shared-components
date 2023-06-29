import React, { useState } from 'react';
import RegistrationStepCard from './registrationStepCard';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import step2Img from "../../../../assets/images/step2/step2.jpg";
import step3Img_1 from "../../../../assets/images/step3/step3-image-1.jpg"
import step3Img_2 from "../../../../assets/images/step3/step3-image-2.jpg"
import step3Img_3 from "../../../../assets/images/step3/step3-image-3.jpg"
import step3Img_4 from "../../../../assets/images/step3/step3-image-4.jpg"
import step3Img_5 from "../../../../assets/images/step3/step3-image-5.jpg"
import step3Img_6 from "../../../../assets/images/step3/step3-image-6.jpg"
import step4Img from "../../../../assets/images/step4/step4.jpg"


const RegistrationSteps = ({ url, walletAddress, handleClose }) => {
    const [emailAddress, setEmailAddress] = useState('Enter your Kindle email address');
    const [success, setSuccess] = useState(false);
    const [textToCopy, setTextToCopy] = useState('hello world');
    const [loading, setLoading] = useState(false);
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e.target.innerText);
        setTimeout(() => {
            alert('Copied to clipboard');
        }, 100);

    }
    const [disabled, setDisabled] = useState(true);
    const [steps, setSteps] = useState([
        // { 
        //     n: 1,
        //     name: 'Log in to Kindle', 
        //     active: true, 
        //     icon: faCircle, 
        //     components: [
        //         { type: 'p', content: 'Make sure you are logged in with your Amazon account on your Kindle app or device.' }
        //     ]
        // },
        {
            n: 1,
            name: 'Go to your Amazon Settings',
            active: true,
            icon: faCircle,
            components: [
                { type: 'p', content: 'Make sure you log in with the same account you use for Kindle.' },
                { type: 'a', href: "https://www.amazon.com/hz/mycd/myx#/home/settings/pdoc#pdoc", content: "Amazon settings" },
                { type: 'spacer', height: '20px' },
                { type: 'img', src: step2Img, alt: 'Amazon settings' }
            ]
        },
        {
            n: 2,
            name: 'Add the Darkblock email to the approved email list',
            active: false,
            icon: faCircle,
            components: [
                { type: 'p', content: 'Copy this email address and add it as a new approved email address (blue link under the list).' },
                { type: 'button', name: 'ebooks@searchles.com', onClick: copyToClipboard },
                { type: 'p', content: 'Scroll down to Approved Personal Document E-mail List.' },
                { type: 'img', src: step3Img_1, alt: 'Amazon settings' },
                { type: 'img', src: step3Img_2, alt: 'Amazon settings' },
                { type: 'p', content: 'Paste the email address provided above and click on “Add Address”.' },
                { type: 'img', src: step3Img_3, alt: 'Amazon settings' },
                { type: 'img', src: step3Img_4, alt: 'Amazon settings' },
                { type: 'p', content: 'Now the email should be added to the approved list.' },
                { type: 'img', src: step3Img_5, alt: 'Amazon settings' },
                { type: 'h3', content: 'Note:' },
                { type: 'p', content: 'If the ebook doesn’t show up in your Kindle, make sure to check if you got an email from Amazon requiring you to verify. If you did, just click on the “Verify Request” link.' },
                { type: 'img', src: step3Img_6, alt: 'Amazon settings' },
            ]
        },
        {
            n: 3,
            name: 'Provide your Send-to-Kindle E-Mail address',
            active: false,
            icon: faCircle,
            components: [
                { type: 'p', content: 'You can find your Kindle email addresses in the “Send-to-Kindle E-Mail Settings”' },
                { type: 'img', src: step4Img, alt: 'Amazon settings' },
                { type: 'p', content: 'Paste any one of your Kindle email address into the input field below:' },
                { type: 'h3', content: 'Kindle Email Address:' },
                { type: 'input', inputType: 'email', placeholder: emailAddress, onChange: e => setEmailAddress(e.target.value) }
            ]
        },

    ]);

    useEffect(() => {
        console.log(emailAddress);
        if (emailAddress !== 'Enter your Kindle email address') {
            setDisabled(false);
        }
    }, [emailAddress]);

    const confirmClickTest = () => {
        console.log('confirm click test');
        console.log(emailAddress);
    }




    const handleButtonClick = (n) => {
        // If next step is done, go to the next one where active is false
        const nextStepIndex = steps.findIndex(step => step.n === n + 1);

        if (nextStepIndex !== -1 && steps[nextStepIndex].active === 'done') {
            const nextActiveFalseStepIndex = steps.findIndex(step => step.n > n + 1 && step.active === false);

            setSteps(steps.map((step, index) => {
                if (step.n === n) {
                    return { ...step, active: 'done' };
                } else if (index === nextActiveFalseStepIndex) {
                    return { ...step, active: true };
                }
                return step;
            }));
        } else {
            setSteps(steps.map((step) => {
                if (step.n === n) {
                    return { ...step, active: 'done' };
                } else if (step.n === n + 1) {
                    return { ...step, active: true };
                }
                return step;
            }));
        }
    };


    const handleBackButtonClick = (n) => {
        setSteps(steps.map((step, index) => {
            if (step.n === n) {
                return { ...step, active: false };
            } else if (step.n === n - 1) {
                return { ...step, active: true };
            }
            return step;
        }));
    };

    const handleCardClick = (n) => {
        setSteps(steps.map((step) => {
            if (step.n === n) {
                return { ...step, active: true };
            } else if (step.active === 'done') {
                return step;  // Don't change status if it's 'done'
            } else {
                return { ...step, active: false };
            }
        }));
    };

    const sendRegistration = async () => {
        const encodedUrl = encodeURIComponent(url);
        setLoading(true);
        

        try {
            const response = await fetch("https://api.darkblock.io/v1/kindle/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `wallet_address=${walletAddress.toLowerCase()}&email_address=${emailAddress}&asset=${encodedUrl}`,
            });

            const data = await response.json();
            console.log(data);

            setLoading(false);
            // Check if registration was successful and update registered state
            if ((data.message === 'Registration successful') || (data.message === 'Email sent successfully')) {
                setSuccess(true);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleConfirm = () => {
        // if the email address does not end with @kindle, show error message
        if (!emailAddress.endsWith('@kindle.com')) {
            alert('Please enter a valid Kindle email address');
            return;
        }
        sendRegistration();
    };

    const handleCancel = () => {
        handleClose();
        // Insert cancel functionality here...
    };

    return (
        // conditional rendering based on success state (true/false)
        loading ? (<>
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
        </>) : (
            success ? (
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
            ) : (
                <>
                    <h1>Connect your Kindle email address</h1>
                    <p className="Darkblock-BodyText"
                    style={{ marginBottom: "20px" }}
                    >One-time setup.</p>
                    {/* <p
                        className="Darkblock-BodyText"
                        style={{ marginBottom: "20px" }}
                    >
                        After this easy setup you won’t need to do this again.
                    </p> */}
                    <div>
                        {Object.keys(steps).map((stepKey, index) => {
                            const step = steps[stepKey];

                            return (
                                <RegistrationStepCard
                                    key={index}
                                    step={step}
                                    active={step.active}
                                    buttonFunc={() => handleButtonClick(index + 1)}
                                    backButtonFunc={() => handleBackButtonClick(index + 1)}
                                    cardClickFunc={() => handleCardClick(index + 1)}
                                    totalSteps={Object.keys(steps).length}
                                />
                            );
                        })}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                className='Darkblock-secondary-button'
                                style={{
                                    padding: '0.5rem 1rem', marginLeft: '1rem',
                                    borderRadius: '0.5rem',
                                }}
                                size="medium"
                                layout="auth"
                                onClick={handleCancel}>Cancel</button>
                            <button
                                className='Darkblock-primary-button'
                                style={{
                                    padding: '0.5rem 1rem', marginLeft: '1rem',
                                    borderRadius: '0.5rem',
                                }}
                                variant="primary"
                                size="medium"
                                layout="auth"
                                disabled={disabled}
                                onClick={handleConfirm}>Confirm</button>
                        </div>
                    </div>
                </>
            )
        )
    );



};

export default RegistrationSteps;
