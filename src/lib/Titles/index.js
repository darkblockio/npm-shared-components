import React from "react"
import "./Titles.css"

const Titles = ({ state }) => {
  const db = state.context.display.stack.length

  return (
    <tr className='rowheader'>
      <th scope='col' className='pl-3 text-left name-header`  '>
        <span>Name</span>
        <span> ({db})</span>
      </th>
      <th scope='col' className='pr-2 text-right format-header'>
        File Size
      </th>
      <th scope='col' className='text-left format-date'>
        Date Added
      </th>
      <th scope='col' className='format-icon'>
        <span></span>
      </th>
    </tr>
  )
}

export default Titles