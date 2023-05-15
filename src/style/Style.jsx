import React from 'react'
import PanelControl from "./PanelControl" 
export function Panel({children, header, hidden, className}) {
  return (
    <PanelControl className={`panel border border-borderGray p-5 rounded ${className}`} hidden={hidden} header={header} children={children} />
  )
}
