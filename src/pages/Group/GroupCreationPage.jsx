import React, { useEffect, useState } from 'react'
import { Grid, Row, Col, Stack, Input, InputNumber, Divider, InputGroup, Button, Modal, Loader } from 'rsuite';
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
import { Panel } from '../../style/Style';

export default function GroupCreationPage({ afterSubmit }) {
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
      console.log(restaurant)
        let data = {
            id: 0,
            restaurantID: restaurant.id,
            name: restaurant.name,
            photo: restaurant.photo,
            logo: restaurant.logo,
            timer: timer,
            delivery: restaurant.delivery_fee,
            promotionMinimumOrder: parseInt(restaurant.promotion?.minimum_order),
            promotionName: restaurant.promotion?.message,
            menuSource: menuSource
        }
        setSelectedRestaurant(data)
    }

    return (
        <div className='p-2'>

            <div className='mb-3'>
                <div>Restaurant</div>

                <Input disabled readOnly value={selectedRestaurant?.name} />

                <div>Timer</div>

                <InputNumber size="md" value={timer} min={0} postfix={<BsStopwatch />} onChange={(value) => setTimer(value)} />

                <div>Delivery</div>

                <InputNumber value={delivery} postfix="SR" onChange={(value) => setDelivery(value)} />
            </div>

            <Panel header={<div className="flex  gap-1">
                <img src='https://lf16-adcdn-va.ibytedtos.com/obj/i18nblog//images/916cfdb23feb3d4101060bbf755cbdcd.jpg' alt='logo' className='h-8 rounded object-cover' draggable="false" />
                <h4>Shgardi Menu</h4>
            </div>}>
                <InputGroup inside>
                    <Input placeholder="Search.." name='restaurant' onKeyDown={handleKeyDown} />
                    <InputGroup.Button tabIndex={-1}>
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>
                {!loadRestaurants ?
                    <div className='h-auto grid mt-2 grid-rows-1 grid-flow-col gap-1 overflow-auto justify-start' spacing={20}  >
                        {vendorsResult?.map((restaurant) =>
                            <div className='w-72'>
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
                                    previewButton={() => selectRestaurent(restaurant, 0)} />
                            </div>
                        )}
                    </div> : <Loader size="sm" className='flex justify-center my-10' content="Getting restaurants" />
                }

            </Panel>
<br/>
            <Panel header={<h6>Custom Menu</h6>} hidden={customs?.length === 0}>
                {!loadCustomRestaurants ?
                    <div className='h-auto grid grid-rows-1 grid-flow-col gap-1 justify-start overflow-auto' spacing={20}  >
                        {customs?.map((custom) =>
                            <div className='w-72'>
                                <RestaurantItem isSelected={selectedRestaurant?.restaurantID === custom.vendor?.id} key={custom.vendor.id} name={custom.vendor.name} logo={custom.vendor.logo}
                                    image={custom.vendor.photo}
                                    promotion={custom.vendor?.promotion} minimumOrder={custom.vendor?.minimum_order}
                                    distance={custom.vendor.distance}
                                    delivey={custom.vendor.delivery_fee}
                                    previewButton={() => selectRestaurent(custom.vendor, 1)} />
                            </div>
                        )}
                    </div> : <Loader size="md" content="Getting restaurants" style={{ textAlign: "center", width: "100%", marginTop: "100px" }} />
                }

            </Panel>
            <Row className='mt-3 px-2'>
                <Button className='secondary' block onClick={() => create()}>Submit</Button>
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
        </div>
    )
}
