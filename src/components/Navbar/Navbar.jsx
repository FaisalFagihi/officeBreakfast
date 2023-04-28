// import React, { useEffect, useState } from 'react'
// import "./Navbar.jsx.scss"
// // import { Navbar, Nav, Stack, Badge, List, Modal, Divider, Button } from 'rsuite';
// import OffIcon from '@rsuite/icons/Off';
// import HomeIcon from '@rsuite/icons/legacy/Home';
// import auth from '../../modules/auth'
// import notificationController from '../../controller/notificationController';
// import { IoNotificationsOffOutline } from 'react-icons/io5';
// import userController from "../../controller/userController"


// import { Badge, Nav, Stack } from 'rsuite';

// export const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
//     const [username, setUsername] = React.useState("");
//     const [logs, setLogs] = useState([]);
//     const [isNotificationOpen, setIsNotificationOpen] = useState(false);

//     React.useEffect(() => {
//         setUsername(auth.getName())
//     }, []);


//     const getUserLogs = () => {
//         userController.getUserLogs().then(({ data }) => {
//             console.log(data)
//             setLogs(data)
//             notificationController.init(setLogs)
//         })
//     }

//     const clearLogs = () => {
//         userController.clearLogs().then(() => {
//             getUserLogs()
//         })
//     }


//     return (<>
//         <Navbar  {...props} style={{ background: "#222", borderBottom: "2px solid #efa14dcc", color: "#FFF" }}>
//             <Navbar.Brand href="#">BrekfastGroup</Navbar.Brand>
//             <Nav onSelect={onSelect} activeKey={activeKey}>
//                 <Nav.Item href="/" eventKey="1" icon={<HomeIcon />}>
//                     Home
//                 </Nav.Item>
//                 <Nav.Item href="/restaurants" eventKey="2">Restaurants</Nav.Item>
//                 <Nav.Item href="/orders" eventKey="3">Orders</Nav.Item>
//                 <Nav.Menu title="Profile">
//                     <Nav.Item>
//                         <a href="/profile">
//                             Account
//                         </a>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <a href="/Wallet">
//                             Wallet
//                         </a>
//                     </Nav.Item>
//                 </Nav.Menu>
//             </Nav>
//             <Nav pullRight>
//                 <Stack>
//                     <Nav.Item onClick={() => setIsNotificationOpen(true)}>
//                         <Badge content={logs.length} color="green" className="px-2" >
//                             {username}

//                         </Badge>
//                     </Nav.Item> |
//                     <Nav.Item href="/" onClick={() => auth.logout()} icon={<OffIcon />}>Logout</Nav.Item>
//                 </Stack>
//             </Nav>
//         </Navbar>

//         <Modal overflow={true} open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} >
//             <Modal.Header>
//                 <div className="ModifierItemName"> Notifications</div>
//                 <Divider className='m-0' />
//             </Modal.Header>
//             <Modal.Body>
//                 <div>
//                     <List>
//                         {logs?.map(({ submitDateFormated, message }, index) => (
//                             <List.Item key={index} index={index}>
//                                 {message}
//                                 <br /><small>{submitDateFormated}:</small>
//                             </List.Item>
//                         ))}

//                     </List>
//                     <IoNotificationsOffOutline hidden={logs?.length > 0} style={{ fontSize: "8em", width: "100%" }} className="m-auto" />
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button block onClick={() => clearLogs()}>Clear all</Button>
//             </Modal.Footer>
//         </Modal>

//     </>
//     );
// }

// export  function Navbar0() {

//     return (
//         <div className="Navbar">
//             <a href="/">
//                 Home
//             </a>
//             |
//             <a href="/vendors">
//                 Restaurants
//             </a>
//             |
//             <a href="/orders">
//                 Orders
//             </a>
//             |
//             <a href="/wallet">
//                 Wallet
//             </a>
//             |
//             <a href="/Profile">
//                 Profile
//             </a>
//             |
//             <a href="/mygroup">
//                 MyGroup
//             </a>
//         </div>
//     )
// }


