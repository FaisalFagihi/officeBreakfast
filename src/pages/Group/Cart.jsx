import React from 'react'
import { Col, Divider, FlexboxGrid, List, Row } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import auth from '../../modules/auth';
import { FiThumbsUp } from 'react-icons/fi';

export default function Cart({ cartItems, removeFromCart, height, isCheckout }) {

    return <div style={{ overflow: "auto", height: height }} className='flex flex-col gap-1'>
        <div className='flex flex-col gap-1'>
            {cartItems?.filter(x => x.username === auth.getUsername()).map(({ name, uid, itemName, itemPrice, itemQty, modifiersList, isConfirmed }, index) => (
                <div key={uid} index={index} className=''>
                    <div className={'MyCartOrder flex justify-between items-center'}>
                        <div>
                            <div className='flex items-center gap-2'>
                                {/* <div>
                                    {name}
                                </div> */}
                                {/* <div hidden={!isConfirmed}>
                                    <FiThumbsUp size={12} />

                                </div> */}
                            </div>
                            <b> {itemQty}x {itemName} ({itemPrice} SR) </b>

                            {modifiersList?.map(({ nameAr, price }, index) => {
                                return <p key={index.toString()} index={index}>
                                    {nameAr} ({price} SR)
                                </p>
                            })}
                        </div>
                        <div>
                            <TrashIcon hidden={isCheckout} className='text-red-400 hover:text-red-800 text-xs cursor-pointer mx-2' onClick={() => removeFromCart(uid)} />
                        </div>
                    </div>
                    <Divider className='m-1' />
                </div>

            ))}
        </div>
        <div className='flex flex-col gap-1'>
            {cartItems?.filter(x => x.username !== auth.getUsername()).map(({ name, uid, itemName, itemPrice, itemQty, modifiersList, isConfirmed }, index) => (
                <div key={uid} index={index}>
                    <div className='CartOrder'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <div>
                                    {name}
                                </div>
                                {/* <div hidden={!isConfirmed}>
                                    <FiThumbsUp size={12} />

                                </div> */}
                            </div>
                            <b> {itemQty}x {itemName} ({itemPrice} SR) </b>

                            {modifiersList?.map(({ nameAr, price }, index) => {
                                return <p key={index.toString()} index={index}>
                                    {nameAr} ({price} SR)
                                </p>
                            })}
                        </div>
                        <div />
                    </div>
                    <Divider className='m-1' />
                </div>

            ))}
        </div>
    </div>
}
