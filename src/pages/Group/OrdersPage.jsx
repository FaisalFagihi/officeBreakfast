import React, { useEffect } from 'react'
import { useState } from 'react';
import groupController from '../../controller/groupController';

export const OrdersTable = ({ orders }) => {
  return (
    <table bordered className='w-full text-left'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Group ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>
            Modifiers
          </th>
          <th>QTY</th>
          <th>Delivery Cost</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item) => {
          return <tr key={item.id} className="border-t">
            <td>{item.id}</td>
            <td>{item.groupID}</td>
            <td>{item.itemName}</td>
            <td>{item.itemPrice?.toFixed(2)}</td>
            <td className='p-0'>
              <table size="sm" className='m-0' style={{ borderColor: "transparent" }}
                align="center" >
                <tbody>
                  {item.modifiersList?.length > 0 ?
                    item.modifiersList.map((item) => {
                      return <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.price?.toFixed(2)}</td>
                      </tr>
                    })

                    : <tr><td>N/A</td></tr>}
                </tbody>
              </table>
            </td>
            <td>{item.itemQty}</td>
            <td>{item.deliveryCost?.toFixed(2)}</td>
            <td>{(((item?.itemPrice + item.modifiersList?.map(x => x.price).reduce((partialSum, a) => partialSum + a, 0) ) * item.itemQty) 
                + item.deliveryCost).toFixed(2)}</td>
          </tr>
        })}
      </tbody>
    </table>

  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    groupController.getAllOrders().then(({ data }) => {
      setOrders(data)
    })

  }, []);


  return (
    <div className='m-5'>
      <OrdersTable orders={orders} />
    </div>

  )
}
