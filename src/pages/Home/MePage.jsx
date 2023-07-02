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

const Group = ({ item, isOwner, setRemoveLoad }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [interval, setTimerInterval] = useState();
    const navigate = useNavigate();
    const time = ((hours + minutes + seconds) > 0) ? <> {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} </>
        : <>Time Is Over</>

    const groupStatus = ['Collecting Orders..', 'Ordering..', 'Ship has sailed', 'Orders have arrived', 'Closed']


    const getTime = () => {
        let time = Date.parse(item.endDate) - Date.now()
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
        if (time < 0) {
            clearInterval(interval);
            setTimerInterval(undefined)
        }
    }


    useEffect(() => {

        clearInterval(interval);

        getTime(item.endDate)
        if (Date.parse(item.endDate) >= Date.now()) {
            setTimerInterval(setInterval(() => getTime(), 1000));
        }
    }, []);


    return <Panel className="bg-white shadow-md" bodyFill xs={24} style={{ filter: (item.status === 4) ? "grayscale(90%)" : "grayscale(0%)" }}>
        <div className="GroupItem panel" onClick={() => { navigate("/Group/" + item.id); }}>
            <img src={item.photo} className="object-cover h-32 w-full" alt='' draggable="false" />
            <div className="p-3">
                <Stack direction="row" justifyContent="space-between">
                    <h5>{item.name}</h5>
                    {time}
                </Stack>
                <Divider className="my-2" />
                <p>{groupStatus[item.status]}</p>
            </div>
        </div>
    </Panel>
}

export default function MePage() {
    const [myGroups, setmyGroups] = useState([]);
    const [myGroupLoader, setMyGroupLoader] = useState(true);
    const [removeLoad, setRemoveLoad] = useState(false);
    const [hostUsername, setHostUsername] = useState('');
    const [message, setMessage] = useState("");
    const [userOwners, setUserOwners] = useState([]);
    const [isNewRestaurant, setNewRestaurantState] = useState(false);

    const toaster = Toaster();

    const navigate = useNavigate();
const fetchMyGroups = ()=>{
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
            <Row>
                <Col>
                    <Avatar circle src="https://avatars.githubusercontent.com/u/12592949" alt="@superman66" />
                </Col>
                <Col>
                    <Row>
                        {name}
                    </Row>
                    <Row>
                        <small>{username}</small>
                    </Row>
                </Col>
            </Row>
        )
    }

  

    // Accepts the array and key
    const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    }

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
                                <Group item={item} isOwner={true} />
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
        </div>
    );
}
