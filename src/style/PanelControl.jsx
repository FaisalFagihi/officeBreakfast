import React from 'react'

export default function PanelControl({ header, className, hidden, children }) {
    return (
        <div hidden={hidden} >
            <div className='text-2xl my-1 px-0 text-mainDarkGray  rounded-t-3xl rounded-br-3xl font-black'>{header}</div>
            <div className={className}>
                <div hidden={hidden}>{children}</div>
            </div>
        </div>
    )
}
