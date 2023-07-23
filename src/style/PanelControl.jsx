import React from 'react'

export default function PanelControl({ header, className, hidden, children }) {
    return (
        <>
            <div className='text-base px-1 my-1 inline-block'>{header}</div>
            <div className={className}>
                <div hidden={hidden}>{children}</div>
            </div>
        </>
    )
}
