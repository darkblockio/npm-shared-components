import React, {useState} from "react"
import "./Titles.css"
import "../../i18n"
import { useTranslation } from "react-i18next"
import { RenderEllipsisIcon, RenderIcon } from "../Stack/AuxFunctions"
import Cross from "../Cross"



const Titles = ({ getFilteredData }) => {
  const db = getFilteredData().length
  const { t } = useTranslation()
  const [ isOpen, setIsOpen ] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  


  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }


  //THis needs to be adjusted to grab all hidden darkblocks
  const combinedData = `Arweave TX: ${db.arweaveTX}, NFT ID: ${db.nftId}`;

  const toggleVisibility = async (isVisible) => {
    const status = isVisible ? "hidden" : "visible"
    
    const response = await fetch(
      //"https://dev1.darkblock.io/v1/darkblock/update/status?apikey=hcwmyaeyetmgcbkksr9nmdyeg9c4",
      "https://api.darkblock.io/v1/darkblock/update/status?apikey=hcwmyaeyetmgcbkksr9nmdyeg9c4",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: db.id, //check where this is coming from
          status: status,
          nft_id: db.nft_id,
          platform: state.context.platform, //check that this is correct
        }),
      }
      )
     
    const data = await response.json()
    
    if (data.message === "Operation Successful") {
      // Update the UI to reflect the new status 
      setIsVisible(!isVisible)
      
    } else {
      "Sorry we couldn't hide this darkblock"
    }
  }
 


  return (
    <div className="Darkblock-rowheader Darkblock-TableHeaderText">
      <div className="Darkblock-name-header">
        <span>{`${db} `}</span>
        <span className="Darkblock-name-header-items-count">{db > 1 ? t("titles.items") : t("titles.item")}</span>
      </div>
      <div className="Darkblock-items-header">
        <div className="Darkblock-format-header"></div>
        <div className="Darkblock-format-header">{t("titles.fileSize")}</div>
        <div className="Darkblock-format-date">{t("titles.dateAdded")}</div>
        <div className="Darkblock-format-icon">
      <div className="darkblock-toggleBtn-show-hide" onClick={toggleModal}>
        <div className="darkblock-toggle-container">
      <button className="darkblock-toggle-show-hide">
                <RenderEllipsisIcon className="darkblock-ellipsis-icon" filetype={"ellipsis"} />
              </button>
     </div>
      {isOpen ? (
        <>
          <div className="darkblock-modal-container-show-hide">
            <div  >
              <div id="darkblock-modal-box-show-hide">
                <div className="darkblock-modal-first-row-show-hide">
                  <div className="darkblock-modal-first-row-container">
                  <button onClick={toggleVisibility} className="darkblock-modal-title">{t("elipsis.showHide")}</button>
                  <button className="darkblock-cross-button-show-hide" >
                    <Cross />
                  </button>
                  </div>
                </div>
               
        
               
              </div>
            </div>
          </div>
        </>
      ) : null}



     
         </div>
         </div>
        
      </div>
    </div>
    
  )
}

export default Titles
