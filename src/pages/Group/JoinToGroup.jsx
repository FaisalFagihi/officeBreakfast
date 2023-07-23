import React, { useEffect, useState } from 'react'
import { InputGroup, Row, Col, AutoComplete, Avatar } from "rsuite";
import UserController from "../../controller/userController";
import Toaster from "../../components/Toaster";

export default function JoinToGroup({ onJoin }) {
    const [hostUsername, setHostUsername] = useState('');
    const [message, setMessage] = useState("");
    const [searchUsername, setSearchUsername] = useState([]);
    const [searchData, setSearchData] = useState([]);

    const joinToGroup = () => {
        UserController.sendJoinRequest(hostUsername?.split(':')[1]).then(({ data }) => {
            setMessage(data)
            toaster.push("You have been joined to the group successfully", "success")
            setHostUsername("")
            onJoin()

        }).catch(({ response }) => {
            console.log(response)
            toaster.push(response?.data, "error")
        })
    }


    const userCard = (username, name) => {
        return (
            <div className='flex flex-row'>

                <Avatar circle src="https://avatars.githubusercontent.com/u/12592949" alt="@superman66" />
                <div className='flex flex-col px-2'>
                    {name}
                    <small>{username}</small>
                </div>
            </div>

        )
    }

    useEffect(() => {
        if (hostUsername === "")
            return

        UserController.searchGuest(hostUsername).then(({ data }) => {
            setSearchData(data)
            // setSearchUsername(data.map(x => x.username))
            console.log(data)
            let usernames = data.map(x => x.name + ":" + x.username)
            setSearchUsername(usernames)

            // setSearchData(data.map(x => { return userCard(x.name , x.username)}))
        })
    }, [hostUsername]);



    const toaster = Toaster();

    return (<div>
        <InputGroup size="lg" className='my-5'>
            <AutoComplete onChange={(e) => setHostUsername(e)}
                placeholder="host name or email.. "
                value={hostUsername}
                size="lg"
                data={searchUsername}
                className='!border-none !bg-none !shadow-none'
                renderMenuItem={usrename => {
                    let user = searchData.find(x => x.username === usrename.split(':')[1]);
                    return userCard(user.name, user.username)
                }}
            />
            <InputGroup.Button disabled={hostUsername.trim() === ''} onClick={() => joinToGroup()}>
                Join
            </InputGroup.Button>
            {/* <Input type="text" value={hostUsername} onChange={(e) => setHostUsername(e)} placeholder="Host email or name..join " /> */}
        </InputGroup>
    </div>
    )
}
