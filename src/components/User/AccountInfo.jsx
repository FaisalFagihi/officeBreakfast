import axiosInstance from "../../interceptors/axiosInstance"
import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom";
import { Col, Container, Grid, Panel, Row, Divider, InputGroup, Input, FlexboxGrid } from "rsuite";
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { IoPersonCircle } from 'react-icons/io5';
import Avatar from 'react-avatar';
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";




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
    refresh();
  }, [])

  const [userInfo, setUserInfo] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [isConnected, setHungerStationConnectivity] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  let navigate = useNavigate();

  return (
    <Panel header={<h5>Info</h5>} className="bg-white shadow-sm">
      <Grid fluid>
        <Row className="mb-2">
          <Col xs={12}>
            <label>Email</label>
          </Col>
          <Col xs={12}>
            <Input value={userInfo.username} readOnly disabled />
          </Col>
        </Row>
        {/* <Row>
          <Col xs={12}>
            <label> Statsus</label>
          </Col>
          <Col xs={12}>
            <div> <button onClick={() => { if (!isConnected) navigate("/HungerStationLink") }}>{isConnected ? "Connectd" : "Connect"} </button> </div>
          </Col>
        </Row> */}
        <Row>
          <Col xs={12}>
            <label>Name</label>
          </Col>
          <Col xs={12}>
            <InputGroup disabled>
              <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e)} />
              <Input style={{ borderLeft: "1px solid #ddd" }} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e)} />
            </InputGroup>
          </Col>
        </Row>
      </Grid>
    </Panel>
  )
}

