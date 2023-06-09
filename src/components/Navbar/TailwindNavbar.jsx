import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import auth from '../../modules/auth'
import notificationController from '../../controller/notificationController';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import userController from "../../controller/userController"


import { Badge, Button, Divider, List, Modal, Nav, Stack } from 'rsuite';
import Avatar from 'react-avatar';
import SimpleNotification from './SimpleNotification';

// import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { useLocation } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TailwindNavbar() {
  const [logs, setLogs] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const location = useLocation()
  
  
  useEffect(() => {
    successNotification()
    warningNotification()

    console.log(location.pathname )
  }, []);
  
  const navigation = [
    { name: 'Home', href: '/', current: location.pathname == '/' },
    { name: 'Restaurants', href: '/restaurants', current: location.pathname == '/restaurants'},
    { name: 'Wallet', href: '/wallet', current: location.pathname == '/wallet' },
  ]
  
  const getUserLogs = () => {
    userController.getUserLogs().then(({ data }) => {
      console.log(data)
      setLogs(data)
      notificationController.init(setLogs)
    })
  }

  const clearLogs = () => {
    userController.clearLogs().then(() => {
      getUserLogs()
    })
  }

  function warningNotification() {
    addNotification({
      title: 'Warning',
      subtitle: 'Please fill it',
      message: 'You have to enter name',
      theme: 'red',
      closeButton: "X",
    })
  };

  function successNotification() {
    addNotification({
      title: 'Success',
      subtitle: 'You have successfully submitted',
      message: 'Welcome to GeeksforGeeks',
      theme: 'light',
      closeButton: "X",
      backgroundTop: "green",
      backgroundBottom: "yellowgreen"
    })
  };


  return (
    <Disclosure as="nav" className="bg-darkGray fixed top-0 left-0 right-0 z-50 border-b-4 border-white text-base">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-14 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none hover:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 text-white items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div>Office Breakfast</div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? ' text-mainOrange' : 'text-white hover:text-mainOrange hover:no-underline',
                          'px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <Badge content={logs.length} color="green" className='mx-4 mt-4'>
                  <button onClick={() => setIsNotificationOpen(true)}
                    type="button"
                    className="bg-none p-0 border-0 outline-none"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" color='white' />
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
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-0.5">                      
                    <span className="sr-only">Open user msenu</span>
                      <Avatar name={auth.getName()} size={40} round={true} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            onClick={() => auth.logout()}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'text-mainOrange' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
