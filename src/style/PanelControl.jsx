import React from 'react'

export default function PanelControl({ header, className, hidden, children }) {
    return (
        <div hidden={hidden} >
            <div className='text-lg px-1 my-1 inline-block'>{header}</div>
            <div className={className}>
                <div hidden={hidden}>{children}</div>
            </div>
        </div>
    )
}
