import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, UserIcon, UserGroupIcon, WalletIcon } from '@heroicons/react/24/outline'
import { BellIcon as BellIconSolid, UserIcon as UserIconSolid, UserGroupIcon as UserGroupIconSolid, WalletIcon as WalletIconSolid } from '@heroicons/react/24/solid'
import { SlOptionsVertical } from 'react-icons/sl';
import { BiReceipt, BiSolidReceipt } from 'react-icons/bi';

import auth from '../../modules/auth'
import { RiGroupFill, RiGroupLine } from 'react-icons/ri';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import { BsBellFill, BsBell } from 'react-icons/bs';
import { TbDotsVertical } from 'react-icons/tb';
import { PiDotsThreeOutlineVerticalThin } from 'react-icons/pi';
import { IoRestaurantSharp, IoRestaurantOutline } from 'react-icons/io5';
import userController from "../../controller/userController"


import { Badge, Button, Divider, Drawer, Dropdown, List, Modal, Nav, Stack } from 'rsuite';
import Avatar from 'react-avatar';

import { useLocation, useNavigate } from 'react-router-dom';

import { messaging } from '../../modules/firebase'
import { getToken, onMessage } from 'firebase/messaging'

export default function Navbar() {
    // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [logsCount, setLogsCount] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation()

    const iconSize = 'h-6 w-6'
    const navigationItems = [
        { name: 'Groups', iconFill: <UserGroupIconSolid className={iconSize} />, iconLine: <UserGroupIcon className={iconSize} />, href: '/', current: location.pathname == '/' },
        { name: 'Me', iconFill: <UserIconSolid className={iconSize} />, iconLine: <UserIcon className={iconSize} />, href: '/me', current: location.pathname == '/me' },
        { name: 'Menus', iconFill: <IoRestaurantSharp className={iconSize} />, iconLine: <IoRestaurantOutline className={iconSize} />, href: '/restaurants', current: location.pathname == '/restaurants' },
        { name: 'Orders', iconFill: <BiSolidReceipt className={iconSize} />, iconLine: <BiReceipt className={iconSize} />, href: '/orders', current: location.pathname == '/orders' },
        { name: 'Wallet', iconFill: <WalletIconSolid className={iconSize} />, iconLine: <WalletIcon className={iconSize} />, href: '/wallet', current: location.pathname == '/wallet' },
        { name: 'Notifications', iconFill: <BellIconSolid className={iconSize} />, iconLine: <BellIcon className={iconSize + 'm-auto'} />, href: '/notifications', current: location.pathname == '/notifications' },
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
            if (perimission === 'granted') {
                const token = await getToken(messaging, { vapidKey: 'BAusTrWhr_PENeKaWEJnjxpZJJ1BeuEgANFHrM3e0gOM41y4JatuCsO-2TNgMKy_xSmu9RKT81OZM5moNDdtBXg' })

                if (!token)
                    return
                userController.registerFcmToken(token).then((data) => {
                }).catch((err) => {
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

    const userAvatar = <>
        <Avatar onClick={() => navigate("./profile")} name={auth.getName()} src={auth.getPicture()} size={28} round={true} className='cursor-pointer' />

    </>

    const showHideDropMenu = () => {
        setDrawerOpen(!isDrawerOpen)
    }

    const drawerItems = [navigationItems[4], navigationItems[5]];
    return (
        <>
            {/* <div className='fixed px-4 bg-[#333] shadow-sm w-full p-2 sm:pr-4 top-0 left-0 z-50 text-base flex h-12 sm:collapse'  /> */}
            {/* <div className='fixed px-4  bottom-0 sm:bottom-auto bg-[#333] shadow-sm w-full py-3 sm:pr-4 sm:top-0 sm:left-0 sm:rounded-none z-50 text-base flex'> */}
            <div className='w-full p-2 text-base flex justify-between sm:justify-start 2xl:w-auto 2xl:flex-col shadow-md 2xl:shadow-none fixed z-50 bg-white top-0 lg:relative 2xl:bg-transparent' >
                <div className='hidden 2xl:flex mt-3'>
                    {userAvatar}
                    <div className='mx-2 my-auto text-lg font-medium'>
                        {auth.getName()}
                    </div>
                </div>
                <Divider className='hidden my-2 mr-2 2xl:block' />
                {navigationItems.map((item, id) => (
                    <div
                        key={item.name}
                        onClick={() => { navigate(item.href); getLogsCount() }}
                        className={` ${id > 3 ? (id > 4 ? 'hidden md:flex' : 'hidden sm:flex') : 'flex'}  my-auto 2xl:my-2 sm:flex-none text-center px-2  text-base font-medium ${"text-black"} `}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <div className={`flex cursor-pointer mr-auto mt-0.5`}>
                            <Badge content={logsCount > 0 && item.name == 'Notifications' ? logsCount : false} color="orange" className='m-auto'>
                                {item.current ? item.iconFill : item.iconLine}
                            </Badge>
                            <div className='hidden mx-1 sm:block text-lg font-medium'>
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}

                {/* <Dropdown title='...' size='xs' >
                        <div className='grid grid-cols-2 absolute'>
                            {userAvatar}
                            <div className='mx-2 my-auto text-lg font-medium'>
                                {auth.getName()}
                            </div>
                        </div>
                    </Dropdown> */}
                <div className='sm:ml-auto my-auto 2xl:hidden'>
                    <div className={`hidden md:flex`}>
                        {userAvatar}
                    </div>
                    <div onClick={() => setOpen(true)} className='flex cursor-pointer md:hidden pl-4 '>
                        <TbDotsVertical className={iconSize} />
                    </div>
                </div>
                <Drawer open={open} onClose={() => setOpen(false)} size={'xs'} placement={'left'} className='md:hidden'>
                    <Drawer.Header>
                        <div className='flex items-center gap-2'>

                            <div className='flex justify-start'>
                                <div>
                                    <Avatar onClick={() => { navigate("./profile"); setOpen(false) }} name={auth.getName()} src={auth.getPicture()} size={30} round={true} className='cursor-pointer' />
                                </div>
                                <div className='mx-2 my-auto text-lg font-medium'>
                                    {auth.getName()}
                                </div>
                            </div>
                            <Divider vertical className='h-full' />
                            <img src='/assets/logo_512.png' className='h-[80px] cursor-pointer' draggable="false" onClick={() => { navigate('../'); setOpen(false) }} />
                        </div>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div className='h-full flex flex-col justify-between'>
                            <div className='grid gap-4'>
                                {drawerItems.map((item, id) => (
                                    <div
                                        key={item.name}
                                        onClick={() => { navigate(item.href); getLogsCount(); setOpen(false); }}
                                        className={`${id == 0 ? 'flex sm:hidden' : 'flex'}  md:hidden flex flex-col  my-auto 2xl:my-2 text-center text-base font-medium ${"text-black"} `}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <div className={`flex cursor-pointer`}>
                                            {item.current ? item.iconFill : item.iconLine}
                                            <div className='mx-1 text-lg font-medium'>
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* <div
                                key={walletItem.name}
                                onClick={() => { navigate(walletItem.href); getLogsCount(); setOpen(false); }}
                                className={`my-auto 2xl:my-2 sm:flex-none text-center text-base font-medium text-black`}
                                aria-current={walletItem.current ? 'page' : undefined}
                                >
                                <div className={`flex sm:hidden cursor-pointer`}>
                                {walletItem.current ? walletItem.iconFill : walletItem.iconLine}
                                <div className='mx-1 text-lg font-medium'>
                                {walletItem.name}
                                </div>
                                </div>
                                </div>
                                <div
                                key={ordersItem.name}
                                onClick={() => { navigate(ordersItem.href); getLogsCount(); setOpen(false); }}
                                className={`my-auto 2xl:my-2 sm:flex-none text-center text-base font-medium text-black`}
                                aria-current={ordersItem.current ? 'page' : undefined}
                                >
                                <div className={`flex sm:hidden cursor-pointer`}>
                                {ordersItem.current ? ordersItem.iconFill : ordersItem.iconLine}
                                <div className='mx-1 text-lg font-medium'>
                                {ordersItem.name}
                                </div>
                                </div>
                            </div> */}
                            </div>
                            <button onClick={() => { auth.logout(); }} className='text-base bg-transparent border-borderGray w-full mb-10' >logout</button>
                        </div>
                    </Drawer.Body>
                </Drawer>

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
