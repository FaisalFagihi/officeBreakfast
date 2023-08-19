import { Input, InputGroup, Loader, Modal } from "rsuite";
import { RestaurantItem } from "../../components/Restaurant/RestaurantItem";
import SearchIcon from '@rsuite/icons/Search';
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import restaurantController from "../../controller/restaurantController";
import MenuPage from "./MenuPage";
import Toaster from "../../components/Toaster";
import { Panel } from "../../style/Style";
import Fatch from '../../Helpers/Fatcher';
import DeliveryAppLinkPage from "../User/DeliveryAppLinkPage";

export default function RestaurantsSection({ setSelectedRestaurant, isHorizontal }) {
    const [restaurantsResult, setResturantsResult] = useState([])
    const [loadBranchMenu, setLoadBranchMenu] = useState(false)
    const [isModalOpen, setModalOpenStatus] = useState(false);
    const [viewRestaurantID, setViewRetrestaurantID] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState();
    const [reload, setReload] = useState(false);
    const [customReload, setCustomReload] = useState(false);
    const [selectedRestaurentID, setSelectRestaurentID] = useState(null);
    const [customs, setCustoms] = useState();
    const [menuSource, setMenuSource] = useState(0);

    const toaster = Toaster()

    const handlePreviewButton = (restaurant) => {
        if (setSelectedRestaurant) {
            setSelectRestaurentID(restaurant?.id)
            setSelectedRestaurant({ restaurant: restaurant, menuSource: 0 })
            return;
        }
        setMenuSource(0)
        setViewRetrestaurantID(restaurant?.id)
        setModalOpenStatus(true);
    }

    const handleCustomPreviewButton = (restaurant) => {
        if (setSelectedRestaurant) {
            setSelectRestaurentID(restaurant?.id)
            setSelectedRestaurant({ restaurant: restaurant, menuSource: 1 })
            return;
        }
        setMenuSource(1)
        setViewRetrestaurantID(restaurant?.id)
        setModalOpenStatus(true);
    }

    const removeCustom = (id) => {
        //Confirmation message
        restaurantController.removeCustom(id).then((data) => {
            setCustomReload(!customReload)
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }

    const handleEnterKeyDownEvent = (event) => {
        if (event.key === 'Enter') {
            setSearchQuery(event.target.value);
            setReload(!reload)
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            setLocation(location)
        })
    }, []);

    const navigate = useNavigate();

    const search = useRef();

    return (
        <div>
            <Panel header={<div className="flex gap-2">
            {/* https://lf16-adcdn-va.ibytedtos.com/obj/i18nblog//images/916cfdb23feb3d4101060bbf755cbdcd.jpg */}
                <img src='https://lf16-adcdn-va.ibytedtos.com/obj/i18nblog//images/916cfdb23feb3d4101060bbf755cbdcd.jpg' alt='logo' className='h-8 rounded object-cover ' draggable="false" />
                <h4>Shgardi Menu</h4>
            </div>}>
                <div>
                    <InputGroup inside >
                        <Input placeholder="Search.." ref={search} name='restaurant' onKeyDown={handleEnterKeyDownEvent} />
                        <InputGroup.Button tabIndex={-1} onClick={() => { setSearchQuery(search.current.value); setReload(!reload) }}>
                            <SearchIcon />
                        </InputGroup.Button>
                    </InputGroup>
                </div>
                {
                    location ?
                        <Fatch setData={setResturantsResult} request={restaurantController.searchRestaurant} params={{ searchQuery, location }} reload={reload}>
                            <div className={`${isHorizontal ? 'w-auto h-52' : 'h-auto p-1 max-h-96'} overflow-auto`}>
                                <div className={`justify-start grid gap-1 ${isHorizontal ? 'grid-rows-1 grid-flow-col' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'}`}>

                                    {restaurantsResult?.map((restaurant) =>
                                        <RestaurantItem className={`${isHorizontal ? 'w-72' : ''}`} isSelected={selectedRestaurentID === restaurant?.id} key={restaurant.id} name={restaurant.name} logo={restaurant.logo}
                                            image={restaurant.image}
                                            distance={restaurant.distance}
                                            delivey={restaurant.deliveyCost}
                                            previewButton={() => handlePreviewButton(restaurant)}
                                            onEditClik={!isHorizontal ? () => navigate("./customize/", { state: { restaurant: restaurant, menuSource: 0 } }) : null} />
                                    )}
                                </div>
                            </div>
                        </Fatch> : <>Identifying your location..</>
                }

            </Panel>

            <div hidden={!customs?.length > 0 }>

                <Panel header={<h4>Custom Menu</h4>}>
                    <Fatch setData={setCustoms} request={restaurantController.getAllCustoms} reload={customReload}>
                        <div className={`${isHorizontal ? 'w-auto h-52' : 'h-auto p-1 max-h-96'} overflow-auto`}>

                            <div className={`justify-start grid gap-1 ${isHorizontal ? 'grid-rows-1 grid-flow-col' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 '}`}>
                                {customs?.map((customRestaurant) =>
                                    <RestaurantItem className={`${isHorizontal ? 'w-72' : ''}`} isSelected={selectedRestaurentID === customRestaurant?.id} key={customRestaurant.id} name={customRestaurant.name} logo={customRestaurant.logo}
                                        image={customRestaurant.image}
                                        distance={customRestaurant.distance}
                                        delivey={customRestaurant.deliveyCost}
                                        previewButton={() => handleCustomPreviewButton(customRestaurant)}
                                        onEditClik={!isHorizontal ? () => navigate("./customize/", { state: { restaurant: customRestaurant, menuSource: 1 } }) : null}
                                        onRemoveClik={() => removeCustom(customRestaurant?.id)}
                                    />

                                    // <VendorCustom key={item.vendor.id} name={item.vendor.name} logo={item.vendor?.logo}
                                    //     image={item.vendor.photo} delivery={item.vendor.delivery_fee}
                                    //     editButton={() => editCustom(item.vendor.id)} removeButton={() => removeCustom(item.vendor.id)}
                                    //     previewButton={() => viewCustom(item.menu)} />
                                )}
                            </div>
                        </div>
                    </Fatch>
                </Panel>
            </div>

            <Modal overflow={true} size="md" open={isModalOpen} onClose={() => setModalOpenStatus(false)}>
                <Modal.Header>
                    <h3>Preview</h3>
                </Modal.Header>
                <Modal.Body>
                    {(!loadBranchMenu) ?
                        <MenuPage restaurantID={viewRestaurantID} menuSource={menuSource} isPreview={true} />
                        : <Loader size="md" content="Getting Menu" />
                    }
                </Modal.Body>
            </Modal>

        </div>

    );
}
