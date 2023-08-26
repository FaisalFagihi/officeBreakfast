import React from 'react'
import PanelControl from "./PanelControl" 
import AutoComplateControl from './AutoComplateControl'
export function Panel({children, header, hidden, className, bordered, shaded}) {
  return (
    <PanelControl className={`p-1 ${bordered? 'border':''} ${shaded? 'shadow-sm':''}  rounded ${className}`} hidden={hidden} header={header} children={children} />
  )
}

export function AutoComplate({children, placeholder, list, value, onChange,renderItem, hidden, className}) {
  return (
    <AutoComplateControl renderItem={renderItem} placeholder={placeholder} value={value} onChange={onChange} className={`bg-white py-2 px-3 shadow-sm rounded-md ${className}`} hidden={hidden} children={children} list={list} />
  )
}
