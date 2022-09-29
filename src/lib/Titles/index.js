import React from "react"
import "./Titles.css"

const Titles = ({ state }) => {
  const db = state.context.display.stack.length

  return (
    <tr className='db-rowheader'>
      <th scope='col' className='db-name-header'>
        <span>Name</span>
        <span> ({db})</span>
      </th>
      <th scope='col' className='db-format-header'>
        File Size
      </th>
      <th scope='col' className='db-format-date'>
        Date Added
      </th>
      <th scope='col' className='db-format-icon'>
        <span></span>
      </th>
    </tr>
  )
}

export default Titles
