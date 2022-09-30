
import React from 'react'

const Minter = ({ state, progress, mintingStateMsg }) => {
    return (
        <div className="Darkblock-upgrade-modal-container">
            <div id="Darkblock-upgrade-modal-bg">
                <div>
                    {state === "starting" && (
                        <>
                            <div className="Darkblock-minting-container">
                                <h3 className="Darkblock-minting-header-text">Your unlockable content is being created...</h3>
                                <div>
                                    <video autoPlay playsInline loop className="Darkblock-minting-video-loop">
                                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="Darkblock-minting-progress-container">
                                    <div className="Darkblock-minting-progress-bar" style={{ width: `${progress}%` }}>
                                        {progress}%
                                    </div>
                                </div>
                                <div className="Darkblock-minting-state-msg">{mintingStateMsg}</div>
                                <div className="Darkblock-minting-warning-container">
                                    <p className="Darkblock-minting-warning">
                                        Please DO NOT close this page until this process is finished. Depending on the file size and
                                        your internet connection the upload time may take up to a few minutes.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    {state === "complete" && (
                        <>
                            <div className="Darkblock-minting-container">
                                <h3 className="Darkblock-minting-header-text">Your unlockable content has been created</h3>
                                <div>
                                    <video className="Darkblock-minting-video-loop">
                                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                                    </video>
                                </div>
                                <button
                                    className="Darkblock-minting-complete-add-another"
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
                                    className="Darkblock-minting-complete-done"
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
                            <div className="Darkblock-minting-container">
                                <h3 className="Darkblock-minting-header-text">Error Trying to Upload File</h3>
                                <div>
                                    <video className="Darkblock-minting-video-loop">
                                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                                    </video>
                                </div>
                                <button
                                    className="Darkblock-minting-try-again"
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


