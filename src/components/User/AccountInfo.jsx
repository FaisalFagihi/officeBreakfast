import axiosInstance from "../../interceptors/axiosInstance"
import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom";
import { Col, Container, Grid, Row, Divider, InputGroup, Input, FlexboxGrid } from "rsuite";
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { IoPersonCircle } from 'react-icons/io5';
import Avatar from 'react-avatar';
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import auth from "../../modules/auth";
import { Panel } from "../../style/Style";




export default function AccountInfo() {

  function getUserInfo() {
    axiosInstance.get("me")
      .then(({ data }) => {
        setUserInfo(data);
        setFirstName(data.firstName)
        setLastName(data.lastName)
      }).catch((error) => {
        console.log(error);
      });
  };

  function getAddress() {
    axiosInstance.get("DeliveryApp/Address")
      .then(({ data }) => {
        setAddresses(data);
      }).catch((error) => {
        console.log(error);
      });
  };

  function checkConnectivity() {
    axiosInstance.get("DeliveryApp/me")
      .then((data) => {
        console.log(data)
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

  const [userInfo, setUserInfo] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [isConnected, setHungerStationConnectivity] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  let navigate = useNavigate();

  return (
    <Panel header={<h5>Info</h5>} className="p-5">
      <div className={'grid grid-cols-2 gap-2 items-center'}>
        <label>Email</label>
        <input value={auth.getUsername()} disabled className="rounded py-1 px-3 border-borderGray disabled:bg-gray" />
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
          <input placeholder="First Name" value={auth.getFirstName()} disabled className="rounded border-borderGray py-1 px-3 disabled:bg-gray" />
          <input placeholder="Last Name" value={auth.getLastName()} disabled className="rounded border-borderGray py-1 px-3 disabled:bg-gray" />
        </div>
        <div>
          <label>Photo</label>
        </div>
        <div className="">

        <img src={auth.getPicture()} className="rounded-full border-borderGray" />
        </div>
      </div>
    </Panel>
  )
}

