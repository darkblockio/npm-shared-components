import React from "react"

const DetailModal = ({ db, open, onClose }) => {
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)

  return (
    <>
      {open ? (
        <>
          <div className="darkblock-modal-container">
            <div
              id="darkblock-modal-bg"
              onClick={() => onClose(true)}
            >
              <div id="darkblock-modal-box">
                <div className="darkblock-modal-box-container">
                  <div id="darkblock-modal-box">
                    <div className="darkblock-modal-first-row">
                      <div className="darkblock-modal-first-row-container"></div>
                      <div className="darkblock-modal-title">Details</div>
                      <img className='darkblock-cross-button' src="https://img.icons8.com/ios/50/000000/multiply.png" />
                    </div>
                    <hr className="darkblock-divider" />
                    <div className="darkblock-detail-container">
                      <div className="darkblock-modal-name">{db.name}</div>
                      <div className="darkblock-modal-detail">{db.details}</div>
                      <div className="darkblock-detail-subtitle">Size: </div>
                      <div className="darkblock-detail-subtitle-text">{db.fileSize}</div>
                      <div className="darkblock-detail-subtitle">File Type: </div>
                      <div className="darkblock-detail-subtitle-text">{fileFormat}</div>
                      <div className="darkblock-detail-subtitle">
                        Date Added:
                      </div>
                      <div className="darkblock-detail-subtitle-text">
                        {d.toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </div>

                      <div className="darkblock-detail-subtitle">Arweave TX: </div>
                      <div className="darkblock-detail-subtitle-text">{db.arweaveTX}</div>

                    </div>
                    <div className="darkblock-button-container">
                      <button onClick={() => onClose(true)} className="darkblock-done-button">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default DetailModal
