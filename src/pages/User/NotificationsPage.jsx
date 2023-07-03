import React from 'react'
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { Button, Divider, List } from 'rsuite';
import { useEffect, useState } from 'react'
import userController from "../../controller/userController"

export default function NotificationsPage() {
    const [logs, setLogs] = useState([]);

    const getUserLogs = () => {
        userController.getUserLogs().then(({ data }) => {
            console.log(data)
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
                <List>
                    {logs?.map(({ submitDateFormated, message, hasRead }, index) => (
                        <List.Item key={index} index={index}>
                            {hasRead.toString()} | 
                            {message}
                            <br /><small>{submitDateFormated}:</small>
                        </List.Item>
                    ))}

                </List>
                <IoNotificationsOffOutline hidden={logs?.length > 0} style={{ fontSize: "8em", width: "100%" }} className="m-auto" />
            </div>
            <Button block onClick={() => clearLogs()}>Clear all</Button>
        </div>
    )
}
