import React from 'react'
import PanelControl from "./PanelControl" 
export function Panel({children, header, hidden, className, bordered, shaded=true}) {
  return (
    <PanelControl className={`p-1 ${bordered? 'border':''} ${shaded? 'shadow-sm':''} bg-white rounded ${className}`} hidden={hidden} header={header} children={children} />
  )
}
