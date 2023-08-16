import React from 'react'
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { Button, Divider } from 'rsuite';
import { useEffect, useState } from 'react'
import userController from "../../controller/userController"

export default function NotificationsPage() {
    const [logs, setLogs] = useState([]);

    const getUserLogs = () => {
        userController.getUserLogs().then(({ data }) => {
            setLogs(data)

            userController.readUserLogs()
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
    return (
        <div>
            <div className="ModifierItemName"> Notifications</div>
            <Divider className='m-0' />
            <div>
                {logs?.map(({ submitDateFormated, title, message, hasRead }, index) => (
                    <div className='flex gap-2 justify-between my-2 border-b' key={index} index={index}>
                        <div className='flex flex-col'>
                            <b>{title}</b>
                            {message}
                        </div>
                        <div>
                            <small>{submitDateFormated}:</small>
                        </div>
                    </div>
                ))}

                <IoNotificationsOffOutline hidden={logs?.length > 0} style={{ fontSize: "8em", width: "100%" }} className="m-auto" />
            </div>
            <Button block onClick={() => clearLogs()}>Clear all</Button>
        </div>
    )
}
