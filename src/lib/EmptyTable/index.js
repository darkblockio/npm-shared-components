import "./emptyTable.css"

const EmptyElement = ({ lg, hide }) => {
  return (
    <div className={`Darkblock-EmptyElement ${hide && "Darkblock-EmptyElementHide"}`}>
      <div className={`Darkblock-EmptyElementDiv${lg ? "Lg" : ""}`}></div>
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

const EmptyHeader = () => {
  return (
    <div className="Darkblock-EmptyHeaderContainer">
      <div className="Darkblock-SingleElementWrapper">
        <EmptyElement lg />
      </div>
      <div className="Darkblock-MultipleElementWrapper">
        <div className="Darkblock-EmptyElementFlexWrapper">
          <EmptyElement hide />
          <EmptyElement hide />
          <EmptyElement />
        </div>
      </div>
    </div>
  )
}

const EmptyRow = () => {
  // EmptyRow component to CSS Grid with tailwind classes and use it here
  return (
    <div className="Darkblock-EmptyRowContainer">
      <div className="Darkblock-SingleElementWrapper">
        <EmptyNameElement />
      </div>
      <div className="Darkblock-MultipleElementWrapper">
        <div className="Darkblock-EmptyElementFlexWrapper">
          <EmptyElement hide />
          <EmptyElement hide />
          <EmptyElement />
        </div>
      </div>
    </div>
  )
}

const EmptyTable = () => {
  return (
    <div>
      <EmptyHeader />
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
    </div>
  )
}

export default EmptyTable
