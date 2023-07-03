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

    useEffect(() => {
        getLogsCount();
    }, [])

    const [interval, setTimerInterval] = useState();


    useEffect(() => {
        setTimerInterval(setInterval(() => getLogsCount(), 5000));


        return () => {
            clearInterval(interval)
        }
    }, []);


    const navigate = useNavigate();

    return (
        <>
            {/* <div className='fixed px-4 bg-[#333] shadow-sm w-full p-2 sm:pr-4 top-0 left-0 z-50 text-base flex h-12 sm:collapse'  /> */}
            {/* <div className='fixed px-4  bottom-0 sm:bottom-auto bg-[#333] shadow-sm w-full py-3 sm:pr-4 sm:top-0 sm:left-0 sm:rounded-none z-50 text-base flex'> */}
            <div className='bg-[#f5f5f5] border-b w-full py-1  z-50 text-base flex justify-between sm:justify-start' >

                {navigationItems.map((item, id) => (

                    <div
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={` ${id == 0 ? 'place-content-start' : id == navigationItems.length - 1 ? 'flex-grow' : 'flex-grow'}  my-auto sm:flex-none text-center px-2 text-base font-medium ${"text-black"} `}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <div className='flex cursor-pointer place-content-center place-items-center'>
                            <Badge content={logsCount > 0 && item.name == 'Notifications' ? logsCount : false} color="green" >
                                {item.current ? item.iconFill : item.iconLine}
                            </Badge>
                            <div className='hidden mx-1 sm:block text-lg font-medium'>
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
                <div className='px-2 ml-auto'>
                    <button onClick={() => navigate("./profile")} className="flex rounded-full bg-black text-base focus:outline-none  p-0">
                        <Avatar name={auth.getName()} size={36} round={true} />
                    </button>
                </div>
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
