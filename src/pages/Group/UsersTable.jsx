import React, { useEffect } from 'react'
import { Dropdown } from 'rsuite'
import userController from '../../controller/userController'
import { GuestStatus, LeaderStatus } from '../../components/User/UserStatus';
import { AiFillCheckCircle } from "react-icons/ai"
import { GiCancel } from "react-icons/gi"

export function GuestsTable({ items, onAction }) {
    return items?.length > 0 ?
        <div className="table w-full px-2 py-2 bg-white ">
            <div className='table-row-group '>
                {items?.map((item) => {
                    return <UsersTable item={item} status={<GuestStatus value={item?.status} />} key={item.id} options={<GuestOptions leaderName={item.username} status={item.status} onAction={onAction} />} />
                })}
            </div>
        </div>
        : <></>

}

export function LeadersTable({ items, onAction }) {
    return items?.length > 0 ?
        <div className="table w-full px-2 py-2 bg-white ">
            <div className='table-row-group '>
                {items?.map((item) => {
                    return <UsersTable item={item} status={<LeaderStatus value={item.status} />} key={item.id} options={<LeaderOptions guestName={item.username} status={item.status} onAction={onAction} />} />
                })}
            </div>
        </div>
        : <></>

}


function UsersTable({ item, options, status }) {

    return <div className='table-row' key={item.id}>
        <div className='table-cell text-left p-2 border-b border-gray-100 '>{item.firstName} {item.lastName} {status}
        </div>
        <div className='table-cell text-left p-2 border-b border-gray-100'>{item.username} </div>
        <div className='table-cell text-left p-2 border-b border-gray-100'>{item.balance ?? '-'} </div>
        <div className='table-cell text-right p-0 border-b border-gray-100'>
            {options}
        </div>
    </div>
}


const GuestOptions = ({ leaderName, status, onAction }) => {


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
            return <div>
                <button onClick={() => invitationActionItems[0].onClick(leaderName)}> <AiFillCheckCircle /></button>
                <button onClick={() => invitationActionItems[1].onClick(leaderName)}><GiCancel /></button>
            </div>
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
            return <div>
                <button onClick={() => joinedRequestsActionItems[0].onClick(guestName)}> <AiFillCheckCircle /></button>
                <button onClick={() => joinedRequestsActionItems[1].onClick(guestName)}><GiCancel /></button>
            </div>
            break;
        case 2:
            return <Dropdown title='...' size='sm'>
                {invitationActionItems?.map((actionItem) => {
                    return <Dropdown.Item key={actionItem.label} onClick={() => actionItem.onClick(guestName)}>{actionItem.label}</Dropdown.Item>
                })}

            </Dropdown>
            break;

        default:
            return <></>
            break;
    }
}