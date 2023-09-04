import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Grid, Button, Divider, InputGroup, Row, Col, Dropdown, AutoComplete, PanelGroup, FlexboxGrid, Whisper, Tooltip, Modal, Toggle } from "rsuite";
import groupController from "../../controller/groupController";
import { Loader } from 'rsuite';
import UserController from "../../controller/userController";
import Toaster from "../../components/Toaster";
import userController from "../../controller/userController";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import Username from "../../components/User/Username";
import { MdNoFood } from 'react-icons/md';
import GroupCreationPage from "../Group/GroupCreationPage";
import GroupCard from "../Group/GroupCard";
import { AutoComplate, Panel } from "../../style/Style";
import Fatch from "../../Helpers/Fatcher";
import { GuestsTable } from "../Group/UsersTable";
import Avatar from "react-avatar";

export default function MePage() {
    const [myGroups, setmyGroups] = useState([]);
    const [myGroupLoader, setMyGroupLoader] = useState(true);
    const [removeLoad, setRemoveLoad] = useState(false);
    const [message, setMessage] = useState("");
    const [isNewRestaurant, setNewRestaurantState] = useState(false);

    const [guests, setGuests] = useState([]);
    const [guestsReload, setGuestsReload] = useState(false);


    const [searchUsername, setSearchUsername] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    const [inviteLoader, setInviteLoader] = useState(false);

    const toaster = Toaster();

    const navigate = useNavigate();

    const fetchMyGroups = () => {
        setMyGroupLoader(true)
        groupController.getMyGroups().then(({ data }) => {
            setmyGroups(data)
        }).finally(() => {
            setMyGroupLoader(false)
        });
    }

    useEffect(() => {

        if (!removeLoad) {
            fetchMyGroups()
        }
    }, [removeLoad]);

    const removeGroup = (id) => {
        setRemoveLoad(true)
        groupController.removeGroup(id).then(({ data }) => {
            setMessage(data)
            toaster.push("Group been removed successfully", "success")
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        }).finally(() => {
            setRemoveLoad(false)
        })
    }

    const SizeDropdown = ({ groupID, ...props }) => (
        <Dropdown {...props} >
            <Dropdown.Item onClick={() => removeGroup(groupID)}>remove</Dropdown.Item>
        </Dropdown>
    );

    const userCard = (username, name, picture) => {
        return (
            <div className='flex flex-row'>
                <Avatar name={name} src={picture} size={36} round={true} />
                <div className='flex flex-col px-2'>
                    {name}
                    <small>{username}</small>
                </div>
            </div>

        )
    }


    const submitGuest = (guestUsername) => {
        setInviteLoader(true)
        userController.submitGuest(guestUsername).then(({ data }) => {
            setGuestsReload(!guestsReload)
            setSearchWord('')
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        }).finally(() => {
            setInviteLoader(false)
        })
    }

    useEffect(() => {
        if (searchWord === "")
            return

        userController.searchGuest(searchWord).then(({ data }) => {
            setSearchData(data)
            let usernames = data.map(x => x.name + ":" + x.username)
            setSearchUsername(usernames)
        })
    }, [searchWord]);


    const [userMode, setUserMode] = useState(null);

    useEffect(() => {
        userController.getUserMode().then(({ data }) => {
            setUserMode(data)
        })
    }, []);

    const updateUserMode = (value) => {
        userController.updateUserMode(value).then(() => {
            setUserMode(value)
        })
    }

    const handleOnSelect = (item)=>{
        setSearchWord(item)
        submitGuest(item?.split(':')[1])
    }

    return (
        userMode != null ?
            userMode ?
                <div className="flex flex-col gap-4">

                    <Panel className={'py-2'} header={
                        <div className="flex flex-row justify-between w-full">
                            <div className="font-black">My Groups</div>
                            <button hidden={!myGroups?.length > 0} disabled={!userMode} className="normal px-3 rounded-md !text-base" onClick={() => setNewRestaurantState(true)}> + </button>
                        </div>
                    }>

                        {(!removeLoad && !myGroupLoader) ?
                            (myGroups?.length != 0) ? myGroups?.map((item) => {
                                return (
                                    <Row key={item.id} style={{ position: "relative" }} className="mb-3 mx-0">
                                        <GroupCard item={item} isOwner={true} />
                                        <SizeDropdown placement="topEnd" groupID={item.id} title="..." size="xs" style={{ position: "absolute", bottom: 1, right: 1, zIndex: 20 }} />
                                    </Row>
                                )
                            })
                                : <div className="flex flex-col items-center gap-2">
                                    <MdNoFood style={{ fontSize: "3em", width: "100%" }} />
                                    <div>you don't have any group order</div>
                                    <button disabled={!userMode} className="px-2 normal !rounded-full" onClick={() => setNewRestaurantState(true)}> Create new group order + </button>
                                </div>
                            : <FlexboxGrid justify="center">
                                <Loader size="md" content="Loading" />
                            </FlexboxGrid>
                        }

                    </Panel>
                    <Modal open={isNewRestaurant} onClose={() => setNewRestaurantState(false)} size="lg">

                        <GroupCreationPage afterSubmit={() => {
                            setNewRestaurantState(false)
                            fetchMyGroups()
                        }
                        } />
                    </Modal>
                    {/* <Divider /> */}

                    <Panel header={'Guests'} className='!p-0  !bg-transparent' shaded={false} hidden={!guests?.length > 0}>
                        <Fatch request={userController.getGuests} setData={setGuests} reload={guestsReload}>
                            <GuestsTable items={guests} onAction={() => setGuestsReload(!guestsReload)} />
                        </Fatch>
                    </Panel>

                    <div className='flex w-full justify-center'>
                        <div className='flex flex-row gap-2 w-96'>
                            <AutoComplate className={''} placeholder={'invite a guest by name or email..'} list={searchUsername} value={searchWord} onSelect={handleOnSelect} onChange={setSearchWord} renderItem={usrename => {
                                let user = searchData.find(x => x.username === usrename.split(':')[1]);
                                return userCard(user.name, user.username, user.picture)
                            }} />

                            <button className='normal px-4 rounded-md' disabled={searchWord.trim() === ''} onClick={() => submitGuest(searchWord?.split(':')[1])}>
                                {inviteLoader ? <Loader size='xs' /> : 'Add'}
                            </button>
                        </div>
                    </div>
                </div> :
                <div className="flex flex-col gap-2 w-full items-center mt-11">
                    <div className="text-lg">
                        Volunteer Mode <Toggle onClick={() => updateUserMode(!userMode)} checked={userMode} size="md" checkedChildren="ON" unCheckedChildren="OFF" />
                    </div>
                    <div className='font-light text-base'> Become a volunteer and share the delivery cost with your colleagues.</div>
                </div> : <><Loader /></>
    );
}
