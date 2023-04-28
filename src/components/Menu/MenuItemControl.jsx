import { useEffect, useState } from 'react';
import NumericUpDown from '../UserControls/NumericUpDown';
import { Modal } from 'rsuite';
import React from 'react';
import uuid from 'react-uuid';
import auth from '../../modules/auth';
import MenuItemOptions from './MenuItemOptions';
import restaurantController from '../../controller/restaurantController';
import shgardiPipeline from '../../modules/shgardiPipeline';
import MenuItemModifiers from './MenuItemModifiers';
import MenuItemComponents from './MenuItemComponents';

export default function MenuItemControl({ name, photo, description, options, components, addToCart, onAddToCart }) {
    const [selectedMenuItemOption, selectMenuItemOption] = useState(null)
    const [selectedModifierGroups, selectModifierGroups] = useState(null)
    const [selectdModifiers, setSelectdModifiers] = useState([])
    const [selectdComponents, setSelectedComponents] = useState([])
    const [qty, setQty] = useState(1)
    const [total, setTotal] = useState(0.0)

    //#region Effects
    useEffect(() => {
        setTotal((selectedMenuItemOption?.price
            + (selectdModifiers?.reduce((a, v) => a = a + parseFloat(v.price), 0))
            + (selectdComponents?.reduce((a, v) => a = a + parseFloat(v.price), 0))) * qty)

    }, [qty, selectdComponents, selectdModifiers, selectedMenuItemOption])

    useEffect(() => {
        if (selectedMenuItemOption == null)
            return

        restaurantController.getMenuItemModifiersByID(selectedMenuItemOption.id).then(({ data }) => {
            selectModifierGroups(data?.response?.map(x => shgardiPipeline.getModifierGroups(x)))
            console.log(data?.response)
        });

    }, [selectedMenuItemOption]);

    useEffect(() => {
        if (options == null || options === undefined)
            return

        selectMenuItemOption(options[0])
    }, [options]);
    //#endregion



    return (
        <div className="Modifier">
            <Modal.Header>
                <div className="ModifierItemName"> {name} </div>
            </Modal.Header>
            <Modal.Body>
                <div className="ModifierImageContainer">
                    <img className="ModifierImage" src={photo} alt="" onDragStart={(e) => e.preventDefault()} />
                </div>
                <div className="ModifierGroupDescription"> {description} </div>
                <MenuItemOptions options={options} selectOption={selectMenuItemOption} />
                <MenuItemComponents components={components} selectComponents={setSelectedComponents} />
                <MenuItemModifiers modifierGroups={selectedModifierGroups} selectModifers={setSelectdModifiers} />
            </Modal.Body>
            <Modal.Footer>

                <div className="ModifierPriceAndQty">
                    <NumericUpDown value={qty} setValue={setQty} />
                    <div style={{ width: "100%" }}>
                        <label className="ModifierPrice">
                            {(total).toFixed(1)} SR
                        </label>
                    </div>
                </div>
                <button className="AddToCart" onClick={() => { addToCart({ uid: uuid(), id: selectedMenuItemOption.id, itemName: selectedMenuItemOption.name, itemPrice: selectedMenuItemOption.price, modifiersList: selectdModifiers.concat(selectdComponents), itemQty: qty, total: total, username: auth.getUsername() }); onAddToCart() }}> Add to Cart </button>
            </Modal.Footer>
        </div>
    );
}
