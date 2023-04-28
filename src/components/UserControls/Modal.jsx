import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.jsx.scss'

export default function Modal({ children, isOpen, onClose ,...props}) {
    if (!isOpen)
        return null;

    return ReactDOM.createPortal(
        <>
            <div className="ModalBackground" onClick={onClose} />
            <div className="ModalBox">
                <div className="ModalCloseButton" onClick={onClose} >
                    <div>&#10005;</div>
                </div>
                <div className="ModalBody" {...props}>{children}</div>
            </div>
        </>,document.getElementById('portal')
    )
}
