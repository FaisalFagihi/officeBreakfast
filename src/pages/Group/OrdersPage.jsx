import React, { useEffect } from 'react'
import { useState } from 'react';
import groupController from '../../controller/groupController';
import { Panel } from '../../style/Style'
import { Modal, Tooltip, Whisper } from 'rsuite';

export const OrdersTable = ({ orders }) => {
  const [selectedOrder, setOrder] = useState(null);
  return (
    orders?.length > 0 ?
      //  <table bordered className='w-full text-left'>
      //   <thead>
      //     <tr>
      //       <th>ID</th>
      //       <th>Group ID</th>
      //       <th>Name</th>
      //       <th>Price</th>
      //       <th>
      //         Modifiers
      //       </th>
      //       <th>QTY</th>
      //       <th>Delivery Cost</th>
      //       <th>Total</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {orders.map((item) => {
      //       return <tr key={item.id} className="border-t">
      //         <td>{item.id}</td>
      //         <td>{item.groupID}</td>
      //         <td>{item.itemName}</td>
      //         <td>{item.itemPrice?.toFixed(2)}</td>
      //         <td className='p-0'>
      //           <table size="sm" className='m-0' style={{ borderColor: "transparent" }}
      //             align="center" >
      //             <tbody>
      //               {item.modifiersList?.length > 0 ?
      //                 item.modifiersList.map((item) => {
      //                   return <tr key={item.id}>
      //                     <td>{item.name}</td>
      //                     <td>{item.price?.toFixed(2)}</td>
      //                   </tr>
      //                 })

      //                 : <tr><td>N/A</td></tr>}
      //             </tbody>
      //           </table>
      //         </td>
      //         <td>{item.itemQty}</td>
      //         <td>{item.deliveryCost?.toFixed(2)}</td>
      //         <td>{(((item?.itemPrice + item.modifiersList?.map(x => x.price).reduce((partialSum, a) => partialSum + a, 0) ) * item.itemQty) 
      //             + item.deliveryCost).toFixed(2)}</td>
      //       </tr>
      //     })}
      //   </tbody>
      // </table> 
      <div className='flex gap-2'>
        {orders.map((order) => {
          return <div key={order.id} onClick={() => setOrder(order)} className='shadow p-2 bg-white rounded-md cursor-pointer hover:bg-opacity-50 '>
            <div>
              {order.restaurantName}
            </div>
            <div>
              ORDER #{order.id}
            </div>
            <div>
              {order.submitDate}
            </div>
            <div>
              {order.orderItemsTotal + order.deliveryCost} SR
            </div>
          </div>
        })}

        <Modal open={selectedOrder} onClose={() => setOrder(null)}>
          <OrderItem selectedOrder={selectedOrder} />
        </Modal>

      </div>
      : <div className='flex justify-center p-2'>no orders</div>
  )
}

export const OrderItem = ({ selectedOrder }) => {
  return (
    <>
      <Modal.Header>
        <div className='flex flex-col gap-2'>

          <div className='text-base font-bold'>
            {selectedOrder?.restaurantName}
          </div>
          <div className='flex justify-between'>
            <div>
              Order #{selectedOrder?.id}
            </div>
            <div>
              {selectedOrder?.submitDate}
            </div>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className={'flex flex-col gap-2 px-2'}>

          <div className="font-bold">
            Your Items
          </div>
          {selectedOrder?.orderItemsList?.map((orderItem) => {
            return <div key={orderItem.id} className='border-b flex gap-2 justify-between' >
              <div>
                {orderItem?.itemQty}x {orderItem?.itemName}
              </div>
              <div>
                {orderItem?.itemPrice?.toFixed(2)}
              </div>
            </div>
          })}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='flex justify-between items-end'>

          <div>
            Ordered By {selectedOrder?.ownerFirstName} {selectedOrder?.ownerLastName}
          </div>

          <div className='grid grid-cols-2 text-right w-44 ml-auto'>
            <div >
              Delivery
            </div>
            <div className=''>
              {selectedOrder?.deliveryCost?.toFixed(2)}
            </div>
            <div className='font-bold'>
              Total
            </div>
            <div className='font-bold'>
              SR {selectedOrder?.orderItemsTotal + selectedOrder?.deliveryCost}
            </div>
          </div>
        </div>

      </Modal.Footer>
    </>
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
    <Panel header={'Order History'}>
      <OrdersTable orders={orders} />
    </Panel>

  )
}
