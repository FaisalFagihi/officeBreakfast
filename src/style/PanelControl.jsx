import React from 'react'

export default function PanelControl({ header, className, hidden, children }) {
    return (
        <div className={className}>
            <div className='text-lg pb-5 font-semibold'>{header}</div>
            <div hidden={hidden}>{children}</div>
        </div>
    )
}
