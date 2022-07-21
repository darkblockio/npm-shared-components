import React from "react"

const DetailModal = ({ db, open, onClose }) => {
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)

  return (
    <>
      {open ? (
        <>
          <div className="modal-container">
            <div
              id="modal-bg"
              onClick={() => onClose(true)}
            >
              <div id="modal-box">
                <div className="modal-box-container">
                  <div id="modal-box">
                    <div className="modal-first-row">
                      <div className="modal-first-row-container"></div>
                      <div className="modal-title">Details</div>
                      <img className='cross-button' src="https://img.icons8.com/ios/50/000000/multiply.png"/>
                    </div>
                    <hr className="my-4"/>
                    <div className="detail-container">
                      <div className="detail-darkblock-name">{db.name}</div>
                      <div className="detail-darkblock-detail">{db.details}</div>
                      <div className="detail-subtitle">Size: </div>
                      <div className="detail-subtitle-text">{db.fileSize}</div>
                      <div className="detail-subtitle">File Type: </div>
                      <div className="detail-subtitle-text">{fileFormat}</div>
                      <div className="detail-subtitle">
                        Date Added:
                      </div>
                      <div className="detail-subtitle-text">
                        {d.toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </div>
                        
                      <div className="detail-subtitle">Arweave TX: </div>
                      <div className="detail-subtitle-text">{db.arweaveTX}</div>
                      
                    </div>
                    <div className="button-container">
                        <button onClick={() => onClose(true)} className="done-button">
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
