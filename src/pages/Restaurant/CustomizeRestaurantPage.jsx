import { Button, Divider, FlexboxGrid, Form, Grid, Input, InputGroup, InputNumber, List, Loader, Modal, Panel, PanelGroup, SelectPicker, Stack, Table } from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import { useState } from "react";
import { useEffect } from "react";
import restaurantController from "../../controller/restaurantController";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import deliveryAppFactory from "../../modules/deliveryAppFactory";
import { MenuItem } from "../../components/Menu/MenuItem";

const sources = ['Phone number', 'Jahez', 'Careem', 'Marsool'].map(item => ({ label: item, value: item }));


const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, menuGroupID, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                    className="rs-input"
                    type={props.type}
                    defaultValue={rowData[dataKey]}
                    onChange={event => {
                        onChange && onChange(rowData.id, dataKey, event.target.value, menuGroupID);
                    }}
                />
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
        </Cell>
    );
};

const ActionCell = ({ rowData, dataKey, onEdit, onRemove, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px' }}>
            <div className="flex justify-between">
                <Button
                    appearance="link"
                    onClick={() => {
                        onEdit(rowData.id)
                    }}
                >
                    {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
                </Button>
                <Button
                    appearance="link"
                    onClick={() => onRemove(rowData.id)}
                >Remove</Button>
            </div>
        </Cell>
    );
};


export default function CustomizeRestaurantPage() {
    const location = useLocation();
    // const { id } = useParams();

    const navigate = useNavigate()

    const [restaurant, setRestaurant] = useState(null);
    const [menuData, setMenuData] = useState(null);
    const [modifierGroups, setModifierGroups] = useState(null);
    const [modifiers, setModifiers] = useState(null);

    const handleMenuItemsEditState = (id, menuGroupID) => {
        const nextData = Object.assign([], menuData)
        const activeItem = nextData.find(item => item.id === menuGroupID).menuItems.find(item => item.id === id)
        activeItem.status = activeItem.status ? null : 'EDIT'
        setMenuData(nextData)
    }

    const handleRemoveMenuItemState = (id, menuGroupID) => {

        const nextData = Object.assign([], menuData)
        nextData.find(item => item.id === menuGroupID).menuItems = nextData.find(item => item.id === menuGroupID).menuItems.filter(item => item.id !== id)
        setMenuData(nextData);
    }

    const handleNewMenuItemState = (menuGroup) => {
        const menuItems = menuData.find(x => x.id == menuGroup.id).menuItems
        const activeMenuItem = Object.assign({}, menuItems[0]);
        activeMenuItem.name = "";
        activeMenuItem.nameAr = "";
        activeMenuItem.id++;
        activeMenuItem.price = "0";
        activeMenuItem.description = "";
        activeMenuItem.image = "";
        activeMenuItem.status = "EDIT";

        const nextData = Object.assign([], menuData);
        nextData.find(item => item.id === menuGroup.id).menuItems = [activeMenuItem, ...menuItems];
        setMenuData(nextData)
    };

    useEffect(() => {
        setRestaurant(
            {
                id: location.state.restaurant.id,
                name: location.state.restaurant.name,
                distance: '',
                rating: '',
                image: location.state.restaurant.image,
                logo: location.state.restaurant.logo,
                deliveryCost: location.state.restaurant.deliveryCost,
            }
        )
        restaurantController.getRestaurantByID(location.state.restaurant.id, location.state.menuSource).then(function ({ data }) {
            setMenuData(data?.menuGroups)
        }).catch(function (error) {

        });
    }, [location]);

    const handleVendorEdit = (key, value) => {
        const nextData = Object.assign({}, restaurant);
        nextData[key] = value;
        setRestaurant(nextData)
    }

    const handleMenuGeoupsEdit = (id, key, value) => {
        const nextData = Object.assign([], menuData);
        nextData.find(item => item.id === id)[key] = value;
        setMenuData(nextData)
    }

    const handleMenuItemsEdit = (id, key, value, menuGroupID) => {
        const nextData = Object.assign([], menuData);
        nextData.find(item => item.id === menuGroupID).menuItems.find(item => item.id === id)[key] = value;
        setMenuData(nextData)
    }

    const submit = () => {
        let data = {
            restaurant: restaurant,
            menuGroups: menuData
            // branch: { menugroups: menuData, menuitems: menuItems.map(({ status, ...menuItems }) => menuItems), modifier_groups: modifierGroups, modifiers: modifiers },
        }
        restaurantController.submitCustom(data).then(() => {
            navigate("../restaurants")
        })


    }

    return (
        <Panel bordered header="Resturant">
            <div className="flex gap-2">
                <div className="w-full">
                    <label>Name</label>
                    <Input value={restaurant?.name} onChange={(e) => handleVendorEdit('name', e)} placeholder="Restaurant name" />
                    <label>Delivery</label>
                    <Input type="number" value={restaurant?.deliveryCost} onChange={(e) => handleVendorEdit('deliveryCost', e)} placeholder="Delivery fee" />
                    <label>Image</label>
                    <Input value={restaurant?.image} onChange={(e) => handleVendorEdit('image', e)} />
                    <label>Logo</label>
                    <Input value={restaurant?.logo} onChange={(e) => handleVendorEdit('logo', e)} />
                </div>
                {/* <Divider>Promotion</Divider>
                                <Row>
                                    <Col xs={24}>
                                        <Row>
                                            <Col xs={24} md={12}>
                                                <Input value={vendor?.promotion_minimum_order} onChange={(e) => handleVendorEdit('promotion_minimum_order', e)} placeholder="Minimum order" />
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Input value={vendor?.promotion_fee} onChange={(e) => handleVendorEdit('promotion_fee', e)} placeholder="Delivery fee" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> */}
                <div className="flex flex-col gap-2">
                    <div>
                    <label>Image</label>
                    <img src={restaurant?.image} className="h-24" alt="not found" draggable="false" />
                    </div>
<div>
<label>Logo</label>

                    <img src={restaurant?.logo} className="h-24" alt="not found" draggable="false" />
</div>
                </div>
            </div>
            <Divider></Divider>
            <div>
                <PanelGroup accordion defaultActiveKey={0} bordered={true} header="Menu Groups" hidden={menuData === null}>
                    {menuData?.map((item, index) => (
                        <Panel header={item.name} defaultExpanded bodyFill eventKey={index} bordered className="m-3" style={{ borderColor: "#ffd1a8" }} key={index} index={index} >
                            <div>
                                <div>
                                    <label>Name (AR):</label>
                                    <Input value={item.nameAr} onChange={(e) => handleMenuGeoupsEdit(item.id, 'nameAr', e)} style={{ width: 160 }} />
                                </div>
                                <div>
                                    <label>Name (EN):</label>
                                    <Input value={item.name} onChange={(e) => handleMenuGeoupsEdit(item.id, 'name', e)} style={{ width: 160 }} />
                                </div>
                            </div>
                            <div className="my-2 border border-borderGray " >
                                <Button block onClick={() => handleNewMenuItemState(item)}>+</Button>
                                <div className="grid lg:grid-cols-2 p-3 gap-2">
                                    {item?.menuItems?.map((menuItem) => <div className="flex flex-row justify-between w-full border border-[#f1f1f1] rounded-md h-30" >

                                        <img draggable="false" className="MenuItemImage !rounded-l-md" src={menuItem.image} alt="" onDragStart={(e) => e.preventDefault()} />
                                        <div className="flex flex-col justify-between p-2 ">
                                            <div className="flex flex-col">
                                                <div>
                                                    Name En: <input className="bg-white px-2 border border-borderGray" onChange={(e) => handleMenuItemsEdit(menuItem.id, 'name', e.currentTarget.value, item.id)} value={menuItem.name} />
                                                </div>
                                                <div>
                                                    Name Ar: <input className="bg-white px-2 border border-borderGray" onChange={(e) => handleMenuItemsEdit(menuItem.id, 'nameAr', e.currentTarget.value, item.id)} value={menuItem.nameAr} />
                                                </div>
                                            </div>
                                            <div className="text-right font-bold">
                                                <input className="bg-white px-2 border border-borderGray" onChange={(e) => handleMenuItemsEdit(menuItem.id, 'price', e.currentTarget.value, item.id)} type="number" value={menuItem.price} /> SR
                                            </div>
                                        </div>

                                    </div>
                                    )}
                                </div>

                                {/* <Table
                                    bordered
                                    cellBordered
                                    height={400}
                                    data={item.menuItems}
                                    autoHeight
                                    affixHeader
                                    className="w-full"
                                    affixHorizontalScrollbar>
                                    <Column width={200}>
                                        <HeaderCell>Name AR</HeaderCell>
                                        <EditableCell menuGroupID={item.id} dataKey="nameAr" onChange={handleMenuItemsEdit} />

                                    </Column>

                                    <Column width={200}>
                                        <HeaderCell>Name EN</HeaderCell>
                                        <EditableCell menuGroupID={item.id} dataKey="name" onChange={handleMenuItemsEdit} />
                                    </Column>

                                    <Column flexGrow={1}>
                                        <HeaderCell>Description</HeaderCell>
                                        <EditableCell menuGroupID={item.id} dataKey="description" onChange={handleMenuItemsEdit} />
                                    </Column>

                                    <Column width={100}>
                                        <HeaderCell>Price</HeaderCell>
                                        <EditableCell menuGroupID={item.id} dataKey="price" onChange={handleMenuItemsEdit} type="number" />

                                    </Column>

                                    <Column width={200}>
                                        <HeaderCell>Photo</HeaderCell>
                                        <EditableCell menuGroupID={item.id} dataKey="image" onChange={handleMenuItemsEdit} />
                                    </Column>

                                    <Column width={140} fixed="right">
                                        <HeaderCell>...</HeaderCell>
                                        <ActionCell dataKey="id" onRemove={(rowData) => handleRemoveMenuItemState(rowData, item.id)} onEdit={(rowData) => handleMenuItemsEditState(rowData, item.id)} />
                                    </Column>
                                </Table> */}
                            </div>
                        </Panel>
                    ))}

                </PanelGroup>
            </div>
            <div>
                <Divider />
                <Button onClick={() => submit()} block > Save</Button>
            </div>

        </Panel >
    )
}
