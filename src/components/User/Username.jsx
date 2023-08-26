import React from 'react'
import Avatar from 'react-avatar';
import { Tooltip, Whisper } from "rsuite";

const getInitials = (firstName, lastName) => {
    return firstName.charAt(0) + lastName.charAt(0)
}

export default function Username({ username, firstName, lastName, avatar = null, avatarOnly = false, nameOnly = false }) {
    return (
        <>
            <Whisper

                placement="top"
                controlId="control-id-context-menu"
                trigger="hover"
                speaker={<Tooltip>{firstName + " " + lastName}</Tooltip>}
            >
                {/* <Avatar hidden={nameOnly} size='sm' src={avatar} circle alt={getInitials(firstName, lastName)}>{getInitials(firstName, lastName)}</Avatar> */}
                <Avatar name={firstName + ' ' + lastName} src={avatar} size={24} round={true} />

            </Whisper>
            <Whisper

                placement="topEnd"
                controlId="control-id-context-menu"
                trigger="hover"
                speaker={<Tooltip>{username}</Tooltip>}
            >
                <label hidden={avatarOnly} className='mx-1'> {firstName + " " + lastName} </label>
            </Whisper>
        </>
    )
}
