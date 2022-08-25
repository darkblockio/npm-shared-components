import React from "react"

const EmptyElement = () => {
  return (
    <div className="mx-2 my-4 animate-pulse">
      <div className="h-4 bg-gray-100 rounded"></div>
    </div>
  )
}

const EmptyNameElement = () => {
  return (
    <div className="flex items-center pt-0 my-4 text-left animate-pulse">
      <div className="w-6 h-6 p-2 ml-2 mr-2 bg-gray-100 rounded"></div>
      <div className="h-4 bg-gray-100 rounded w-44"></div>
    </div>
  )
}

const EmptyRow = () => {
  return (
    <tr className="border border-gray-200 ">
      <td>
        <EmptyNameElement />
      </td>
      <td className="hidden sm:table-cell ">
        <EmptyElement />
      </td>
      <td className="hidden sm:table-cell">
        <EmptyElement />
      </td>
      <td className='w-20'>
        <EmptyElement />
      </td>
    </tr>
  )
}

const EmptyTable = () => {
  return (
    <tbody className="w-full border border-grey-400">
      <tr className='mt-10 border border-gray-200 cursor-pointer rowheader'>
        <th scope='col' className=''>
          <EmptyElement />
        </th>
        <th scope='col' className='hidden w-20 sm:table-cell'>
          <EmptyElement />
        </th>
        <th scope='col' className='hidden w-20 sm:table-cell'>
          <EmptyElement />
        </th>
        <th scope='col' className='w-20'>
          <EmptyElement />
        </th>
      </tr>
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
    </tbody>
  )
}

export default EmptyTable;
