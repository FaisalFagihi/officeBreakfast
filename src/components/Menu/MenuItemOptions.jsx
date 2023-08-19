import { useEffect, useState } from 'react';
import NumericUpDown from '../UserControls/NumericUpDown';
import { Modal } from 'rsuite';
import React from 'react';
import uuid from 'react-uuid';
import auth from '../../modules/auth';


export default function MenuItemOptions({ id, name, photo, description, types, options, price, addToCart, onAddToCart }) {
    const [selectedMenuItemOption, selectMenuItemOption] = useState(null)
    const [selectdModifiers, setSelectdModifiers] = useState([])
    const [selectedOptions, setSelectdOptions] = useState([])
    const [qty, setQty] = useState(1)
    const [total, setTotal] = useState(0.0)
    const [selectedType, setSelectedType] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [selectedPackage, setSelectedPackage] = useState();
    const [basePrice, setBasePrice] = useState();

    //#region Effects
    useEffect(() => {
        let packageTotal = selectedOptions?.reduce((a, v) => a = a + parseFloat(v.price), 0)
        let modifiersTotal = selectdModifiers?.reduce((a, v) => a = a + parseFloat(v.price), 0)

        setTotal((basePrice + packageTotal + modifiersTotal) * qty)
    }, [qty, basePrice, selectdModifiers, selectedOptions])

    useEffect(() => {
        if (options == null || options === undefined)
            return

    }, [options]);
    //#endregion

    useEffect(() => {

        if (types) {
            setSelectedType(types[0])
            if (types[0]?.sizes)
                setSelectedSize(types[0]?.sizes[0])
        }


    }, [types]);



    useEffect(() => {
        if (selectedSize) {
            setSelectedPackage(selectedSize.packages[0])
        }

    }, [selectedSize]);

    useEffect(() => {

        if (selectedType) {
            setBasePrice(selectedType.price)
        }
    }, [selectedType]);

    useEffect(() => {
        if (selectedPackage) {
            setBasePrice(selectedPackage.price)
        }
    }, [selectedPackage]);

    useEffect(() => {
        if (price) {
            setBasePrice(price)
        }
    }, [price]);


    useEffect(() => {
    }, [selectdModifiers]);

    const itemName = name + (selectedType ? ' - ' + selectedType?.description : '') + (selectedSize ? ' - ' + selectedSize?.description : '');
    return (
        <div>
            <Modal.Header>
                <div className="ModifierItemName"> {name} </div>
            </Modal.Header>
            <Modal.Body>
                <div className="ModifierImageContainer">
                    <img className="ModifierImage" src={photo} alt="" draggable="false" />
                </div>
                <div className="ModifierGroupDescription"> {description} </div>

                <div className='my-2' hidden={!types?.length > 0}>
                    <label>Type</label>
                    {types?.map((type) => {
                        return <div key={type.id} className={`border my-1 p-1 ${selectedType?.id === type?.id ? 'bg-gray-300' : ''}`} onClick={() => setSelectedType(type)}>
                            {type.description} {type.price.toFixed(2)}
                        </div>
                    })}
                </div>

                <div className={'my-2'} hidden={!selectedType?.sizes?.length > 0}>
                    <label>Size</label>
                    {selectedType?.sizes?.map((size) => {
                        return <div key={size.id} className={`border my-1 p-1 ${selectedSize?.id === size?.id ? 'bg-gray-300' : ''} `} onClick={() => setSelectedSize(size)}>
                            <div>
                                {size.description}
                            </div>
                            <div>
                                {selectedPackage?.size?.id === size.id ? selectedPackage.package?.price.toFixed(2) : size.packages[0]?.price.toFixed(2)}
                                {/* {selectedPackagesize?.price.toFixed(2)} */}
                            </div>
                        </div>
                    })}

                    {selectedSize?.packages?.length > 1 ?
                        selectedSize?.packages?.map((typePackage) => {
                            return <div key={typePackage.id} className={`flex flex-col ${selectedPackage?.package?.id === typePackage?.id ? 'bg-gray-300' : ''}`} onClick={() => setSelectedPackage({ size: selectedSize, package: typePackage })} >
                                <div>
                                    {typePackage.name}
                                </div>
                                <div>
                                    {typePackage.price.toFixed(2)}
                                    {/* {typePackage.calories} */}
                                </div>
                            </div>
                        }) : <></>
                    }
                </div>

                <Modifiers options={selectedSize?.menuOptions} setSelectedModifers={setSelectdOptions} />

                <Modifiers options={options} setSelectedModifers={setSelectdModifiers} />
            </Modal.Body >
            <Modal.Footer>

                <div className="ModifierPriceAndQty">
                    <NumericUpDown value={qty} setValue={setQty} />
                    <div style={{ width: "100%" }}>
                        <label className="ModifierPrice">
                            {(total).toFixed(1)} SR
                        </label>
                    </div>
                </div>
                <button className="AddToCart" onClick={() => { addToCart({ uid: uuid(), id: id, itemName: itemName, itemPrice: basePrice, modifiersList: selectdModifiers.concat(selectedOptions), itemQty: qty, total: total, username: auth.getUsername() }); onAddToCart() }}> Add to Cart </button>
            </Modal.Footer>
        </div >
    );
}

const Modifiers = ({ options, setSelectedModifers }) => {

    const handleModifierChange = (modifierGroup, modifierItem) => {
        let checkedCounter = 0;
        document.getElementsByName(modifierGroup.id)
            .forEach((checkbox) => {
                if (checkbox.checked) {
                    checkedCounter++;
                }
            });

        let modifierElement = document.getElementById(modifierItem.id);
        if ((checkedCounter > modifierGroup.maxQty) && modifierElement.checked) {
            modifierElement.checked = false;
        }

        let modifiersTemp = [];

        options.forEach((item) => {
            document.getElementsByName(item.id)
                .forEach((element) => {
                    if (element.checked) {
                        modifiersTemp.push(item.modifierItems.find((x) => x.id.toString() === element.id))
                    }
                });
        })

        setSelectedModifers(modifiersTemp)
    }

    return options?.map((modifierGroup) => {
        return <div key={modifierGroup.id} className="my-1 p-1">
            <div>
                {modifierGroup.name}
            </div>
            {modifierGroup?.modifierItems?.map((item, index) => {
                return (
                    <div key={item.id}>
                        <input id={item.id}
                            type={(modifierGroup.minQty === 1 && modifierGroup.maxQty === 1) ? 'radio' : 'checkbox'}
                            defaultChecked={index === 0 && modifierGroup.minQty > 0}
                            onChange={() => handleModifierChange(modifierGroup, item)}
                            name={modifierGroup.id} />
                        <label htmlFor={item.id}>{item.name}</label>
                        <label htmlFor={item.id}> ({item.price.toFixed(2)} SAR)</label>
                    </div>
                )
            })}
        </div>
    })
}
