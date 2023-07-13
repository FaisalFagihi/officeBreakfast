import React, { useEffect } from 'react'
import { Button, Container, FlexboxGrid, Input, InputGroup, List } from 'rsuite';
import { Row, Col, Stack } from 'rsuite';
import { Panel, Divider } from 'rsuite';
import { Loader } from 'rsuite';
import StackItem from 'rsuite/esm/Stack/StackItem';
import { useNavigate, useParams } from 'react-router-dom';
import ConnectedUsers from '../../components/ChatHub/ConnectedUsers';
import chatController from '../../controller/chatController';
import { useState } from 'react';
import MessageContainer from '../../components/ChatHub/MessageContainer';
import SendMessageForm from '../../components/ChatHub/SendMessageForm';
import cartController from '../../controller/cartController';
import Cart from './Cart';
import auth from '../../modules/auth';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import groupController from '../../controller/groupController';
import MenuPage from '../Restaurant/MenuPage';
import ReloadIcon from '@rsuite/icons/Reload';
import { OrdersTable } from './OrdersPage';
import { Modal } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import Toaster from '../../components/Toaster';
import { Popover, Whisper } from 'rsuite';

export default function GroupPage({ id }) {
    const [loader, setLoader] = useState(false)

    const [delivery, setDelivery] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [group, setGroup] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const [timer, setTimer] = useState(10);
    const [deliveryCost, setDeliveryCost] = useState(10);
    const [users, setUsers] = useState([]);

    const [messages, setMessages] = useState([]);

    const [borderd, setBorderd] = useState(false);
    const [interval, setTimerInterval] = useState();
    const [isOwner, setIsOwner] = useState(false);
    const { groupID } = useParams();

    const [orderItems, setOrderItems] = useState([]);
    const toaster = Toaster();

    useEffect(() => {
        groupController.getGroup(groupID == null ? id : groupID).then(({ data }) => {
            setGroup(data)
            console.log("setGroup")
        }).finally(() => {
            setLoader(true)
        })

    }, []);

    useEffect(() => {
        if (group == null)
            return

        setIsOwner(auth.getUsername() === group.ownerName)
        console.log(group.ownerName)
        console.log(auth.getUsername())
        setSelectedGroupStatus(group.status)
        setEndDate(group.endDate)
        setDeliveryCost(group.delivery)
        setDelivery(group.delivery)

        chatController.sign(setMessages, setUsers);
        chatController.joinRoom(parseInt(groupID));

        cartController.sign(setCartItems, setSelectedGroupStatus, setDelivery, setEndDate, parseInt(groupID))
        cartController.joinRoom()
    }, [group]);

    const getTime = () => {
        let time = Date.parse(endDate) - Date.now()
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
        if (time < 0) {
            clearInterval(interval);
            setTimerInterval(undefined)
        }
    }

    useEffect(() => {
        if (endDate === null)
            return;

        getTime(endDate)
        if (Date.parse(endDate) >= Date.now()) {
            setTimerInterval(setInterval(() => getTime(), 1000));
        }

    }, [endDate])

    useEffect(() => {


        return () => {
            clearInterval(interval)
        }
    }, [interval]);

    const isEqual = (a, b) => {
        a = a.sort((a, b) => (a.id > b.id ? 1 : 0));
        b = b.sort((a, b) => (a.id > b.id ? 1 : 0));
        // If length is not equal
        if (a.length !== b.length)
            return false;
        else {
            // Comparing each element of array
            for (var i = 0; i < a.length; i++)
                if (a[i].id !== b[i].id)
                    return false;
            return true;
        }
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

    const time = ((hours + minutes + seconds) > 0) ? <> {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} </>
        : <>Time Is Over</>
    const items = cartItems.filter(x => x.username === auth.getUsername()).map(x => x.total).reduce((a, v) => a + v, 0);
    const userDelivery = cartItems?.length > 0 ? delivery / Object.keys(groupBy(cartItems, 'username')).length : delivery;

    const groupStatus = ['Collecting Orders..', 'Ordering..', 'Ship has sailed', 'Orders have arrived']
    const [selectedGroupStatus, setSelectedGroupStatus] = useState(0);

    const changeOrderStatus = (groupStatusID) => {
        groupController.changeOrderingStatus(parseInt(groupID), groupStatusID).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    }

    const changeDeliveryCost = (deliveryCost) => {
        groupController.changeDeliveryCost(parseInt(groupID), deliveryCost).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    }

    const changeTimer = (timer) => {
        clearInterval(interval);

        groupController.changeTimer(parseInt(groupID), timer).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    }

    useEffect(() => {
        const addToCart = (item, Items) => {

            var oItem = Items.find(x => x.id === item.id && isEqual(x.modifiersList, item.modifiersList))
            //var oItem = Items.find(x => x.id === item.id)
            if (oItem !== undefined) {
                oItem.itemQty += item.itemQty;
                return Items;
            } else {
                return [...Items, JSON.parse(JSON.stringify(item))]
            }
        }

        const prepareOrderingList = () => {
            let Items = []
            changeTimer(0.01)
            cartItems?.map(x => Items = addToCart(x, Items))

            setOrderItems(Items)
        }

        if (selectedGroupStatus === 1) {
            prepareOrderingList()
        }

        if (selectedGroupStatus === 2 && (orderItems.length === 0)) {
            prepareOrderingList()
        }

    }, [cartItems, selectedGroupStatus]);

    const navigate = useNavigate();
    const checkOut = () => {
        groupController.checkOut(parseInt(groupID)).then((data) => {
            navigate("/")
            toaster.push("Group checked out successfully", "success")
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    }

    const [isModalOpen, setIsModalOpen] = useState();

    const cartUsers = Object.keys(groupBy(cartItems, 'username'));
    return (
        loader ? <>
            <Container className='p-3'>
                {/* <Row>
                    <InputPicker defaultValue={orderStatus[0].value} data={orderStatus} style={{ width: 224 }} />
                </Row> */}
                <Row>
                    <Col className='mb-3' xs={24} lg={4} hidden={!isOwner}>
                        {/* <Row>
                            <Panel shaded bordered={borderd} header={<h6>Connected ({users.length})</h6>}>
                                <ConnectedUsers users={users} />
                            </Panel>
                        </Row> */}
                        <Panel bordered={borderd} header={<h6>Control</h6>} className="bg-white shadow-sm">
                            <label className='mb-1' htmlFor="timerInput">Timer</label>
                            <InputGroup disabled={selectedGroupStatus !== 0}
                            >
                                <Input type='Number' id="timerInput" onChange={(e) => setTimer(e)} value={timer} min={0} />
                                <InputGroup.Button onClick={() => changeTimer(timer)}>
                                    <ReloadIcon>Reset</ReloadIcon>
                                </InputGroup.Button>
                            </InputGroup>
                            <label className='mt-2 mb-1' htmlFor="deliverInput">Delivery</label>
                            <InputGroup disabled={selectedGroupStatus >= 3} >
                                <Input id='deliverInput' type='Number' onChange={(e) => setDeliveryCost(e)} value={deliveryCost} min={0} />
                                <InputGroup.Button onClick={() => changeDeliveryCost(deliveryCost)}>
                                    <ReloadIcon>Reset</ReloadIcon>
                                </InputGroup.Button>
                            </InputGroup>
                            <Divider className="my-3" />
                            <Stack alignItems='stretch' justifyContent='center' divider={<Divider vertical />} direction="column" disabled={selectedGroupStatus >= 4}>
                                <Button block disabled={selectedGroupStatus === 0 || selectedGroupStatus === 4} onClick={() => changeOrderStatus(0)} className='secondary'>Collecting</Button>
                                <Button block disabled={selectedGroupStatus === 1 || cartItems?.length === 0 || selectedGroupStatus === 4} onClick={() => changeOrderStatus(1)} className='secondary'>Ordering</Button>
                                <Button block disabled={selectedGroupStatus === 0 || selectedGroupStatus === 2 || selectedGroupStatus === 4} onClick={() => changeOrderStatus(2)} className='secondary'>Ordered</Button>
                                <Button block disabled={selectedGroupStatus !== 2 || selectedGroupStatus === 4} onClick={() => changeOrderStatus(3)} className='secondary'>Arrived</Button>
                            </Stack>
                            <Divider className="my-3" />
                            <Button hidden={selectedGroupStatus >= 4} block style={{ background: "#bd5353", color: "white" }} onClick={() => setIsModalOpen(true)}>Cancel ?</Button>

                            <Modal backdrop="static" role="alertdialog" keyboard={false} open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <Modal.Header>
                                    <Modal.Title>Group Cancellation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
                                    Canelling the group will clear the cart and close the group.
                                    Are you sure that you want to cancel this group?!
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => { changeOrderStatus(4); setIsModalOpen(false) }} appearance="default">
                                        Yes
                                    </Button>
                                    <Button onClick={() => setIsModalOpen(false)} appearance="subtle">
                                        No
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Panel>

                    </Col>
                    <Col className='mb-3' xs={24} lg={!isOwner ? 18 : 14}>
                        <Panel className="bg-white shadow-sm" bordered={borderd} header={<div className='text-lg'>{group?.name}</div>} style={{ position: "relative", minHeight: 843 }} >
                            <Row>
                                <Col xs={6}>
                                    <Stack spacing={5}>
                                        <StackItem>
                                            <div className="text-base float-left font-bold">Delivery {delivery} SAR </div>
                                        </StackItem>
                                        <StackItem>
                                            {group?.promotionName != null ? <div className='Promotion'> ({group.promotionName}) </div> : <></>}
                                        </StackItem>
                                    </Stack>
                                </Col>
                                <Col xs={12} style={{ textAlign: "center" }}>
                                    <div className="text-base">
                                        {groupStatus[selectedGroupStatus]}
                                    </div>
                                </Col>
                                <Col xs={6}>

                                    <div className="text-base float-right font-bold" > {time} </div>
                                </Col>
                                <img src='https://lf16-adcdn-va.ibytedtos.com/obj/i18nblog//images/916cfdb23feb3d4101060bbf755cbdcd.jpg' alt='logo' className='h-14' style={{ position: "absolute", top: 0, right: 0, opacity: 0.7, borderRadius: "0px 0px 0px 15px" }} draggable="false" />
                            </Row>
                            <Row>
                                <Divider className='mt-0' />
                            </Row>
                            <Row hidden={selectedGroupStatus !== 0}>
                                <Loader className="m-auto" hidden={true} />
                                <MenuPage restaurantID={group?.restaurantID} menuSource={group?.menuSource} addToCart={cartController.addToCart} height={570} />
                            </Row>
                            <Row hidden={selectedGroupStatus !== 1}>
                                <Panel header="Orders Review" hidden={!isOwner}>
                                    {orderItems?.length > 0 ?
                                        <>
                                            <List>
                                                {orderItems?.map(({ uid, itemName, itemPrice, itemQty, modifiersList }, index) => (
                                                    <List.Item key={uid} index={index}>
                                                        <FlexboxGrid align="middle" style={{ textAlign: "left" }}>
                                                            <FlexboxGridItem colspan={22}>
                                                                <b> {itemQty}x {itemName} ({itemPrice} SAR) </b>

                                                                {modifiersList?.map(({ name, price }, index) => {
                                                                    return <p key={index.toString()} index={index}>
                                                                        {name} {price} SAR
                                                                    </p>
                                                                })}
                                                            </FlexboxGridItem>
                                                        </FlexboxGrid>
                                                    </List.Item>
                                                ))}
                                            </List>
                                            <br />
                                            <div>
                                                <div>Items total: {items} SAR</div>

                                                <div>Delivery cost: {userDelivery} SAR</div>
                                                {(items > 0) ? <b>Total: {items + userDelivery} SAR</b> : <>Total: 0</>}
                                            </div>
                                        </>

                                        : <>There are no orders</>
                                    }
                                </Panel>
                                <img src='https://media.tenor.com/UxTmlMq2lgMAAAAd/writing-notes.gif' width={400} style={{ display: "block", border: "3px solid #ddd", boxShadow: "inner 0 0 2px 5px #333", marginLeft: "auto", marginRight: "auto" }} alt='Ordering gif' draggable="false" />
                            </Row>

                            <Row hidden={selectedGroupStatus !== 2}>
                                <Panel header="Receipt Check" hidden={!isOwner}>
                                    <p>Compare the actual receipt with the following one, they should be matched.</p>
                                    <p>If not guests shall be refunded/charged manually.</p>
                                    <br />
                                    <table className='w-full text-left'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>
                                                    Modifiers
                                                </th>
                                                <th>QTY</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderItems?.map(({ uid, itemName, itemPrice, itemQty, modifiersList }) => {
                                                return <tr key={uid} className='border-t'>
                                                    <td>{itemName}</td>
                                                    <td>{itemPrice.toFixed(2)}</td>
                                                    <td className='p-0'>
                                                        <table size="sm" className='m-0' style={{ borderColor: "transparent" }} >
                                                            <tbody>
                                                                {modifiersList?.length > 0 ?
                                                                    modifiersList.map((item) => {
                                                                        return <tr key={item.id}>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.price.toFixed(2)}</td>
                                                                        </tr>
                                                                    })

                                                                    : <tr><td>N/A</td></tr>}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td>{itemQty}</td>
                                                    <td>{((itemPrice * itemQty)
                                                        + (modifiersList?.map(x => x.price).reduce((partialSum, a) => partialSum + a, 0))).toFixed(2)}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </Panel>
                                <img src='https://j.gifs.com/J6NyEv.gif' style={{ display: "block", border: "3px solid #ddd", boxShadow: "inner 0 0 2px 5px #333", marginLeft: "auto", marginRight: "auto" }} alt='Ordering gif' draggable="false" />

                            </Row>

                            <Row hidden={selectedGroupStatus !== 3}>
                                <Panel hidden={!isOwner}>
                                    <p>By checking out all the guests will be charged and cart will be cleared.</p>
                                    <br />
                                    <Button className='secondary' block disabled={selectedGroupStatus !== 2 && selectedGroupStatus !== 3} onClick={() => checkOut()}>Checkout</Button>

                                </Panel>
                                <img src='https://media.tenor.com/ip354kQhpVsAAAAC/foods-delivered.gif' style={{ display: "block", border: "3px solid #ddd", boxShadow: "inner 0 0 2px 5px #333", marginLeft: "auto", marginRight: "auto" }} alt='Ordering gif' draggable="false" />

                            </Row>
                            <Row hidden={selectedGroupStatus !== 4}>
                                <Panel>
                                    <h5>Group is closed</h5>
                                    <Button className="secondary" hidden={!isOwner} block onClick={() => changeOrderStatus(0)} >Open</Button>
                                    <img src='https://media.tenor.com/Kjs1TtCLkVoAAAAC/open-closed.gif' style={{ display: "block", border: "3px solid #ddd", boxShadow: "inner 0 0 2px 5px #333", marginLeft: "auto", marginRight: "auto" }} alt='Ordering gif' draggable="false" />

                                </Panel>
                            </Row>
                        </Panel>
                    </Col>
                    <Col xs={24} lg={6} >
                        {/* <Divider className='mt-1 mb-3'>Cart</Divider> */}

                        <Panel className="bg-white shadow-sm" bordered={borderd} header={
                            <>
                                <h6>Cart ({cartItems?.length})</h6>
                                <Whisper
                                    placement="top"
                                    controlId="control-id-context-menu"
                                    trigger="click"
                                    speaker={<Popover><ConnectedUsers users={cartUsers?.map((user) => {
                                        return cartItems?.find(x => x.username === user)
                                    })} /></Popover>}
                                >
                                    <small>{cartUsers?.length} people share the cart.</small>
                                </Whisper>
                            </>
                        }>


                            {(cartItems && cartItems?.length !== 0) ? <Cart cartItems={cartItems} isCheckout={selectedGroupStatus !== 0} removeFromCart={cartController.removeFromCart} height={305} />
                                : <div style={{ textAlign: 'center', color: "#ccc", height: 305 }}>Empty</div>}
                            <br />
                            
                            <div className=''>
                                <div>Items: {items} SAR</div>

                                <div>Delivery: {userDelivery} SAR</div>
                                {(items > 0) ? <b>Total: {items + userDelivery} SAR</b> : <>Total: 0</>}
                                {/* <Button appearance='primary' disabled={cartItems.length === 0} block>Confirm</Button> */}

                            </div>
                        </Panel>
                        <Panel className="bg-white mt-3 shadow-sm" bordered={borderd} header={<h6>Chat</h6>} >
                            {chatController.connection ? <>
                                <MessageContainer messages={messages} />
                                <br />
                                <SendMessageForm sendMessage={chatController.sendMessage} /> </> :
                                <></>}
                        </Panel>
                    </Col>
                </Row>
            </Container>
        </> : <></>

    )
}
