import axiosInstance from "../../interceptors/axiosInstance"
import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom";
import { Col, Container, Grid, Row, Divider, InputGroup, Input, FlexboxGrid, Toggle } from "rsuite";
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { IoPersonCircle } from 'react-icons/io5';
import Avatar from 'react-avatar';
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import auth from "../../modules/auth";
import { Panel } from "../../style/Style";
import userController from "../../controller/userController";
import { FiRefreshCcw } from "react-icons/fi";




export default function AccountInfo() {

  function getUserInfo() {
    axiosInstance.get("me")
      .then(({ data }) => {
        setUserInfo(data);
        setFirstName(data.firstName)
        setLastName(data.lastName)
      }).catch((error) => {
      });
  };

  function getAddress() {
    axiosInstance.get("DeliveryApp/Address")
      .then(({ data }) => {
        setAddresses(data);
      }).catch((error) => {
      });
  };

  function checkConnectivity() {
    axiosInstance.get("DeliveryApp/me")
      .then((data) => {
        setHungerStationConnectivity(true);
      }).catch((error) => {
        this.isConnected = false;
      });
  };

  function refresh() {
    getUserInfo();
    //getAddress();
    checkConnectivity();

  };

  useEffect(() => {
    // refresh();
  }, [])

  const [userMode, setUserMode] = useState(false);
  const [balanceLimit, setBalanceLimit] = useState(0);
  useEffect(() => {

    getVoluneerInfo()
  }, []);

  const updateUserMode = (value) => {
    userController.updateUserMode(value).finally(() =>{
      getVoluneerInfo()
    })
  }

const getVoluneerInfo = ()=>{
  userController.getVoluneerInfo().then(({data})=>{
    console.log('data',data)
    setBalanceLimit(data?.volunteerBalanceLimit)
    setUserMode(data?.isVolunteer)
  })
}

  const updateBalanceLimit = (value)=>{
    userController.updateVolunteerBalanceLimit(value).finally(()=>{
      
      getVoluneerInfo()

    })
  }
  return (
    <div className={'grid grid-cols-2 gap-2 items-center'}>
      <label>Email</label>
      <input value={auth.getUsername()} disabled className="input rounded py-1 px-3 border-borderGray disabled:bg-gray" />
      {/* <Row>
          <Col xs={12}>
          <label> Statsus</label>
          </Col>
          <Col xs={12}>
          <div> <button onClick={() => { if (!isConnected) navigate("/HungerStationLink") }}>{isConnected ? "Connectd" : "Connect"} </button> </div>
          </Col>
        </Row> */}

      <div>
        <label>Name</label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input placeholder="First Name" value={auth.getFirstName()} disabled className="input rounded border-borderGray py-1 px-3 disabled:bg-gray" />
        <input placeholder="Last Name" value={auth.getLastName()} disabled className="input rounded border-borderGray py-1 px-3 disabled:bg-gray" />
      </div>
      <div>
        <label>Photo</label>
      </div>
      <div>
        <Avatar name={auth.getName()} src={auth.getPicture()} size={100} round={true} />
      </div>
      <div className="">
        Volunteer Mode
      </div>
      <Toggle onClick={() => updateUserMode(!userMode)} checked={userMode} size="md" checkedChildren="ON" unCheckedChildren="OFF" />

      <div className="">
        Volunteer Balance Limit
      </div>
      <div className="flex gap-1">
        <input type="number" value={balanceLimit} min={-100} max={0} onChange={(e)=>setBalanceLimit(e.target.value)} className="input disabled:bg-gray" />
        <button className="normal px-4 rounded-md" onClick={()=> updateBalanceLimit(balanceLimit)} ><FiRefreshCcw size={16} /></button>
      </div>
    </div>
  )
}

