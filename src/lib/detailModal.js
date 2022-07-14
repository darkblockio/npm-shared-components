import React from "react"

const DetailModal = ({ db, open, onClose }) => {
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)

  return (
    <>
      {open ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 m-4 outline-none focus:outline-none">
            <div
              id="modal-bg"
              className="fixed inset-0 z-30 flex items-center justify-center overflow-auto bg-black bg-opacity-70"
              onClick={() => onClose(true)}
            >
              <div id="modal-box">
                <div className="fixed inset-0 z-30 flex items-center justify-center overflow-auto bg-black bg-opacity-70">
                  <div id="modal-box" className="max-w-3xl px-6 py-4 text-left bg-white rounded shadow-lg mx-8">
                    <div className="mx-auto block w-2/3">
                      <p>Title: {db.name}</p>
                      <p>File Type: {fileFormat}</p>
                      <p>
                        Date Added:{" "}
                        {d.toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </p>
                      <p>Areweave TX: {db.arweaveTX}</p>
                      <p className="float-right">
                        <button onClick={() => onClose(true)} className="bg-gray-800 text-white p-2 m-3">
                          Done
                        </button>
                      </p>
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
