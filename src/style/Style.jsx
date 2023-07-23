import React from 'react'
import PanelControl from "./PanelControl" 
export function Panel({children, header, hidden, className}) {
  return (
    <PanelControl className={`panel shadow-sm p-1 bg-white rounded ${className}`} hidden={hidden} header={header} children={children} />
  )
}
