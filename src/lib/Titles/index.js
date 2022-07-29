
import React from "react"
import './Titles.css'
export default function Titles () {
  return (
    <div className='tHeader'>
      <div className='rowheader'>
        <span scope='col' className='name-header'>
          Name
        </span>
        <span scope='col' className='format-header'>
          File Size
        </span>
        <span scope='col' className='format-date'>
          Date Added
        </span>
        <span scope='col' className='format-icon'></span>
      </div>
    </div>
  )
}
