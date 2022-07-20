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
                    <div className="flex justify-between">
                      <div className="flex"></div>
                      <div className="flex justify-center items-center font-bold">Details</div>
                      <img className='w-6 h-6 justify-end cursor-pointer' src="https://img.icons8.com/ios/50/000000/multiply.png"/>
                    </div>
                    <hr className="my-4"/>
                    <div className="px-2 block w-4/5">
                      <div className="text-xl font-bold">{db.name}</div>
                      <div className="mt-8 text-sm text-gray-500 max-w-lg">{db.details}</div>
                      <div className="text-md mt-6 font-bold">Size: </div>
                      <div className="text-sm flex-start text-gray-500">{db.fileSize}</div>
                      <div className="text-md mt-6 font-bold">File Type: </div>
                      <div className="text-sm flex-start text-gray-500">{fileFormat}</div>
                      <div className="text-md mt-6 font-bold">
                        Date Added:
                      </div>
                      <div className="text-sm flex-start text-gray-500">
                        {d.toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </div>
                        
                      <div className="text-md mt-6 font-bold">Arweave TX: </div>
                      <div className="text-sm flex-start text-gray-500">{db.arweaveTX}</div>
                      
                    </div>
                    <div className="float-right mt-4">
                        <button onClick={() => onClose(true)} className="bg-gray-800 text-white rounded-lg p-2 w-20 m-4 mt-6">
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
