import React from "react"
import StaticDBLogo from "../Panel/staticDBLogo"

export default function FooterSharedComponents(config, state){
    return(
    <div className="DarkblockWidget-Footer" >
    Powered by &nbsp;
    <StaticDBLogo />
    {config.debug && <p>state: {state.value}</p>}
  </div>
    )
}

