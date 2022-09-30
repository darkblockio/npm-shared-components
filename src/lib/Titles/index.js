import React from "react"
import "./Titles.css"

const Titles = ({ state }) => {
  const db = state.context.display.stack.length

  return (
    <tr className='Darkblock-rowheader'>
      <th scope='col' className='Darkblock-name-header'>
        <span>Name</span>
        <span> ({db})</span>
      </th>
      <th scope='col' className='Darkblock-format-header'>
        File Size
      </th>
      <th scope='col' className='Darkblock-format-date'>
        Date Added
      </th>
      <th scope='col' className='Darkblock-format-icon'>
        <span></span>
      </th>
    </tr>
  )
}

export default Titles
