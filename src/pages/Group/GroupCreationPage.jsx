import React, { useEffect, useState } from 'react'
import { Grid, Row, Col, Stack, Input, InputNumber, Panel, Divider, InputGroup, Button, Modal, Loader } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { RestaurantItem } from '../../components/Restaurant/RestaurantItem'
import { BsStopwatch } from 'react-icons/bs';
import StackItem from 'rsuite/esm/Stack/StackItem';
import GroupController from '../../controller/groupController';
import Map from '../../components/Map'
import { useNavigate } from 'react-router-dom';

import restaurantController from '../../controller/restaurantController';
import shgardiPipeline from '../../modules/shgardiPipeline';
import MenuPage from '../Restaurant/MenuPage';
import Toaster from '../../components/Toaster';
import { VendorCustom } from '../../components/Restaurant/RestaurantCustomItem';

export default function GroupCreationPage({afterSubmit}) {
    const [vendorsResult, setResturantsResult] = React.useState([])
    const [selectedRestaurant, setSelectedRestaurant] = React.useState(null)
    const [loadRestaurants, setLoadRestaurants] = React.useState(false)
    const [loadCustomRestaurants, setLoadCustomRestaurants] = React.useState(false)
    const [loadBranchMenu, setLoadBranchMenu] = React.useState(false)
    const [isModalOpen, setModalOpenStatus] = React.useState(false);
    const [timer, setTimer] = React.useState(20);
    const [delivery, setDelivery] = React.useState(0);
    const [viewRestaurantID, setViewRetrestaurantID] = useState(null);
    const [customs, setCustoms] = useState();
    const [isCustomModalOpen, setCustopmModalOpenStatus] = useState(false);
    const [customMenu, setCustomMenu] = useState(null);
    const navigate = useNavigate();
    const toaster = Toaster()

    const searchRestaurant = (searchQuery) => {
        setLoadRestaurants(true)
        navigator.geolocation.getCurrentPosition((location) => {
            restaurantController.searchRestaurant(searchQuery, location).then(({ data }) => {
                setResturantsResult(data?.response?.items.map(x => shgardiPipeline.getResturant(x)))
                setLoadRestaurants(false)
            }).catch(({ response }) => {
                toaster.push(response?.data, "error")
            })
        });
    }

    useEffect(() => {
        setLoadCustomRestaurants(true)
        searchRestaurant("");
        restaurantController.getAllCustoms().then(({ data }) => {
            console.log(data);
            setCustoms(data)
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        }).finally(() => {
            setLoadCustomRestaurants(false)
        })
    }, [])

    useEffect(() => {
        if (selectedRestaurant == null)
            return;
        setDelivery(selectedRestaurant.delivery)
    }, [selectedRestaurant])


    const create = () => {
        GroupController.submitGroup(selectedRestaurant).then(function ({ data }) {
            navigate("/")
            toaster.push("Group has been created successfully", 'success')
            afterSubmit()
        }).catch(function (error) {
            toaster.push(error.toString, 'error')
        });
    }

    const viewVendor = (restaurantID) => {
        setViewRetrestaurantID(restaurantID)
        setModalOpenStatus(true)
    }

    const viewCustom = (menu) => {
        setCustomMenu(menu)
        setCustopmModalOpenStatus(true)
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchRestaurant(event.target.value);
        }
    };

    const selectRestaurent = (restaurant, menuSource) => {
        let data = {
            id: 0,
            restaurantID: restaurant.id,
            name: restaurant.name,
            photo: restaurant.photo,
            logo: restaurant.logo,
            timer: timer,
            delivery: parseFloat(delivery),
            promotionMinimumOrder: parseInt(restaurant.promotion?.minimum_order),
            promotionName: restaurant.promotion?.message,
            menuSource: menuSource
        }
        setSelectedRestaurant(data)
    }

    return (
        <Grid fluid>
            <Panel>
                <Row>
                    <Col xs={24} sm={8}>
                        <Stack spacing={5}>
                            <StackItem>
                                <div>Restaurant</div>
                            </StackItem>
                            <StackItem grow={1}>
                                <Input disabled readOnly value={selectedRestaurant?.name} />
                            </StackItem>
                        </Stack>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Stack spacing={5}>
                            <StackItem>
                                <div>Timer</div>
                            </StackItem>
                            <StackItem grow={1}>
                                <InputNumber size="md" value={timer} min={0} postfix={<BsStopwatch />} onChange={(value) => setTimer(value)} />
                            </StackItem>
                        </Stack>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Stack spacing={5}>
                            <StackItem>
                                <div>Delivery</div>
                            </StackItem>
                            <StackItem grow={1}>
                                <InputNumber value={delivery} postfix="SR" onChange={(value) => setDelivery(value)} />
                            </StackItem>
                        </Stack>
                    </Col>
                </Row>
            </Panel>

            <Panel bordered>
                <InputGroup inside>
                    <Input placeholder="Search.." name='restaurant' onKeyDown={handleKeyDown} />
                    <InputGroup.Button tabIndex={-1}>
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>
                {!loadRestaurants ?
                    <Stack  style={{ overflow: "auto", height: "250px" }}  justifyContent='flex-start' spacing={20}  >
                        {vendorsResult?.map((restaurant) =>
                            <RestaurantItem
                                isSelected={selectedRestaurant?.restaurantID === restaurant?.id}
                                key={restaurant.id}
                                name={restaurant.name}
                                logo={restaurant.logo}
                                image={restaurant.photo}
                                promotion={restaurant?.promotion}
                                minimumOrder={restaurant?.minimum_order}
                                distance={restaurant.distance}
                                delivey={restaurant.delivery_fee}
                                onCardClik={() => selectRestaurent(restaurant, 0)} />
                        )}
                    </Stack> : <Loader size="md" content="Getting restaurants" style={{ textAlign: "center", width: "100%", marginTop: "100px" }} />
                }

            </Panel>

            <Panel header={<h6>Custom</h6>} style={{ overflow: "auto", height: "auto" }} className="mt-3">
                {!loadCustomRestaurants ?
                    <Stack wrap alignItems='center' justifyContent='center' spacing={20} className="mt-0 py-2" style={{ overflow: "auto" }} >
                        {customs?.map((custom) =>
                            <RestaurantItem isSelected={selectedRestaurant?.restaurantID === custom.vendor?.id} key={custom.vendor.id} name={custom.vendor.name} logo={custom.vendor.logo}
                                image={custom.vendor.photo}
                                promotion={custom.vendor?.promotion} minimumOrder={custom.vendor?.minimum_order}
                                distance={custom.vendor.distance}
                                delivey={custom.vendor.delivery_fee}
                                previewButton={() => viewCustom(custom.menu)}
                                onCardClik={() => selectRestaurent(custom.vendor, 1)} />
                        )}
                    </Stack> : <Loader size="md" content="Getting restaurants" style={{ textAlign: "center", width: "100%", marginTop: "100px" }} />
                }

            </Panel>
            <Row className='mt-3'>
                <Button block onClick={() => create()}>Submit</Button>
            </Row>

            <Modal overflow={true} size="md" open={isModalOpen} onClose={() => setModalOpenStatus(false)}>
                <Modal.Header>
                    <h3>Preview</h3>
                </Modal.Header>
                <Modal.Body>
                    {(!loadBranchMenu) ?
                        <MenuPage restaurantID={viewRestaurantID} isPreview={true} />
                        : <Loader size="md" content="Getting Menu" />
                    }
                </Modal.Body>
            </Modal>

            <Modal overflow={true} size="md" open={isCustomModalOpen} onClose={() => setCustopmModalOpenStatus(false)}>
                <Modal.Header>
                    <h3>Preview</h3>
                </Modal.Header>
                <Modal.Body>
                    {(!loadBranchMenu) ?
                        <MenuPage menu={customMenu} isPreview={true} />
                        : <Loader size="md" content="Getting Menu" />
                    }
                </Modal.Body>
            </Modal>
        </Grid>

    )
}
