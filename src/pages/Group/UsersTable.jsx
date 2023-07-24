import React, { useEffect } from 'react'
import { Dropdown, useToaster } from 'rsuite'
import userController from '../../controller/userController'
import { GuestStatus, LeaderStatus } from '../../components/User/UserStatus';
import { MdCheckCircle } from "react-icons/md"
import { MdCancel } from "react-icons/md"

export function LeadersTable({ items, onAction }) {
    return items?.length > 0 ?
        <div className="table w-full px-2 py-2 bg-white ">
            <div className='table-row-group '>
                {items?.map((item) => {
                    return <UsersTable item={item} status={<GuestStatus value={item?.status} />} key={item.id} options={<GuestOptions leaderName={item.username} status={item.status} onAction={onAction} />} />
                })}
            </div>
        </div>
        : <div className='text-center p-3 text-gray-500 font-normal'>no leaders</div>

}

export function GuestsTable({ items, onAction }) {
    return items?.length > 0 ?
        <div className="table w-full px-2 py-2 bg-white ">
            <div className='table-row-group '>
                {items?.map((item) => {
                    return <UsersTable item={item} status={<LeaderStatus value={item.status} />} key={item.id} options={<LeaderOptions guestName={item.username} status={item.status} onAction={onAction} />} />
                })}
            </div>
        </div>
        : <div className='text-center p-3 text-gray-500 font-normal'>no guests</div>

}


function UsersTable({ item, options, status }) {

    return <div className='table-row' key={item.id}>
        <div className='table-cell text-left p-2 border-b border-gray-100 '>{item.firstName} {item.lastName} {status}
        </div>
        <div className='table-cell text-left p-2 border-b border-gray-100'>{item.username} </div>
        <div className='table-cell text-left p-2 border-b border-gray-100'>{item.balance ?? '-'} </div>
        <div className='table-cell text-right p-0 border-b border-gray-100 w-16 align-middle'>
            {options}
        </div>
    </div>
}


const GuestOptions = ({ leaderName, status, onAction }) => {

    const toaster = useToaster()

    const cancelJoinRequest = (username) => {
        userController.cancelJoinRequest(username).then(() => {
            onAction()
        })
    }
    const cancelInvitation = (username) => {
        userController.cancelInvitation(username).then(() => {
            onAction()
        })
    }

    const acceptInvitation = (username) => {
        userController.confirmOwner(username).then(() => {
            onAction()
        })
    }

    const removeOwner = (ownerUsername) => {
        userController.removeOwner(ownerUsername).then(() => {
            onAction()
        })
    }

    const ownerActionItems = [{ label: "remove", onClick: removeOwner }]
    const myRequestsActionItems = [{ label: "remove", onClick: cancelJoinRequest }]


    const invitationActionItems = [
        { label: "Accept", onClick: acceptInvitation },
        { label: "Reject", onClick: cancelInvitation }]

    switch (status) {
        case 1:
            return <Dropdown title='...' size='sm'>
                {myRequestsActionItems?.map((actionItem) => {
                    return <Dropdown.Item key={actionItem.label} onClick={() => actionItem.onClick(leaderName)}>{actionItem.label}</Dropdown.Item>
                })}

            </Dropdown>
            break;
        case 2:
            return <div className='flex justify-start'>
                <MdCheckCircle color='#a3ba61' size={28} onClick={() => invitationActionItems[0].onClick(leaderName)} className='cursor-pointer hover:opacity-75' />
                <MdCancel color='#444' size={28} onClick={() => invitationActionItems[1].onClick(leaderName)} className='cursor-pointer hover:opacity-75' />
            </div>
            break;
        case 3:
            return <Dropdown title='...' size='sm'>
                {ownerActionItems?.map((actionItem) => {
                    return <Dropdown.Item key={actionItem.label} onClick={() => actionItem.onClick(leaderName)}>{actionItem.label}</Dropdown.Item>
                })}
            </Dropdown>
            break;
        default:
            return <></>
            break;
    }
}


const LeaderOptions = ({ guestName, status, onAction }) => {


    const cancelJoinRequest = (username) => {
        userController.cancelJoinRequest(username).then(() => {
            onAction()
        })
    }

    const cancelInvitation = (username) => {
        userController.cancelInvitation(username).then(() => {
            onAction()
        })
    }

    const removeGuest = (guestUsername) => {
        userController.removeGuest(guestUsername).then(() => {
            onAction()
        })
    }

    const confirmGuest = (username) => {
        userController.confirmGuest(username).then(() => {
            onAction()
        })
    }


    const guestActionItems = [{ label: "remove", onClick: removeGuest }]
    const invitationActionItems = [{ label: "remove", onClick: cancelInvitation }]
    const joinedRequestsActionItems = [
        { label: "accept", onClick: confirmGuest },
        { label: "reject", onClick: cancelJoinRequest }]



    switch (status) {
        case 1:
            return <div className='flex justify-start'>
                <MdCheckCircle color='#a3ba61' size={28} onClick={() => joinedRequestsActionItems[0].onClick(guestName)} className='cursor-pointer hover:opacity-75' />
                <MdCancel color='#444' size={28} onClick={() => joinedRequestsActionItems[1].onClick(guestName)} className='cursor-pointer hover:opacity-75' />
            </div>
            break;
        case 2:
            return <Dropdown title='...' size='sm'>
                {invitationActionItems?.map((actionItem) => {
                    return <Dropdown.Item key={actionItem.label} onClick={() => actionItem.onClick(guestName)}>{actionItem.label}</Dropdown.Item>
                })}

            </Dropdown>
            break;
        case 3:
            return <Dropdown title='...' size='sm'>
                {guestActionItems?.map((actionItem) => {
                    return <Dropdown.Item key={actionItem.label} onClick={() => actionItem.onClick(guestName)}>{actionItem.label}</Dropdown.Item>
                })}
            </Dropdown>

            break;

        default:
            return <></>
            break;
    }
}