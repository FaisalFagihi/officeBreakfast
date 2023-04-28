import axiosInstance from "../../interceptors/axiosInstance"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AutoComplete, Avatar, Button, Col, Input, Panel, Row, Stack, Table } from "rsuite";
import UserController from "../../controller/userController";
import Toaster from "../Toaster";
import userController from "../../controller/userController";
import MemberIcon from '@rsuite/icons/Member';

const { Column, HeaderCell, Cell } = Table;



export default function UserGuests() {
  const [guests, setGuests] = useState([]);
  const [isGuestLoad, setGuestsLoad] = useState(false);
  const [isGuestAddedLoad, setGuestAddedLoad] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [responseMessage, setResponseMessage] = useState();
  const navigate = useNavigate();
  const toaster = Toaster()
  const [searchUsername, setSearchUsername] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    UserController.getGuests().then(({ data }) => {
      setGuests(data)
    }).catch(({ response }) => {
      toaster.push(response?.data, "error")
    })
  }, [])


  const submitGuest = (guestUsername) => {
    UserController.submitGuest(guestUsername).then(({ data }) => {
      setResponseMessage(data)
      UserController.getGuests().then(({ data }) => {
        setGuests(data)
      }).catch(({ response }) => {
        toaster.push(response?.data, "error")
      })
    }).catch(({ response }) => {
      toaster.push(response?.data, "error")
    })
  }

  const removeGuest = (guestUsername) => {
    UserController.removeGuest(guestUsername).then(() => {
      UserController.getGuests().then(({ data }) => {
        setGuests(data)
      }).catch(({ response }) => {
        toaster.push(response?.data, "error")
      })
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

  return (
    <Panel header={<h5>Guests</h5>} bordered>
      <Row >
        <Col xs={22}>
          {/* <Input value={guestPhone} onChange={(e) => setGuestPhone(e)} placeholder="Guest Phone" /> */}
          <AutoComplete
            placeholder="Search by Guest email or name.."
            value={searchWord} onChange={(e) => setSearchWord(e)}
            data={searchUsername}
            renderMenuItem={usrename => {
              let user = searchData.find(x => x.username === usrename.split(':')[1]);
              return userCard(user.name, user.username)
            }}
          />
        </Col>
        <Col xs={2}>
          <Button onClick={() => submitGuest(searchWord?.split(':')[1])} block>add</Button>
        </Col>
      </Row>
      <br />
      <Table data={guests} autoHeight={true}>
        <Column flexGrow={1}>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Phone</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
        <Column width={100}>
          <HeaderCell>...</HeaderCell>
          <Cell>
            {rawData => (
              <a href="#" onClick={() => removeGuest(rawData.username)}>
                Remove
              </a>
            )}
          </Cell>
        </Column>
      </Table>
    </Panel>
  );
}

