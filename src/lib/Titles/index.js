import React from "react"
import "./Titles.css"

const Titles = ({ state }) => {
  const db = state.context.display.stack.length

  return (
    <table className='tableContainer'>
      <tbody>
        <tr className='rowheader'>
          <td scope='col' className='name-header`  '>
            <span>Name</span>
            <span> ({db})</span>
          </td>
          <td className='whitespace1'>
            <span></span>
          </td>
          <td className='whitespace2'>
            <span></span>
          </td>
          <td scope='col' className='format-header'>
            File Size
          </td>
          <td scope='col' className='format-date'>
            Date Added
          </td>
          <td scope='col' className='format-icon'></td>
          <td className='whitespace3'>
            <span></span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export default Titles
