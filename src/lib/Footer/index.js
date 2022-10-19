import React from "react"
import StaticDBLogo from "../Panel/staticDBLogo"

export default function FooterSharedComponents(config, state) {
  return (
    <div className="DarkblockWidget-Footer">
      <p>Powered by &nbsp;</p>
      <div>
        <StaticDBLogo />
      </div>
      {config.debug && <p>state: {state.value}</p>}
    </div>
  )
}
