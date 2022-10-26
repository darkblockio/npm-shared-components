import React from "react"
import "./Titles.css"
import '../../i18n'
import { useTranslation } from "react-i18next"

const Titles = ({ state }) => {
  const db = state.context.display.stack.length
  const { t } = useTranslation()

  return (
    <tr className='Darkblock-rowheader'>
      <th scope='col' className='Darkblock-name-header'>
        <span>{t('titles.name')}</span>
        <span> ({db})</span>
      </th>
      <th scope='col' className='Darkblock-format-header'>
        {t('titles.fileSize')}
      </th>
      <th scope='col' className='Darkblock-format-date'>
        {t('titles.dateAdded')}
      </th>
      <th scope='col' className='Darkblock-format-icon'>
        <span></span>
      </th>
    </tr>
  )
}

export default Titles
