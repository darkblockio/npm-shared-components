import React from "react"
import "./emptyTable.css"

const EmptyElement = () => {
  return (
    <div className="Darkblock-EmptyElement">
      <div className="Darkblock-EmptyElementDiv"></div>
    </div>
  )
}

const EmptyNameElement = () => {
  return (
    <div className="Darkblock-EmptyNameElement">
      <div className="Darkblock-EmptyNameElement1"></div>
      <div className="Darkblock-EmptyNameElement2"></div>
    </div>
  )
}

const EmptyRow = () => {
  return (
    <tr className="Darkblock-EmptyRowContainer">
      <td>
        <EmptyNameElement />
      </td>
      <td className="Darkblock-EmptyDataCell ">
        <EmptyElement />
      </td>
      <td className="Darkblock-EmptyDataCell">
        <EmptyElement />
      </td>
      <td className="Darkblock-EmptyDataCellLast">
        <EmptyElement />
      </td>
    </tr>
  )
}

const EmptyTable = () => {
  return (
    <table>
      <tbody className="Darkblock-EmptyTableContainer">
        <tr className="Darkblock-EmptyTableRow">
          <th scope="col" className="">
            <EmptyElement />
          </th>
          <th scope="col" className="Darkblock-EmptyTableColumn">
            <EmptyElement />
          </th>
          <th scope="col" className="Darkblock-EmptyTableColumn">
            <EmptyElement />
          </th>
          <th scope="col" className="Darkblock-EmptyDataCellLast">
            <EmptyElement />
          </th>
        </tr>
        <EmptyRow />
        <EmptyRow />
        <EmptyRow />
        <EmptyRow />
      </tbody>
    </table>
  )
}

export default EmptyTable
