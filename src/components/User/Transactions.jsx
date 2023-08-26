import React from 'react'
import { Modal } from 'rsuite'
import { OrderItem, OrdersTable } from '../../pages/Group/OrdersPage';
import { useState } from 'react';
import groupController from '../../controller/groupController';
import { CiReceipt } from 'react-icons/ci';
import Toaster from '../Toaster';


export default function Transactions({ records }) {
    const [selectedOrderItem, setSelectedOrderItem] = useState();
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    
    const toaster = Toaster();
    
    const showOrder = (id) => {
        groupController.getOrderByID(id).then(({ data }) => {
            setSelectedOrderItem(data)
            setIsOrderModalOpen(true)
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }

    return (<>
        <table className="w-full text-left">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Order</th>
                    <th>Remark</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {records?.map((record) => {
                    return <tr key={record.id} style={{ background: record.amount > 0 ? "#f7fff5" : "white" }}>
                        <td>{record.id}</td>
                        <td >{record.amount.toFixed(2)}</td>
                        <td style={{ textAlign: "center" }}>
                            <CiReceipt hidden={!record.orderID} style={{ cursor: "pointer" }} onClick={() => showOrder(record.orderID)} />
                        </td>
                        <td>{record.remark}</td>
                        <td>{record.issueDate}</td>
                    </tr>
                })}
            </tbody>
        </table>
        <Modal open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} >
                <OrderItem selectedOrder={selectedOrderItem} />
        </Modal>
    </>
    )
}
