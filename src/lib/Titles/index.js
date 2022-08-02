
import React from "react"
import './Titles.css'
export default function Titles () {
  return (
    <thead>
      <tr className='rowheader'>
        <td scope='col' className='name-header'>
          Name
        </td>
        <td scope='col' className='format-header'>
          File Size
        </td>
        <td scope='col' className='format-date'>
          Date Added
        </td>
        <td scope='col' className='format-icon'></td>
      </tr>
    </thead>
  )
}
