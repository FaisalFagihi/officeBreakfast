import { Button, Col, Container, Divider, FlexboxGrid, Form, Grid, Input, InputGroup, InputNumber, List, Loader, Modal, Panel, PanelGroup, Row, SelectPicker, Stack, Table } from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import { useState } from "react";
import { useEffect } from "react";
import restaurantController from "../../controller/restaurantController";
import { useLocation } from 'react-router-dom';
import shgardiPipeline from "../../modules/shgardiPipeline";

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
            <Stack>
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
            </Stack>
        </Cell>
    );
};


export default function CreateRestaurantsPage() {
    const location = useLocation();

    // const { id } = useParams();

    const [vendor, setVendor] = useState(null);
    const [menuData, setMenuData] = useState(null);
    const [modifierGroups, setModifierGroups] = useState(null);
    const [modifiers, setModifiers] = useState(null);

    const handleMenuItemsEditState = (id, menuGroupID) => {
        console.log(id)
        console.log(menuGroupID)
        console.log(menuData)
        const nextData = Object.assign([], menuData)
        const activeItem = nextData.find(item => item.menuGroupID === menuGroupID).menuItems.find(item => item.id === id)
        activeItem.status = activeItem.status ? null : 'EDIT'
        setMenuData(nextData)
    };

    const handleRemoveMenuItemState = (id, menuGroupID) => {

        const nextData = Object.assign([], menuData)
        nextData.find(item => item.menuGroupID === menuGroupID).menuItems = nextData.find(item => item.menuGroupID === menuGroupID).menuItems.filter(item => item.id !== id)
        setMenuData(nextData);
    }
    const handleNewMenuItemState = (menugroupID) => {
        const activeItem = Object.assign({}, menuData[0]);
        console.log(activeItem)
        activeItem.id++;
        activeItem.menugroup_id = menugroupID;
        activeItem.name = "";
        activeItem.name_en = "";
        activeItem.price = "0";
        activeItem.description = "";
        activeItem.photo = "";
        activeItem.status = "EDIT";
        setMenuData([activeItem, ...menuData]);
    };

    useEffect(() => {
        setVendor(
            {
                id: location.state.id,
                name: location.state.name,
                photo: location.state.photo,
                logo: location.state.logo,
                delivery_fee: location.state.delivery_fee,
                promotion_minimum_order: location.state.promotion?.minimum_order,
                promotion_fee: location.state.promotion?.fee
            }
        )

        restaurantController.getRestaurantByID(location.state?.id).then(function ({ data }) {
            setMenuData(data?.response.map(x => shgardiPipeline.getMenu(x)))

        }).catch(function (error) {

        });
    }, [location]);


    const handleVendorEdit = (key, value) => {
        const nextData = Object.assign({}, vendor);
        nextData[key] = value;
        setVendor(nextData)
    }

    const handleMenuGeoupsEdit = (id, key, value) => {
        const nextData = Object.assign([], menuData);
        nextData.find(item => item.menuGroupID === id)[key] = value;
        setMenuData(nextData)
    }


    const handleMenuItemsEdit = (id, key, value, menuGroupID) => {
        console.log(id)
        console.log(menuGroupID)
        const nextData = Object.assign([], menuData);
        nextData.find(item => item.menuGroupID === menuGroupID).menuItems.find(item => item.id === id)[key] = value;
        setMenuData(nextData)
    }

    const submit = () => {
        let data = {
            vendor: vendor,
            menu: menuData
            // branch: { menugroups: menuData, menuitems: menuItems.map(({ status, ...menuItems }) => menuItems), modifier_groups: modifierGroups, modifiers: modifiers },
        }
        console.log("dd", data)
        restaurantController.submitCustom(data)
    }

    return (
        <Grid fluid>
            <Row>
                <Col xs={24}>
                    <Panel bordered header="Resturant">
                        <Row>
                            <Col xs={24}>
                                <Row>
                                    <Col xs={24} md={8}>
                                        <Input value={vendor?.name} onChange={(e) => handleVendorEdit('name', e)} placeholder="Restaurant name" />
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Input type="number" value={vendor?.delivery_fee} onChange={(e) => handleVendorEdit('delivery_fee', e)} placeholder="Delivery fee" />
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <SelectPicker data={sources} defaultValue={sources[0].value} searchable={false} block />
                                    </Col>
                                </Row>
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
                                <Divider>Cover</Divider>
                                <Row>
                                    <Col xs={18}>
                                        <Input value={vendor?.photo} onChange={(e) => handleVendorEdit('photo', e)} />
                                    </Col>
                                    <Col xs={6}>
                                        <img src={vendor?.photo} className="RestaurantImage" alt="not found" draggable="false" />
                                    </Col>
                                </Row>
                                <Divider>logo</Divider>
                                <Row>
                                    <Col xs={18}>
                                        <Input value={vendor?.logo} onChange={(e) => handleVendorEdit('logo', e)} />
                                    </Col>
                                    <Col xs={6}>
                                        <img src={vendor?.logo} className="RestaurantImage" alt="not found" draggable="false"/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Divider></Divider>
                        <Row>
                            <Col xs={24}>
                                <Panel bodyFill bordered header="Menu Groups" hidden={menuData === null}>
                                    {menuData?.map((item, index) => (
                                        <Panel header={item.menuGroupName} collapsible bordered className="m-3" style={{ borderColor: "#ffd1a8" }} key={index} index={index} >
                                            <Stack direction="row" spacing={10}>
                                                <Stack spacing={5} direction="row">
                                                    <label>Name (AR):</label>
                                                    <Input value={item.menuGroupName} onChange={(e) => handleMenuGeoupsEdit(item.menuGroupID, 'menuGroupName', e)} style={{ width: 160 }} />
                                                </Stack>
                                                <Stack spacing={5} direction="row">
                                                    <label>Name (EN):</label>
                                                    <Input value={item.menuGroupName_en} onChange={(e) => handleMenuGeoupsEdit(item.menuGroupID, 'menuGroupName_en', e)} style={{ width: 160 }} />
                                                </Stack>
                                            </Stack>
                                            <Panel bodyFill header="Menu Items" bordered className="my-2" style={{ borderColor: "#a4d0ff", width: "100%" }}>
                                                <Button block onClick={() => handleNewMenuItemState(item.id)}>+</Button>
                                                <Table
                                                    bordered
                                                    cellBordered
                                                    height={400}
                                                    data={item.menuItems}
                                                    autoHeight
                                                    affixHeader
                                                    affixHorizontalScrollbar>
                                                    <Column width={200}>
                                                        <HeaderCell>Name AR</HeaderCell>
                                                        {/* <Cell dataKey="name" /> */}
                                                        <EditableCell menuGroupID={item.menuGroupID} dataKey="name" onChange={handleMenuItemsEdit} />

                                                    </Column>

                                                    <Column width={200}>
                                                        <HeaderCell>Name EN</HeaderCell>
                                                        <EditableCell menuGroupID={item.menuGroupID} dataKey="name_en" onChange={handleMenuItemsEdit} />
                                                    </Column>

                                                    <Column flexGrow={1}>
                                                        <HeaderCell>Description</HeaderCell>
                                                        <EditableCell menuGroupID={item.menuGroupID} dataKey="description" onChange={handleMenuItemsEdit} />
                                                    </Column>

                                                    <Column width={100}>
                                                        <HeaderCell>Price</HeaderCell>
                                                        <EditableCell menuGroupID={item.menuGroupID} dataKey="price" onChange={handleMenuItemsEdit} type="number" />

                                                    </Column>

                                                    <Column width={200}>
                                                        <HeaderCell>Photo</HeaderCell>
                                                        <EditableCell menuGroupID={item.menuGroupID} dataKey="photo" onChange={handleMenuItemsEdit} />
                                                    </Column>

                                                    <Column width={140} fixed="right">
                                                        <HeaderCell>...</HeaderCell>
                                                        <ActionCell dataKey="id" onRemove={(rowData)=>handleRemoveMenuItemState(rowData, item.menuGroupID)} onEdit={(rowData) => handleMenuItemsEditState(rowData, item.menuGroupID)} />
                                                    </Column>
                                                </Table>
                                            </Panel>
                                        </Panel>
                                    ))}

                                </Panel>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24}>
                                <Divider />
                                <Button onClick={() => submit()} block > Save</Button>
                            </Col>
                        </Row>
                    </Panel>
                </Col>
            </Row>

        </Grid >
    );
}
