import React from "react";

export default function TabsRow(state) {
    console.log(state.context.display?.stack, "jenny db")
    return (
        <>
        <div className="flex">
        <button className="Darkblock-upgrade-add-content">UGC</button>
        <button className="Darkblock-upgrade-add-content">OCG</button>
        </div>
        </>
    )
}