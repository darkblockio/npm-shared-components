import React from "react"

const DetailModal = ({ db, open, onClose }) => {
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)

  return (
    <>
      {open ? (
        <>
          <div className="db-modal-container">
            <div
              id="db-modal-bg"
              onClick={() => onClose(true)}
            >
              <div id="db-modal-box">
                <div className="db-modal-box-container">
                  <div id="db-modal-box">
                    <div className="db-modal-first-row">
                      <div className="db-modal-first-row-container"></div>
                      <div className="db-modal-title">Details</div>
                      <img className='db-cross-button' src="https://img.icons8.com/ios/50/000000/multiply.png" />
                    </div>
                    <hr className="db-divider" />
                    <div className="db-detail-container">
                      <div className="db-darkblock-name">{db.name}</div>
                      <div className="db-darkblock-detail">{db.details}</div>
                      <div className="db-detail-subtitle">Size: </div>
                      <div className="db-detail-subtitle-text">{db.fileSize}</div>
                      <div className="db-detail-subtitle">File Type: </div>
                      <div className="db-detail-subtitle-text">{fileFormat}</div>
                      <div className="db-detail-subtitle">
                        Date Added:
                      </div>
                      <div className="db-detail-subtitle-text">
                        {d.toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </div>

                      <div className="db-detail-subtitle">Arweave TX: </div>
                      <div className="db-detail-subtitle-text">{db.arweaveTX}</div>

                    </div>
                    <div className="db-button-container">
                      <button onClick={() => onClose(true)} className="db-done-button">
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
