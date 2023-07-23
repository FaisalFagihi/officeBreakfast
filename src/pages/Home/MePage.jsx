import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Grid, Panel, Button, Divider, InputGroup, Row, Col, Dropdown, AutoComplete, Avatar, PanelGroup, FlexboxGrid, Whisper, Tooltip, Modal } from "rsuite";
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
import { Panel as CustomPanel } from "../../style/Style";
import Fatch from "../../Helpers/Fatcher";
import { LeadersTable } from "../Group/UsersTable";

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

            <Panel hidden={(!myGroups?.length < 1 || myGroupLoader)}>
                <FlexboxGrid justify="start" > <h6>
                    Host group
                </h6>
                </FlexboxGrid>
            </Panel>

            <Panel header={
                <Grid fluid>
                    <Row>
                        <FlexboxGrid justify="space-between" align="middle">
                            <FlexboxGridItem>
                                My Host
                            </FlexboxGridItem>
                            <FlexboxGridItem>
                                <Row className="mt-2">
                                    <Col xs={24}>
                                        <Button className="bg-borderGray" block onClick={() => setNewRestaurantState(true)}> + </Button>
                                    </Col>
                                </Row>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Row>
                    <Row>
                        {/* <Divider className="mt-2" /> */}
                    </Row>
                </Grid>
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
                        : <MdNoFood style={{ fontSize: "3em", width: "100%" }} />
                    : <FlexboxGrid justify="center">
                        <Loader size="md" content="Loading" />
                    </FlexboxGrid>
                }
            </Panel>

            <Modal open={isNewRestaurant} onClose={() => setNewRestaurantState(false)} size="lg">
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

            <div className='flex flex-row'>
                {/* <Input value={guestPhone} onChange={(e) => setGuestPhone(e)} placeholder="Guest Phone" /> */}
                <AutoComplete
                    className="w-full"
                    placeholder="Search by Guest email or name.."
                    value={searchWord} onChange={(e) => setSearchWord(e)}
                    data={searchUsername}
                    renderMenuItem={usrename => {
                        let user = searchData.find(x => x.username === usrename.split(':')[1]);
                        return userCard(user.name, user.username)
                    }}
                />
                <button onClick={() => submitGuest(searchWord?.split(':')[1])}>add</button>
            </div>
            <CustomPanel header={'Guests'}>
                <Fatch request={userController.getGuests} setData={setGuests} reload={guestsReload}>
                    <LeadersTable items={guests} onAction={()=>setGuestsReload(!guestsReload)} />
                </Fatch>
            </CustomPanel>
        </div>
    );
}
