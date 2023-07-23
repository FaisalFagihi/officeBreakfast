import React from 'react'
import { Badge } from 'rsuite'

export function GuestStatus({ value }) {
    const status = [
        { label: 'none', color: 'black' },
        { label: 'pending', color: 'bg-[#ffe2c4]' },
        { label: 'invitation', color: 'bg-[#ecceff]' }]
    return value < 3 ? <UserStatus status={status} value={value} /> : <></>
}

export function LeaderStatus({ value }) {
    const status = [
        { label: 'none', color: 'black' },
        { label: 'request', color: 'bg-[#ffe2c4]' },
        { label: 'pending', color: 'bg-[#ecceff]' }
    ]
    return value < 3 ? <UserStatus status={status} value={value} /> : <></>
}

function UserStatus({ value, status }) {
    return value < 3 ? <div className={`px-2 text-xs  rounded-full inline-block font-sans ${status[value].color}`}>{status[value].label}</div> : <></>
}

