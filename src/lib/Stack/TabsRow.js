import React, {useState} from "react"
import Cross from "../Cross"

export default function TabsRow({ ogcData, creatorData, commData, setSelectedTab, selectedTab}) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [isVisible, setIsVisiblie ] = useState(false)

  const handleVisibility = () => {
    setIsVisiblie(!isVisible)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const communityExists = commData.length > 0
  const ogcExists = ogcData.length > 0
  const creatorExists = creatorData.length > 0

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName)
  }

  return (
    <>
    <div className="flex pr-5 border-b">
    
      <div className="Darkblock-tab-container">
        {creatorExists && (
          <button
            className={`Darkblock-upgrade-add-content ${selectedTab === "By Creator" ? "active" : ""}`}
            onClick={() => handleTabClick("By Creator")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.69025 11.7623L1.97284 11.3709C1.81671 11.3383 1.69181 11.2539 1.59813 11.1178C1.50446 10.9817 1.46803 10.8323 1.48884 10.6696L1.66058 8.82675L0.489624 7.42419C0.385539 7.30459 0.333496 7.16325 0.333496 7.00016C0.333496 6.83708 0.385539 6.69573 0.489624 6.57613L1.66058 5.17358L1.48884 3.33069C1.46803 3.1676 1.50446 3.01799 1.59813 2.88187C1.69181 2.74575 1.81671 2.66159 1.97284 2.62941L3.69025 2.238L4.59579 0.639739C4.67906 0.498396 4.79355 0.40598 4.93927 0.362489C5.08499 0.318999 5.23071 0.324436 5.37643 0.378798L7.00016 1.09638L8.62389 0.378798C8.76961 0.324436 8.91533 0.318999 9.06105 0.362489C9.20677 0.40598 9.32127 0.498396 9.40454 0.639739L10.3101 2.238L12.0275 2.62941C12.1836 2.66203 12.3085 2.74618 12.4022 2.88187C12.4959 3.01756 12.5323 3.16716 12.5115 3.33069L12.3397 5.17358L13.5107 6.57613C13.6148 6.69573 13.6668 6.83708 13.6668 7.00016C13.6668 7.16325 13.6148 7.30459 13.5107 7.42419L12.3397 8.82675L12.5115 10.6696C12.5323 10.8327 12.4959 10.9823 12.4022 11.1185C12.3085 11.2546 12.1836 11.3387 12.0275 11.3709L10.3101 11.7623L9.40454 13.3606C9.32127 13.5019 9.20677 13.5943 9.06105 13.6378C8.91533 13.6813 8.76961 13.6759 8.62389 13.6215L7.00016 12.9039L5.37643 13.6215C5.23071 13.6759 5.08499 13.6813 4.93927 13.6378C4.79355 13.5943 4.67906 13.5019 4.59579 13.3606L3.69025 11.7623ZM5.90727 8.85936C6.02176 8.97896 6.16748 9.03876 6.34443 9.03876C6.52137 9.03876 6.66709 8.97896 6.78158 8.85936L9.43576 6.08687C9.56066 5.9564 9.62311 5.80158 9.62311 5.6224C9.62311 5.44322 9.56066 5.28818 9.43576 5.15727C9.31086 5.0268 9.16243 4.96157 8.99048 4.96157C8.81853 4.96157 8.67032 5.0268 8.54583 5.15727L6.34443 7.45681L5.43888 6.52721C5.31398 6.40761 5.16555 6.35042 4.99361 6.35564C4.82166 6.36086 4.67864 6.42348 4.56457 6.54352C4.45007 6.66312 4.39283 6.81533 4.39283 7.00016C4.39283 7.185 4.45007 7.33721 4.56457 7.45681L5.90727 8.85936Z" />
            </svg>
            By Creator
          </button>
        )}
        {ogcExists && (
          <button
            className={`Darkblock-upgrade-add-content ${selectedTab === "By Owner" ? "active" : ""}`}
            onClick={() => handleTabClick("By Owner")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.00016 7.00016C8.8335 7.00016 10.3335 5.50016 10.3335 3.66683C10.3335 1.8335 8.8335 0.333496 7.00016 0.333496C5.16683 0.333496 3.66683 1.8335 3.66683 3.66683C3.66683 5.50016 5.16683 7.00016 7.00016 7.00016ZM7.00016 7.8335C3.5835 7.8335 0.333496 10.0002 0.333496 12.0002C0.333496 13.6668 7.00016 13.6668 7.00016 13.6668C7.00016 13.6668 13.6668 13.6668 13.6668 12.0002C13.6668 10.0002 10.4168 7.8335 7.00016 7.8335Z"
                fill="currentColor"
              />
            </svg>
            By Owner
          </button>
        )}
        {communityExists && (
          <button
            className={`Darkblock-upgrade-add-content ${selectedTab === "By Community" ? "active" : ""}`}
            onClick={() => handleTabClick("By Community")}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9.16671C20 9.66671 19 10 17.8333 10.1667C17.0833 8.75004 15.5833 7.66671 13.8333 6.91671C14 6.66671 14.1667 6.50004 14.3333 6.25004H15C17.5833 6.16671 20 7.75004 20 9.16671ZM5.66667 6.16671H5C2.41667 6.16671 0 7.75004 0 9.16671C0 9.66671 1 10 2.16667 10.1667C2.91667 8.75004 4.41667 7.66671 6.16667 6.91671L5.66667 6.16671ZM10 7.00004C11.8333 7.00004 13.3333 5.50004 13.3333 3.66671C13.3333 1.83337 11.8333 0.333374 10 0.333374C8.16667 0.333374 6.66667 1.83337 6.66667 3.66671C6.66667 5.50004 8.16667 7.00004 10 7.00004ZM10 7.83337C6.58333 7.83337 3.33333 10 3.33333 12C3.33333 13.6667 10 13.6667 10 13.6667C10 13.6667 16.6667 13.6667 16.6667 12C16.6667 10 13.4167 7.83337 10 7.83337ZM14.75 5.33337H15C16.4167 5.33337 17.5 4.25004 17.5 2.83337C17.5 1.41671 16.4167 0.333374 15 0.333374C14.5833 0.333374 14.25 0.416708 13.9167 0.583374C14.5833 1.41671 15 2.50004 15 3.66671C15 4.25004 14.9167 4.83337 14.75 5.33337ZM5 5.33337H5.25C5.08333 4.83337 5 4.25004 5 3.66671C5 2.50004 5.41667 1.41671 6.08333 0.583374C5.75 0.416708 5.41667 0.333374 5 0.333374C3.58333 0.333374 2.5 1.41671 2.5 2.83337C2.5 4.25004 3.58333 5.33337 5 5.33337Z" fill="#737373"/>
            </svg>

           Community
          </button>
        )}
        </div>
     {/* <div className="flex flex-row-reverse w-1/4">
      <div className="Darkblock-upgrade-add-content">
      <button onClick={toggleModal}>Actions</button>
      {isOpen && (
        <div className="darkblock-dropdown-content">
          <div className="darkblock-title-menu">Title </div>
          <button className="darkblock-elipsis-cross-button" onClick={toggleModal}>
                  <Cross />
                </button>

          <button className="Darkblock-BodyText darkblock-box-menu darkblock-cursor-pointer" onClick={handleVisibility}>Show/Hide</button>
        
        </div>
      )}
    </div>
      </div> */}
      </div>
    </>
  )
}
