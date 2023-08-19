import React, { useEffect } from 'react'
import { Dropdown, useToaster } from 'rsuite'
import userController from '../../controller/userController'
import { GuestStatus, LeaderStatus } from '../../components/User/UserStatus';
import { MdCheckCircle } from "react-icons/md"
import { MdCancel } from "react-icons/md"
import { GiMoneyStack } from "react-icons/gi"
import Avatar from 'react-avatar';

export function LeadersTable({ items, onAction }) {
    return items?.length > 0 ?
        <div className="grid">
            {items?.map((item) => {
                return <UsersTable item={item} status={<GuestStatus value={item?.status} />} key={item.id} options={<GuestOptions leaderName={item.username} status={item.status} onAction={onAction} />} />
            })}
        </div>
        : <div className='text-center p-3 text-gray-500 font-normal'>no volunteers</div>

}

export function GuestsTable({ items, onAction }) {
    return items?.length > 0 ?
        <div className="grid">
            {items?.map((item) => {
                return <UsersTable item={item} status={<LeaderStatus value={item.status} />} key={item.id} options={<LeaderOptions guestName={item.username} status={item.status} onAction={onAction} />} />
            })}
        </div>
        : <div className='text-center p-3 text-gray-500 font-normal'>no guests</div>

}


function UsersTable({ item, options, status }) {

    return <div className='grid grid-cols-6 items-center text-left p-2 bg-white mb-1 w-full rounded-lg ' key={item.id}>

        <div className='grid grid-flow-col  justify-start col-span-4 gap-2'>
            <div>
                <Avatar name={item.firstName + ' ' + item.lastName} src={item.picture} size={24} round={true} />
            </div>
            <div>

                {item.firstName} {item.lastName}
            </div>
            <div className=''>
                {status}
            </div>
        </div>
        {/* <div className='hidden'>{item.username} </div> */}
        <div className={`flex items-center gap-2 place-self-center `}>
            <div className={`${item?.balance < 0 ? 'text-mainRed' : 'text-black'}`}>
                {item?.balance ? item.balance?.toFixed(2) + ' SAR' : '--'}
            </div>
            <div hidden={!item?.balance}>
                <GiMoneyStack size={24} />
            </div>
        </div>

        <div className='text-right w-16 place-self-end'>
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