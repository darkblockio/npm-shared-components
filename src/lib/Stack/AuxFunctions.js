import React from "react"

import {
  faGlobe,
  faQuestionCircle,
  faFilePdf,
  faFilm,
  faImage,
  faFileZipper,
  faMusic,
  faCube,
  faAngleDown,
  faAngleUp,
  faBook,
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const RenderArrowIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("faArrowLeft") > -1) icon = faArrowLeft
  if (filetype.indexOf("faArrowRight") > -1) icon = faArrowRight

  return <FontAwesomeIcon icon={icon} className="Darkblock-arrowIcons" />
}

export const RenderEllipsisIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("ellipsis") > -1) icon = faEllipsisVertical

  return <FontAwesomeIcon icon={icon} size="lg" className="Darkblock-toggleIcon" />
}

export const RenderIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("html") > -1) icon = faGlobe
  if (filetype.indexOf("video") > -1) icon = faFilm
  if (filetype.indexOf("audio") > -1) icon = faMusic
  if (filetype.indexOf("image") > -1) icon = faImage
  if (filetype.indexOf("pdf") > -1) icon = faFilePdf
  if (filetype.indexOf("zip") > -1) icon = faFileZipper
  if (filetype.indexOf("model") > -1) icon = faCube
  if (filetype.indexOf("usdz") > -1) icon = faCube
  if (filetype.indexOf("up") > -1) icon = faAngleUp
  if (filetype.indexOf("down") > -1) icon = faAngleDown
  if (filetype.indexOf("epub") > -1) icon = faBook
  if (filetype.indexOf("chevronLeft") > -1) icon = faChevronLeft
  if (filetype.indexOf("chevronRight") > -1) icon = faChevronRight

  return <FontAwesomeIcon icon={icon} className="Darkblock-awesome" />
}
