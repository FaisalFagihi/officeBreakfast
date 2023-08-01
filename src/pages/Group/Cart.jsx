import React from 'react'
import { Col, FlexboxGrid, List, Row } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import auth from '../../modules/auth';

export default function Cart({ cartItems, removeFromCart, height, isCheckout }) {

    return <div style={{ overflow: "auto", height: height }}>


        <List>
            {cartItems?.filter(x => x.username === auth.getUsername()).map(({ name, uid, itemName, itemPrice, itemQty, modifiersList }, index) => (
                <List.Item key={uid} index={index}>
                    <FlexboxGrid align="middle" className={'MyCartOrder'}>
                        <FlexboxGridItem colspan={22}>
                            {name} <br /><b> {itemQty}x {itemName} ({itemPrice} SAR) </b>

                            {modifiersList?.map(({ name, price }, index) => {
                                return <p key={index.toString()} index={index}>
                                    {name} {price} SAR
                                </p>
                            })}
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={2}>
                            <TrashIcon hidden={isCheckout} style={{ color: "red", fontSize: 12, cursor: "pointer" }} onClick={() => removeFromCart(uid)} />
                        </FlexboxGridItem>
                    </FlexboxGrid>
                </List.Item>

            ))}
        </List>
        <List>
            {cartItems?.filter(x => x.username !== auth.getUsername()).map(({ name, uid, itemName, itemPrice, itemQty, modifiersList }, index) => (
                <List.Item key={uid} index={index}>
                    <FlexboxGrid align="middle" className='CartOrder'>
                        <FlexboxGridItem colspan={22}>
                            {name} <br /><b> {itemQty}x {itemName} ({itemPrice} SAR) </b>

                            {modifiersList?.map(({ name, price }, index) => {
                                return <p key={index.toString()} index={index}>
                                    {name} {price} SAR
                                </p>
                            })}
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={2} />
                    </FlexboxGrid>
                </List.Item>

            ))}
        </List>
    </div>
}
