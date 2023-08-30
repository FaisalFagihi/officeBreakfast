export default function MenuItemModifiers({ modifierGroups, selectModifers }) {

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

        modifierGroups.forEach((item) => {
            document.getElementsByName(item.id)
                .forEach((element) => {
                    if (element.checked) {
                        modifiersTemp.push(item.modifierItems.find((x) => x.id.toString() === element.id))
                    }
                });
        })
        selectModifers(modifiersTemp)
    }
    return (
        modifierGroups?.map((modifierGroup) => {
            return <div key={modifierGroup.id} className="ModifierGroupName">{modifierGroup.name}
                {
                    modifierGroup?.modifierItems?.map((item, index) => {
                        return (
                            <div key={item.id} className="ModifierGroup">
                                <input key={item.id} id={item.id} className=""
                                    type={(modifierGroup.minQty === 1 && modifierGroup.maxQty === 1) ? 'radio' : 'checkbox'}
                                    defaultChecked={index === 0 && modifierGroup.minQty > 0}
                                    onChange={() => handleModifierChange(modifierGroup, item)}
                                    name={modifierGroup.id} />
                                <label htmlFor={item.id}>{item.name}</label>
                                <label htmlFor={item.id}> ({item.price} SR)</label>
                            </div>
                        );
                    })
                }
            </div>
        })
    )
}
