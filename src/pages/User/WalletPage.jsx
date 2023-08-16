import React, { useEffect } from 'react'
import { useState } from 'react';
import { Grid, Input, Nav, Panel, Button, Col, Row, Divider, Stack, InputGroup, Badge } from 'rsuite';
import { Modal } from 'rsuite';
import Toaster from '../../components/Toaster';
import groupController from '../../controller/groupController';
import UserController from '../../controller/userController';
import auth from '../../modules/auth';
import { OrdersTable } from '../Group/OrdersPage';
import { CiReceipt } from 'react-icons/ci';
import Transactions from '../../components/User/Transactions';

const GuestBalence = ({ guestUsername, guestName, balence, records, onInsertRecord }) => {
  const [amount, setAmount] = useState(0)
  const [remark, setRemark] = useState(null)
  const [selectedOrderItem, setSelectedOrderItem] = useState();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState();
  const toaster = Toaster();
  const addNewWalletRecord = () => {
    UserController.submitWalletRecord(guestUsername, parseFloat(amount), '').then(() => {
      onInsertRecord();
      toaster.push("New record been added successfully", "success")
    }).catch(({ response }) => {
      toaster.push(response?.data, "error")
    })
  }
  let balenceLabel = (balence < 0) ? " owes you " : " has "

  return (
    <Panel bordered className='my-3'
      header=
      {
        <Grid fluid >
          <Row >
            <Col xs={24} sm={18} className='pt-2'>
              {guestName + balenceLabel} (<p style={{ color: balence < 0 ? "red" : "green", display: "inline-block" }}> {balence.toFixed(2)}</p>) SAR
            </Col>
            <Col xs={24} sm={6} className='pt-2'>
              <InputGroup >
                <Input type='number' value={amount} onChange={(e) => setAmount(e)} placeholder="0.0" />

                <InputGroup.Button onClick={() => addNewWalletRecord()}>
                  Add
                </InputGroup.Button>
              </InputGroup>
            </Col>
          </Row>
        </Grid>
        // <Divider className="my-2" />
      }>

      <Grid fluid >
        <Row>
          <Col xs={24}>
            <Panel collapsible bordered header="Transactions">
              <Transactions records={records} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Panel>
  )
}

export default function WalletPage() {
  const [wallets, setWalletRecords] = useState(null);
  const [guests, setGuests] = useState(null);
  const toaster = Toaster();

  useEffect(() => {
    UserController.getWallet().then(({ data }) => {
      setWalletRecords(data)
    }).catch(({ response }) => {
      toaster.push(response?.data, "error")
    })

    getGuestRecords();

  }, []);

  const getGuestRecords = () => {
    UserController.getGuestsBalence().then(({ data }) => {
      setGuests(data)

    }).catch(({ response }) => {
      toaster.push(response?.data, "error")
    })
  }

  // var groupBy = function(xs, key) {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };

  const [active, setActive] = React.useState(1);
  return (
    <div className='m-5'>
      <Nav appearance="subtle" active={active} onSelect={setActive} activeKey={active} style={{ marginBottom: 50 }}>
        <Nav.Item eventKey={1}>Me</Nav.Item>
        <Nav.Item hidden={guests == null} eventKey={2}>
          Guests [{guests?.length}]
        </Nav.Item>
      </Nav>
      <div hidden={active !== 1}>
        {wallets?.map((wallet, index) => {
          return (<Panel className='my-3' collapsible bordered key={index} header={(wallet.ownerName === auth.getUsername()) ? "My Transactions" : "Owe " + wallet.name + ` (${wallet.balence.toFixed(2)})`} >
            <Transactions records={wallet.records} />
          </Panel>)
        })}
      </div>

      <div hidden={active !== 2}>
        {guests?.map((guest, index) => {
          return <GuestBalence key={index} guestUsername={guest.ownerName} guestName={guest.name} balence={guest.balence} records={guest.records} onInsertRecord={getGuestRecords} />
        })}
      </div>
    </div >
  )
}
