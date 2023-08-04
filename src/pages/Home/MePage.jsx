import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Grid, Button, Divider, InputGroup, Row, Col, Dropdown, AutoComplete, PanelGroup, FlexboxGrid, Whisper, Tooltip, Modal } from "rsuite";
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
import { Panel } from "../../style/Style";
import Fatch from "../../Helpers/Fatcher";
import { GuestsTable } from "../Group/UsersTable";
import Avatar from "react-avatar";

export default function MePage() {
    const [myGroups, setmyGroups] = useState([]);
    const [myGroupLoader, setMyGroupLoader] = useState(true);
    const [removeLoad, setRemoveLoad] = useState(false);
    const [hostUsername, setHostUsername] = useState('');
    const [message, setMessage] = useState("");
    const [userOwners, setUserOwners] = useState([]);
    const [isNewRestaurant, setNewRestaurantState] = useState(false);

    const [guests, setGuests] = useState([]);
    const [guestsReload, setGuestsReload] = useState(false);


    const [myInvitations, setMyInvitations] = useState([]);
    const [invatationReload, setInvatationReload] = useState(false);
    const [searchUsername, setSearchUsername] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    const [joinRequests, setJoinRequests] = useState([]);
    const [requestReload, setRequestReload] = useState(false);

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
        userController.submitGuest(guestUsername).then(({ data }) => {
            setGuestsReload(!guestsReload)

        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }

    useEffect(() => {
        if (searchWord === "")
            return

        userController.searchGuest(searchWord).then(({ data }) => {
            setSearchData(data)
            let usernames = data.map(x => x.name + ":" + x.username)
            setSearchUsername(usernames)
            console.log(data)
        })
    }, [searchWord]);


    return (
        <div>
            <div className="flex justify-between mb-2">

                <div className="text-lg">
                    My Host
                </div>
                <button className="bg-transparent border-borderGray py-1 px-2 align-middle text-center font-sans" onClick={() => setNewRestaurantState(true)}> + </button>
            </div>

            {(!removeLoad && !myGroupLoader) ?
                (myGroups?.length != 0) ? myGroups?.map((item) => {
                    return (
                        <Row key={item.id} style={{ position: "relative" }} className="mb-3 mx-0">
                            <GroupCard item={item} isOwner={true} />
                            <SizeDropdown placement="topEnd" groupID={item.id} title="..." size="xs" style={{ position: "absolute", bottom: 1, right: 1, zIndex: 20 }} />
                        </Row>
                    )
                })
                    : <MdNoFood style={{ fontSize: "3em", width: "100%" }} />
                : <FlexboxGrid justify="center">
                    <Loader size="md" content="Loading" />
                </FlexboxGrid>
            }

            <Modal  open={isNewRestaurant} onClose={() => setNewRestaurantState(false)} size="lg">
                <Modal.Header>
                    New Host
                </Modal.Header>
                <Modal.Body>
                    <GroupCreationPage afterSubmit={() => {
                        setNewRestaurantState(false)
                        fetchMyGroups()
                    }
                    } />
                </Modal.Body>
            </Modal>
            <div className="my-5" />
            <Divider />

            <Panel header={'Guests'} className='!p-0  !bg-transparent' shaded={false}>
                <Fatch request={userController.getGuests} setData={setGuests} reload={guestsReload}>
                    <GuestsTable items={guests} onAction={() => setGuestsReload(!guestsReload)} />
                </Fatch>
            </Panel>
            <div className="mx-2"> 

                <InputGroup size="md">
                    <AutoComplete
                        className='!border-none !bg-none !shadow-none'
                        placeholder="add a guest by name or email.."
                        value={searchWord} onChange={(e) => setSearchWord(e)}
                        data={searchUsername}
                        size="md"

                        renderMenuItem={usrename => {
                            let user = searchData.find(x => x.username === usrename.split(':')[1]);
                            return userCard(user.name, user.username, user.picture)
                        }}
                    />
                    <InputGroup.Button disabled={searchWord.trim() === ''} onClick={() => submitGuest(searchWord?.split(':')[1])}>
                        Add
                    </InputGroup.Button>
                </InputGroup>
            </div>
        </div>
    );
}
