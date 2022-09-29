import React from "react"
import "./emptyTable.css"

const EmptyElement = () => {
  return (
    <div className="EmptyElement">
      <div className="EmptyElementDiv"></div>
    </div>
  )
}

const EmptyNameElement = () => {
  return (
    <div className="EmptyNameElement">
      <div className="EmptyNameElement1"></div>
      <div className="EmptyNameElement2"></div>
    </div>
  )
}

const EmptyRow = () => {
  return (
    <tr className="EmptyRowContainter">
      <td>
        <EmptyNameElement />
      </td>
      <td className="EmptyDataCell ">
        <EmptyElement />
      </td>
      <td className="EmptyDataCell">
        <EmptyElement />
      </td>
      <td className="EmptyDataCellLast">
        <EmptyElement />
      </td>
    </tr>
  )
}

const EmptyTable = () => {
  return (
    <table>
      <tbody className="EmptyTableContainer">
        <tr className="EmptyTableRow">
          <th scope="col" className="">
            <EmptyElement />
          </th>
          <th scope="col" className="EmptyTableColumn">
            <EmptyElement />
          </th>
          <th scope="col" className="EmptyTableColumn">
            <EmptyElement />
          </th>
          <th scope="col" className="EmptyDataCellLast">
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
