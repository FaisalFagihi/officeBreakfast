import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import auth from '../../modules/auth'
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { RiGroupFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillWalletFill } from 'react-icons/bs';
import { IoRestaurantSharp } from 'react-icons/io5';
import userController from "../../controller/userController"


import { Badge, Button, Divider, List, Modal, Nav, Stack } from 'rsuite';
import Avatar from 'react-avatar';

import { useLocation, useNavigate } from 'react-router-dom';



export default function Navbar() {
    const [logs, setLogs] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const location = useLocation()


    const navigationItems = [
        { name: 'Groups', icon: <RiGroupFill />, href: '/', current: location.pathname == '/' },
        { name: 'Me', icon: <BsFillPersonFill />, href: '/me', current: location.pathname == '/me' },
        { name: 'Wallet', icon: <BsFillWalletFill />, href: '/wallet', current: location.pathname == '/wallet' },
        { name: 'Menus', icon: <IoRestaurantSharp />, href: '/restaurants', current: location.pathname == '/restaurants' },
    ]


    const getUserLogs = () => {
        userController.getUserLogs().then(({ data }) => {
            console.log(data)
            setLogs(data)
        })
    }

    const clearLogs = () => {
        userController.clearUserLogs().then(() => {
            getUserLogs()
        })
    }

    useEffect(() => {
        getUserLogs()
    }, []);

    const navigate = useNavigate();

    return (
        <>
        <div className='fixed px-4 bg-[#333] shadow-sm w-full p-2 sm:pr-4 top-0 left-0 z-50 text-base flex h-12 sm:collapse'  />
            <div className='fixed px-4  bottom-0 sm:bottom-auto bg-[#333] shadow-sm w-full py-3 sm:pr-4 sm:top-0 sm:left-0 sm:rounded-none z-50 text-base flex'>
                {navigationItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={`flex-grow sm:flex-none text-center px-2 py text-base font-medium ${item.current ? 'text-mainOrange' : "text-white"}`}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <div className='flex'>
                            <div className='m-auto'>
                                {item.icon}
                            </div>
                            <div className='my-auto mx-1 flex'>
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
                <Badge content={logs.length} color="green" className='fixed top-4 right-4 sm:right-16 flex items-center inset-auto pr-0'>
                    <button onClick={() => { setIsNotificationOpen(true); }}
                        type="button"
                        className="bg-none p-0 border-0 outline-none"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" color='#fff' />
                    </button>
                </Badge>
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
                </Modal>
                {/* Profile dropdown */}
                <div className='fixed top-1 left-2 sm:left-auto sm:right-2 flex items-center inset-auto pr-0'>
                    <button onClick={() => navigate("./profile")} className="flex rounded-full bg-gray-200 text-base focus:outline-none  p-0">
                        <Avatar name={auth.getName()} size={36} round={true} />
                    </button>
                </div>
            </div>

        </>
    )
}
