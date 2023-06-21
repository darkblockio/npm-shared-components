import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from "../../../Button";

const RegistrationStepCard = ({ step, active, buttonFunc, backButtonFunc, cardClickFunc, totalSteps }) => {
    const getOpacity = () => {
        if (active === 'done' || active === true) {
            return 1;
        } else {
            return 0.5;
        }
    }

    const getBorder = () => {
        if (active === 'done') {
            return '1px solid green';
        } else {
            return '1px solid #718096';
        }
    }

    const getIcon = () => {
        if (active === 'done') {
            return <FontAwesomeIcon icon={faCheck} color="green" />;
        } else {
            return (
                <div
                    style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        backgroundColor: 'black',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem'
                    }}
                >
                    {step.n}
                </div>
            );
        }
    };

    const renderButton = () => {
        if (active === true) {
            return (
                <>
                    <div
                        style={{
                            position: 'absolute',
                            right: '20px',
                            bottom: '20px',
                        }}
                    >
                        {step.n !== totalSteps && (
                            <Button
                                onClick={buttonFunc}
                                variant="secondary"
                                size="medium"
                                layout="auth"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                    {step.n > 1 && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '20px',
                                bottom: '20px',
                            }}
                        >
                            <Button
                                onClick={backButtonFunc}
                                variant="secondary"
                                size="medium"
                                layout="auth"
                            >
                                Back
                            </Button>
                        </div>
                    )}
                </>
            );
        }
        return null;
    };

    const cardClickHandler = () => {
        if (active === false || active === 'done') {
            cardClickFunc && cardClickFunc();
        }
    }


    const renderComponent = (component) => {
        switch (component.type) {
            case 'h1':
                return <h1 className='Darkblock-RegCardItem Darkblock-H1'>{component.content}</h1>
            case 'h2':
                return <h2 className='Darkblock-RegCardItem Darkblock-H2'>{component.content}</h2>
            case 'h3':
                return <h3 className='Darkblock-RegCardItem Darkblock-H3'>{component.content}</h3>
            case 'p':
                return <p className='Darkblock-RegCardItem Darkblock-BodyText'>{component.content}</p>
            case 'img':
                return <img style={{width: "280px"}} className='Darkblock-RegCardItem' src={component.src} alt={component.alt} />
            case 'a':
                return <a className='Darkblock-RegCardItem Darkblock-BodyText' style={{ textDecoration: 'underline' }} href={component.href} target="_blank" rel="noopener noreferrer">{component.content}</a>
            case 'input':
                return <input
                className='Darkblock-RegCardItem Darkblock-BodyText'
                    type={component.inputType}
                    placeholder={component.placeholder}
                    onChange={component.onChange}
                    style={{
                        border: '1px solid',
                        width: '100%',
                        boxSizing: 'border-box',
                        borderRadius: '5px',
                        padding: '5px',
                    }}
                />
            case 'button':
                return <button className='Darkblock-RegCardItem Darkblock-secondary-button' style={{ padding: '5px', borderRadius: '0.5rem', }} onClick={component.onClick} variant={component.variant} size={component.size} layout={component.layout}>{component.name}</button>
            case 'spacer':
                return <div className='' style={{ height: component.height }}></div>
            default:
                return null;
        }
    }

    return (
        <div
            onClick={active !== true ? cardClickHandler : null}
            style={{
                cursor: active !== true ? 'pointer' : 'default',
                borderRadius: '20px',
                border: getBorder(),
                maxWidth: '480px',
                margin: '0 auto',
                padding: active === true ? '20px 20px 60px 20px' : '20px 0px 4px 28px',
                boxSizing: 'border-box',
                position: 'relative',
                opacity: getOpacity(),
                marginBottom: "20px"
            }}
        >
            <div className='Darkblock-RegCardItem' style={{ display: 'flex', alignItems: 'center' }}>
                {getIcon()}
                <h2 className='Darkblock-H2' style={{ marginLeft: "10px", marginBottom: "auto", marginTop: "auto" }}>{step.name}</h2>
            </div>
            {active === true && step.components.map((component, index) =>
                <div key={index}>
                    {renderComponent(component)}
                </div>
            )}
            {renderButton()}
        </div>
    );
};

RegistrationStepCard.propTypes = {
    step: PropTypes.object.isRequired,
    active: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    buttonFunc: PropTypes.func,
    backButtonFunc: PropTypes.func,
    cardClickFunc: PropTypes.func,
    totalSteps: PropTypes.number.isRequired
};

export default RegistrationStepCard;
