import React from 'react'

export default function MenuItemOptionsShagardi({options, selectOption}) {
    return (
        options?.map((item, index) => {
            return (
                <div key={item.id} className="ProductMenuItemsContainer">
                    <input type="radio" className="ProductMenuItem" name='itemOption' id={item.id}
                        defaultChecked={index === 0} onClick={() => selectOption(item)} />
                    <label className="ProductMenuItem" htmlFor={item.id}>{item.size}({item.price} SAR)</label>
                </div>
            );
        })
    )
}
