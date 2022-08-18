
import React from 'react'

const Minter = ({ state, progress, mintingStateMsg }) => {
    return (
        <div className="upgrade-modal-container">
            <div id="upgrade-modal-bg">
                <div>
                    {state === "starting" && (
                        <>
                            <div className="minting-container">
                                <h3 className="minting-header-text">Your unlockable content is being created...</h3>
                                <div>
                                    <video autoPlay playsInline loop className="minting-video-loop">
                                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="minting-progress-container">
                                    <div className="minting-progress-bar" style={{ width: `${progress}%` }}>
                                        {progress}%
                                    </div>
                                </div>
                                <div className="minting-state-msg">{mintingStateMsg}</div>
                                <div className="minting-warning-container">
                                    <p className="minting-warning">
                                        Please DO NOT close this page until this process is finished. Depending on the file size and
                                        your internet connection the upload time may take up to a few minutes.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    {state === "complete" && (
                        <>
                            <div className="minting-container">
                                <h3 className="minting-header-text">Your unlockable content has been created</h3>
                                <div>
                                    <video className="minting-video-loop">
                                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                                    </video>
                                </div>
                                <button
                                    className="minting-complete-add-another"
                                    onClick={() => {
                                        clearForm()
                                        setMintingState("starting")
                                        setMinting(false)
                                        setOpen(false)
                                        reset()
                                    }}
                                >
                                    Make Another
                                </button>
                                <button
                                    className="minting-complete-done"
                                    onClick={() => {
                                        clearForm()
                                        setMintingState("starting")
                                        setMinting(false)
                                        setOpen(false)
                                        reset("finished")
                                        onClose(true)
                                    }}
                                >
                                    I&apos;m Done
                                </button>
                            </div>
                        </>
                    )}
                    {state === "error" && (
                        <>
                            <div className="minting-container">
                                <h3 className="minting-header-text">Error Trying to Upload File</h3>
                                <div>
                                    <video className="minting-video-loop">
                                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                                    </video>
                                </div>
                                <button
                                    className="minting-try-again"
                                    onClick={() => {
                                        setMintingState("starting")
                                        setMinting(false)
                                        setOpen(false)
                                        reset()
                                    }}
                                >
                                    Try Again
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Minter


