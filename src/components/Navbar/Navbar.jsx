import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, UserIcon, UserGroupIcon, WalletIcon } from '@heroicons/react/24/outline'
import { BellIcon as BellIconSolid, UserIcon as UserIconSolid, UserGroupIcon as UserGroupIconSolid, WalletIcon as WalletIconSolid } from '@heroicons/react/24/solid'

import auth from '../../modules/auth'
import { RiGroupFill, RiGroupLine } from 'react-icons/ri';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import { BsBellFill, BsBell } from 'react-icons/bs';
import { IoWallet, IoWalletOutline } from 'react-icons/io5';
import { IoRestaurantSharp, IoRestaurantOutline } from 'react-icons/io5';
import userController from "../../controller/userController"


import { Badge, Button, Divider, List, Modal, Nav, Stack } from 'rsuite';
import Avatar from 'react-avatar';

import { useLocation, useNavigate } from 'react-router-dom';

import { messaging } from '../../modules/firebase'
import { getToken, onMessage } from 'firebase/messaging'

export default function Navbar() {
    // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [logsCount, setLogsCount] = useState(false);
    const location = useLocation()

    const iconSize = 'h-6 w-6'
    const navigationItems = [
        { name: 'Groups', iconFill: <UserGroupIconSolid className={iconSize} />, iconLine: <UserGroupIcon className={iconSize} />, href: '/', current: location.pathname == '/' },
        { name: 'Me', iconFill: <UserIconSolid className={iconSize} />, iconLine: <UserIcon className={iconSize} />, href: '/me', current: location.pathname == '/me' },
        { name: 'Menus', iconFill: <IoRestaurantSharp size={22} />, iconLine: <IoRestaurantOutline size={22} />, href: '/restaurants', current: location.pathname == '/restaurants' },
        { name: 'Wallet', iconFill: <WalletIconSolid className={iconSize} />, iconLine: <WalletIcon className={iconSize} />, href: '/wallet', current: location.pathname == '/wallet' },
        { name: 'Notifications', iconFill: <BellIconSolid className={iconSize} />, iconLine: <BellIcon className={iconSize} />, href: '/notifications', current: location.pathname == '/notifications' },
    ]

    const getLogsCount = () => {
        userController.getUserLogsCount().then(({ data }) => {
            if (data > 0) {
                setLogsCount(data)
            } else {

                setLogsCount(false)
            }
        })
    }

    const requestPermission = async () => {
        if (!auth.isAuthenticated())
            return

        if ('Notification' in window) {

            const perimission = await Notification.requestPermission()
            console.log('perimission ', perimission)
            if (perimission === 'granted') {
                const token = await getToken(messaging, { vapidKey: 'BAusTrWhr_PENeKaWEJnjxpZJJ1BeuEgANFHrM3e0gOM41y4JatuCsO-2TNgMKy_xSmu9RKT81OZM5moNDdtBXg' })

                console.log('TOKEN '.token)

                if (!token)
                    return
                userController.registerFcmToken(token).then((data) => {
                    console.log('regisetered token')
                }).catch((err) => {
                    console.log('regiseter token error:', err)
                })
            }
        }
    }

    useEffect(() => {

        getLogsCount()

        requestPermission()

        onMessage(messaging, (payload) => {
            setLogsCount((prevCount) => prevCount + 1)
        })
    }, []);

    const navigate = useNavigate();

    return (
        <>
            {/* <div className='fixed px-4 bg-[#333] shadow-sm w-full p-2 sm:pr-4 top-0 left-0 z-50 text-base flex h-12 sm:collapse'  /> */}
            {/* <div className='fixed px-4  bottom-0 sm:bottom-auto bg-[#333] shadow-sm w-full py-3 sm:pr-4 sm:top-0 sm:left-0 sm:rounded-none z-50 text-base flex'> */}
            <div className='w-full p-2 z-50 text-base flex justify-between sm:justify-start 2xl:w-auto 2xl:flex-col shadow-md 2xl:shadow-none' >
                <div className='hidden 2xl:flex mt-3'>
                    <button onClick={() => navigate("./profile")} className="flex rounded-full focus:outline-none p-0">
                        <Avatar name={auth.getName()} size={36} round={true} />
                    </button>
                    <div className='mx-2 my-auto text-lg font-medium'>
                        {auth.getName()}
                    </div>
                </div>
                <Divider className='hidden my-2 mr-2 2xl:block' />
                {navigationItems.map((item, id) => (
                    <div
                        key={item.name}
                        onClick={() => {navigate(item.href); getLogsCount()}}
                        className={` ${id == 0 ? 'place-content-start' : id == navigationItems.length - 1 ? 'place-content-end' : 'flex-grow'}  my-auto 2xl:my-2 sm:flex-none text-center px-2 text-base font-medium ${"text-black"} `}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <div className='flex cursor-pointer place-content-center place-items-center sm:place-content-start sm:place-items-start'>
                            <Badge content={logsCount > 0 && item.name == 'Notifications' ? logsCount : false} color="green" >
                                {item.current ? item.iconFill : item.iconLine}
                            </Badge>
                            <div className='hidden mx-1 sm:block text-lg font-medium'>
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}

                {/* <button onClick={() => { setIsNotificationOpen(true); }}
                        type="button"
                        className="bg-none p-0 border-0 outline-none"
                        >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" color='#555' />
                    </button> */}
                {/* 
                <Modal overflow={true} open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} >
                <Modal.Header>
                <div className="ModifierItemName"> Notifications</div>
                <Divider className='m-0' />
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <List>
                                {logs?.map(({ submitDateFormated, message }, index) => (
                                    <List.Item key={index} index={index}>
                                        {message}
                                        <br /><small>{submitDateFormated}:</small>
                                    </List.Item>
                                ))}

                            </List>
                            <IoNotificationsOffOutline hidden={logs?.length > 0} style={{ fontSize: "8em", width: "100%" }} className="m-auto" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block onClick={() => clearLogs()}>Clear all</Button>
                    </Modal.Footer>
                </Modal> */}
                {/* Profile dropdown */}
            </div>

        </>
    )
}
