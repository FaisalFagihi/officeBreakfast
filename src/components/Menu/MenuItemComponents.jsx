export default function MenuItemComponents({ components, selectComponents }) {

    const handleComponentsChange = (item) => {
        let temp = [];

        document.getElementsByName(item.productId)
            .forEach((element) => {
                if (element.checked) {
                    temp.push(components.find((x) => x.id.toString() === element.id))
                }
            })
        selectComponents(temp)
    }
    return (

        components?.map((item, index) => {
            return (
                <div key={item.id} className="ModifierGroup">
                    <input key={item.id} id={item.id} 
                        type='checkbox'
                        name={item.productId}
                        defaultChecked={false}
                        onChange={() => handleComponentsChange(item)} />
                    <label htmlFor={item.id}>{item.name}</label>
                    <label htmlFor={item.id}> ({item.price} SR)</label>
                </div>
            );
        })

    )
}
