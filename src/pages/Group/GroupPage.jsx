import React, { useEffect, useRef } from 'react'
import { Badge, Button, Container, FlexboxGrid, Input, InputGroup, List } from 'rsuite';
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
import { GroupStatus } from './GroupCard';
import { FcCheckmark } from 'react-icons/fc'
import { AiOutlineWarning } from 'react-icons/ai';
import { VscError } from 'react-icons/vsc';
import Fatch from '../../Helpers/Fatcher';



const GroupTimer = ({ endDate }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [interval, setTimerInterval] = useState();

    const time = <div className={`${((hours + minutes + seconds) > 0) ? 'text-black' : 'text-mainRed'}`}> {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} </div>

    const getTime = () => {
        let time = Date.parse(endDate + " GMT") - Date.parse(new Date().toUTCString())

        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
        // if (time < 0) {
        //     clearInterval(interval);
        //     setTimerInterval(undefined)
        // }
    }

    useEffect(() => {
        if (endDate === null)
            return;
        getTime()
        if (Date.parse(endDate + " GMT") >= Date.parse(new Date().toUTCString())) {
        }
        setTimerInterval(setInterval(() => getTime(), 1000));

    }, [endDate])

    useEffect(() => {


        return () => {
            clearInterval(interval)
        }
    }, [interval]);

    return time
}

const GroupCart = ({ userOrders, cartUsers, removeFromCart, isCheckout, isMobileHidden, children }) => {

    const header = <div>
        <div className='flex gap-2' >
            <h6>Cart ({userOrders?.length})</h6>
            <ConnectedUsers users={cartUsers} />
        </div>
        <small>{cartUsers?.length} people share the cart.</small>
    </div>

    const body = (userOrders?.length !== 0) ? <Cart cartItems={userOrders} isCheckout={isCheckout} removeFromCart={removeFromCart} />
        : <div style={{ textAlign: 'center', color: "#ccc" }}>Empty</div>

    return (
        <div className='mb-4'>
            <Panel className="bg-white shadow-sm hidden lg:block" header={header}>
                <div className='h-44 overflow-auto '>
                    {body}
                </div>
                {children}
            </Panel>

            <div className='block lg:hidden'>
                <div hidden={isMobileHidden} className='bg-white fixed z-10 w-full left-0 right-0 bottom-0 '>
                    <Panel className='border-t border-borderGray rounded-none lg:hidden' bodyFill header={header} collapsible>

                        <div className='h-28 overflow-auto px-4'>
                            {body}
                        </div>

                        {children}
                    </Panel>
                </div>
            </div>
        </div>
    )

}

const GroupActions = ({ onConfirmOrderClick, onCancelOrderClick, isConfirmed, isValid, changeOrderStatus }) => {
    return (
        <div className='grid grid-cols-4 gap-2 w-full pb-4 lg:p-0'>
            <button disabled={isConfirmed || !isValid} onClick={() => onConfirmOrderClick()} className={`${(isConfirmed && isValid) ? 'col-span-2' : 'col-span-4'} rounded-md p-2 text-sm focus:outline-none hover:outline-none focus:ring-2 focus:ring-inset focus:ring-white w-full bg-mainDarkGray text-white  disabled:bg-borderGray`}>{isConfirmed ? 'Confirmed' : 'Confirm'} </button>
            <button hidden={!isConfirmed || !isValid} onClick={() => onCancelOrderClick()} className={`col-span-2 p-2 text-sm focus:outline-none hover:outline-none focus:ring-2 focus:ring-inset focus:ring-white w-full bg-mainYello text-black rounded-md`}>Chnage</button>
        </div>)
}

const GroupControl = ({ status, changeStatus, timer, setTimer, changeTimer, delivery, setDelivery, changeDeliveryCost, isCartEmpty }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Panel header={<h6>Control</h6>} className="bg-white shadow-sm">
            <label className='mb-1' htmlFor="timerInput">Timer</label>
            <InputGroup disabled={status !== 0}
            >
                <Input type='Number' id="timerInput" onChange={(e) => setTimer(e)} value={timer} min={0} />
                <InputGroup.Button onClick={() => changeTimer(timer)}>
                    <ReloadIcon>Reset</ReloadIcon>
                </InputGroup.Button>
            </InputGroup>
            <label className='mt-2 mb-1' htmlFor="deliverInput">Delivery</label>
            <InputGroup disabled={status >= 3} >
                <Input id='deliverInput' type='Number' onChange={(e) => setDelivery(e)} value={delivery} min={0} />
                <InputGroup.Button onClick={() => changeDeliveryCost(delivery)}>
                    <ReloadIcon>Reset</ReloadIcon>
                </InputGroup.Button>
            </InputGroup>
            <Divider className="my-3" />
            <Stack alignItems='stretch' justifyContent='center' divider={<Divider vertical />} direction="column" disabled={status >= 4}>
                <Button block disabled={status === 0 || status === 4} onClick={() => changeStatus(0)} className='secondary'>Collecting</Button>
                <Button block disabled={status === 1 || isCartEmpty || status === 4} onClick={() => changeStatus(1)} className='secondary'>Ordering</Button>
                <Button block disabled={status === 0 || status === 2 || status === 4} onClick={() => changeStatus(2)} className='secondary'>Ordered</Button>
                <Button block disabled={status !== 2 || status === 4} onClick={() => changeStatus(3)} className='secondary'>Arrived</Button>
            </Stack>
            <Divider className="my-3" />
            <Button hidden={status >= 4} block style={{ background: "#bd5353", color: "white" }} onClick={() => setIsModalOpen(true)}>Cancel ?</Button>

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
                    <Button onClick={() => { changeStatus(4); setIsModalOpen(false) }} appearance="default">
                        Yes
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)} appearance="subtle">
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </Panel>)
}

const GroupHeader = ({ delivery, children }) => {
    return (<div className='flex flex-row justify-between items-center text-base mb-2'>

        <div className='font-semibold'>Delivery: {delivery?.toFixed(2)} SAR</div>
        <div className='flex flex-row gap-2 items-center justify-between'>
            {children}
        </div>
    </div>)
}

const GroupOrderingStatus = ({ isOwner, orderItems }) => {
    return (
        <div>

            <Panel header="Orders Review" hidden={!isOwner}>
                {orderItems?.length > 0 ?
                    <>
                        <List>
                            {orderItems?.map(({ uid, itemName, itemPrice, itemQty, modifiersList }, index) => (
                                <List.Item key={uid} index={index}>
                                    <FlexboxGrid align="middle" style={{ textAlign: "left" }}>
                                        <FlexboxGridItem>
                                            <b> {itemQty}x {itemName}
                                                {/* ({itemPrice} SAR) */}
                                            </b>

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
                        {/* <div>
        <div>Items total: {itemsTotal?.toFixed(1)} SAR</div>
        
        <div>Delivery cost: {delivery?.toFixed(1)} SAR</div>
        {(itemsTotal > 0) ? <b>Total: {(itemsTotal + delivery)?.toFixed(1)} SAR</b> : <>Total: 0</>}
    </div> */}
                    </>

                    : <>There are no orders</>
                }
            </Panel>
            <div>
                <img src='https://media.tenor.com/UxTmlMq2lgMAAAAd/writing-notes.gif' width={400} style={{ display: "block", border: "3px solid #ddd", boxShadow: "inner 0 0 2px 5px #333", marginLeft: "auto", marginRight: "auto" }} alt='Ordering gif' draggable="false" />
            </div>
        </div>
    )
}

const GroupOrderedStatus = ({ isOwner, confirmedOrders, handleOrderChange }) => {
    return (
        <Panel header="Receipt Check" hidden={!isOwner}>
            <p>Compare the actual receipt with the following one, they should be matched.</p>
            <p>If not guests shall be refunded/charged manually.</p>
            <br />
            <table className='w-full text-left'>
                <thead>
                    <tr>
                        <th>Username</th>
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
                    {confirmedOrders?.map(({ uid, name, itemName, itemPrice, itemQty, modifiersList, username }) => {
                        return <tr key={uid} className='border-t'>
                            <td>{name}</td>
                            <td> <input className='bg-white border w-full' onChange={(e) => handleOrderChange(username, uid, itemPrice, e.currentTarget.value, itemQty)} type='text' value={itemName} /> </td>
                            <td className=''>
                                <input className='bg-white text-center w-16 border' onChange={(e) => handleOrderChange(username, uid, e.currentTarget.value, itemName, itemQty)} type='number' value={itemPrice} /></td>
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
                            <td><input className='bg-white text-center w-14 border' onChange={(e) => handleOrderChange(username, uid, itemPrice, itemName, e.currentTarget.value)} min={0} type='number' value={itemQty} /></td>
                            <td>{((itemPrice * itemQty)
                                + (modifiersList?.map(x => x.price).reduce((partialSum, a) => partialSum + a, 0))).toFixed(2)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </Panel>)
}

export default function GroupPage({ id }) {
    const [loader, setLoader] = useState(false)

    const [delivery, setDelivery] = useState(0);
    const [endDate, setEndDate] = useState(0);

    const [group, setGroup] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const [deliveryCost, setDeliveryCost] = useState(10);
    const [users, setUsers] = useState([]);

    const [messages, setMessages] = useState([]);

    const [borderd, setBorderd] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const { groupID } = useParams();

    const [orderItems, setOrderItems] = useState([]);
    const toaster = Toaster();

    const [connectionStatus, setConnectionStatus] = useState(null);

    const [joiningLoder, setJoiningLoder] = useState(true);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (connectionStatus != null) {
            setJoiningLoder(false)
        }
    }, [connectionStatus]);

    useEffect(() => {
        if (group == null)
            return

        setIsOwner(auth.getUsername() === group.ownerName)
        setSelectedGroupStatus(group.status)
        setEndDate(group.endDate)
        setDeliveryCost(group.delivery)
        setDelivery(group.delivery)

        chatController.sign(setMessages, setUsers);
        chatController.joinRoom(parseInt(groupID));

        cartController.sign(setCartItems, setSelectedGroupStatus, setDelivery, setEndDate, parseInt(groupID), setConnectionStatus)
        cartController.joinRoom()
    }, [group]);





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

    const userOrders = cartItems?.filter(x => x.username === auth.getUsername())
    const peopleOrders = cartItems?.filter(x => x.username !== auth.getUsername() && x.isConfirmed)
    const confirmedOrders = cartItems?.filter(x => x.isConfirmed)
    const userOrderTotal = userOrders?.map(x => x.total).reduce((a, v) => a + v, 0);
    const isUserConfirmed = userOrders?.at(0)?.isConfirmed
    const userDelivery = cartItems?.filter(x => x.isConfirmed)?.length > 0 ? delivery / Object.keys(groupBy(cartItems?.filter(x => x.isConfirmed), 'username')).length : delivery;
    const [selectedGroupStatus, setSelectedGroupStatus] = useState(0);

    const changeOrderStatus = (groupStatusID) => {
        groupController.changeOrderingStatus(parseInt(groupID), groupStatusID, group?.name, group?.logo).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    }

    const changeDeliveryCost = (deliveryCost) => {
        groupController.changeDeliveryCost(parseInt(groupID), deliveryCost).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    }

    const changeTimer = (timer) => {
        // clearInterval(interval);

        groupController.changeTimer(parseInt(groupID), timer).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    }

    const addToCart = (item, Items) => {
        var oItem = Items.find(x => x.itemName === item.itemName && isEqual(x.modifiersList, item.modifiersList))
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
        cartItems?.filter(x => x.isConfirmed)?.map(x => Items = addToCart(x, Items))

        setOrderItems(Items)
    }
    useEffect(() => {


        // if (selectedGroupStatus === 1) {
        //     cartController.confirmOrder(true)
        //     prepareOrderingList()
        // }

        if (selectedGroupStatus === 2 && (orderItems.length === 0)) {
            prepareOrderingList()
        }
    }, [selectedGroupStatus]);

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

    const cartUsers = Object.keys(groupBy(cartItems?.filter(x => x.isConfirmed), 'username'));
    const itemsTotal = cartItems?.map(x => x.total).reduce((a, v) => a + v, 0);


    useEffect(() => {

        prepareOrderingList()
    }, [cartItems]);


    const cartRef = useRef(null);

    const scrollToCart = () => {
        const lastChildElement = cartRef.current?.lastElementChild;

        lastChildElement?.scrollIntoView();
    };


    const handleOrderChange = (username, id, price, itemName, itemQty) => {
        cartController.updateOrderPrice(username, id, price, itemName, itemQty).then(() => {

        })
    }



    const warning = <div className='flex justify-center '>
        <div className='flex  items-center gap-1 mb-1 bg-white rounded-full px-2'>
            <AiOutlineWarning size={18} />
            <div className='text-gray-400 font-light text-center text-base'>Delivery cost and items prices might be changed based on the actual receipt</div>
        </div>
    </div>


    return (
        // groupController.getGroup(groupID == null ? id : groupID).then(({data}) => {
        //     setGroup(data)
        // }).finally(() => {
        //     setLoader(true)
        // })
        <>


            <Fatch request={groupController.getGroup} params={groupID == null ? id : groupID} setData={setGroup}>
                {!joiningLoder ?

                    group ? connectionStatus ?
                        <Container className='p-0 mb-52 lg:mb-0'>
                            {warning}
                            <Row>
                                <Col className='mb-3' xs={24} lg={4} hidden={!isOwner}>
                                    <GroupControl changeStatus={changeOrderStatus} status={selectedGroupStatus} delivery={deliveryCost} setDelivery={setDeliveryCost} timer={timer} setTimer={setTimer} isCartEmpty={cartItems?.length == 0} changeDeliveryCost={changeDeliveryCost} changeTimer={changeTimer} />
                                </Col>
                                <Col className='mb-3' xs={24} lg={!isOwner ? 18 : 14}>
                                    <Panel className="bg-white shadow-sm" bordered={borderd} style={{ position: "relative" }} header={<div className='flex justify-between'>
                                        <div className='text-base font-semibold'>{group?.name} </div>
                                        {/* <div hidden={selectedGroupStatus != 0} >
                                            </div> */}
                                        <GroupTimer endDate={endDate} />
                                    </div>}>

                                        <GroupHeader delivery={userDelivery}>
                                            <GroupStatus className={'font-semibold'} status={selectedGroupStatus} />
                                        </GroupHeader>


                                        <Row>
                                            <Divider className='mt-0' />
                                        </Row>
                                        <Row hidden={selectedGroupStatus !== 0} >
                                            <div hidden={isUserConfirmed}>
                                                <MenuPage restaurantID={group?.restaurantID} menuSource={group?.menuSource} addToCart={cartController.addToCart} height={570} />
                                            </div>
                                            <div hidden={!isUserConfirmed}>
                                                <div className='flex flex-col gap-5 mt-10 items-center align-middle'>
                                                    <div className='flex flex-row gap-1 items-center text-xl'>
                                                        <FcCheckmark size={28} className='mb-2' />
                                                        Confirmed your order successfully
                                                    </div>
                                                    {/* <Panel className='w-full' header={`People Cart (${peopleOrders?.length})`}>
                                                        {(peopleOrders && peopleOrders?.length !== 0) ? <Cart cartItems={peopleOrders} isCheckout={selectedGroupStatus !== 0 || isUserConfirm} removeFromCart={cartController.removeFromCart} />
                                                            : <div style={{ textAlign: 'center', color: "#ccc" }}>Empty</div>
                                                        }                                            </Panel> */}
                                                </div>

                                                {/* <div className='px-4 grid grid-cols-2'>
                                            <div className='flex flex-col gap-2
                                            '>
                                                <div>
                                                    Group delivery: {deliveryCost} SAR
                                                </div>
                                                <div>
                                                    Delivery per person: {userDelivery} SAR
                                                </div>
                                            </div>
                                        </div> */}
                                            </div>
                                        </Row>
                                        <Row hidden={selectedGroupStatus !== 1}>
                                            <GroupOrderingStatus isOwner={isOwner} orderItems={orderItems} />
                                        </Row>
                                        <Row hidden={selectedGroupStatus !== 2 && selectedGroupStatus !== 3}>

                                            <GroupOrderedStatus isOwner={isOwner} confirmedOrders={confirmedOrders} handleOrderChange={handleOrderChange} />
                                        </Row>
                                        <Row hidden={selectedGroupStatus !== 2}>
                                            <img src='https://c.tenor.com/RjNXHT-Ejy0AAAAd/flyby-sailby.gif' style={{ display: "block", border: "3px solid #ddd", boxShadow: "inner 0 0 2px 5px #333", marginLeft: "auto", marginRight: "auto" }} alt='Ordering gif' draggable="false" />

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
                                                <Button className="secondary" hidden={!isOwner} block onClick={() => changeOrderStatus(5)} >Open</Button>
                                                <img src='https://media.tenor.com/Kjs1TtCLkVoAAAAC/open-closed.gif' style={{ display: "block", border: "3px solid #ddd", boxShadow: "inner 0 0 2px 5px #333", marginLeft: "auto", marginRight: "auto" }} alt='Ordering gif' draggable="false" />

                                            </Panel>
                                        </Row>
                                    </Panel>
                                </Col>

                                <Col xs={24} lg={6} >

                                    <GroupCart cartUsers={cartUsers?.map((user) => cartItems?.find(x => x.username === user))} userOrders={userOrders} removeFromCart={cartController.removeFromCart} isCheckout={selectedGroupStatus !== 0 || isUserConfirmed} isMobileHidden={!userOrderTotal} >

                                        <div className='flex justify-between flex-cols'>
                                            <div className='flex justify-between flex-col p-1 lg:px-1 w-full text-base'>

                                                <div className='py-2'>Total: <b>{(userOrderTotal + userDelivery)?.toFixed(1)} SAR </b></div>
                                            </div>
                                        </div>

                                        <GroupActions isConfirmed={isUserConfirmed} isValid={selectedGroupStatus == 0} onConfirmOrderClick={() => cartController.confirmOrder(true)} onCancelOrderClick={() => cartController.confirmOrder(false)} />
                                    </GroupCart>

                                    <Panel className="bg-white shadow-sm " bordered={borderd} header={<h6>Chat</h6>} >
                                        {chatController.connection ? <>
                                            <MessageContainer messages={messages} />
                                            <br />
                                            <SendMessageForm sendMessage={chatController.sendMessage} /> </> :
                                            <></>}
                                    </Panel>
                                </Col>
                            </Row>
                        </Container>
                        : <div className='text-lg flex flex-col items-center gap-2'>
                            <div>
                                Group Disconnected
                            </div>
                            <button className='px-5 p-1  border border-borderGray' onClick={() => location.reload()}>Refresh</button>

                        </div> : <div className='flex flex-col gap-2 items-center justify-center'>
                        <VscError size={36} />
                        <div className='text-lg'>
                            You are not allowed to be in this page
                        </div>
                    </div> : <div className='flex justify-center'> <Loader /> </div>}
            </Fatch>
        </>


    )
}
