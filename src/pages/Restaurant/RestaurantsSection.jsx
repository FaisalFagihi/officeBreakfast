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
import { BsSearch } from "react-icons/bs";
import { MdNoFood } from "react-icons/md";

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
            <Panel header={"My Menus"} hidden={!customs?.length > 0}>
                <Fatch setData={setCustoms} request={restaurantController.getAllCustoms} reload={customReload}>
                    <div className={`overflow-auto p-2`}>
                        <div className={`justify-start  gap-5 ${isHorizontal ? 'grid grid-rows-1 grid-flow-col' : 'flex flex-wrap'}`}>
                            {
                                customs?.length > 0 ?
                                    customs?.map((customRestaurant) =>
                                        <div className={'w-full sm:w-56'}>
                                            <RestaurantItem isSelected={selectedRestaurentID === customRestaurant?.id} key={customRestaurant.id} name={customRestaurant.name} logo={customRestaurant.logo}
                                                image={customRestaurant.image}
                                                distance={customRestaurant.distance}
                                                rating={customRestaurant.rating}
                                                delivey={customRestaurant.deliveyCost}
                                                previewButton={() => handleCustomPreviewButton(customRestaurant)}
                                                onEditClik={!isHorizontal ? () => navigate("./customize/", { state: { restaurant: customRestaurant, menuSource: 1 } }) : null}
                                                onRemoveClik={!isHorizontal ? () => removeCustom(customRestaurant?.id) : null}
                                            />
                                        </div>
                                    ) :
                                    <div className="flex flex-col gap-2 m-auto p-5">
                                        <MdNoFood style={{ fontSize: "3em", width: "100%" }} />
                                        <div> You dont have any custom restaurant</div>
                                    </div>}
                        </div>
                    </div>
                </Fatch>
            </Panel>

            <Panel header={"Menus"}>
                <div className="relative mb-2">
                    <input type="text" className="w-full p-2 shadow-sm rounded-lg bg-white" placeholder="Search.." ref={search} name='restaurant' onKeyDown={handleEnterKeyDownEvent} />
                    <BsSearch className="cursor-pointer absolute top-3 right-3" onClick={() => { setSearchQuery(search.current.value); setReload(!reload) }} />
                </div>
                {
                    location ?
                        <Fatch setData={setResturantsResult} request={restaurantController.searchRestaurant} params={{ searchQuery, location }} reload={reload}>
                            <div className={`p-2 overflow-auto`}>
                                <div className={`justify-start  gap-5 ${isHorizontal ? 'grid grid-flow-col' : 'flex flex-wrap'}`}>

                                    {restaurantsResult?.length > 0 ?
                                        restaurantsResult?.map((restaurant) =>
                                            <div className={'w-full sm:w-56'}>

                                                <RestaurantItem isSelected={selectedRestaurentID === restaurant?.id} key={restaurant.id} name={restaurant.name} logo={restaurant.logo}
                                                    image={restaurant.image}
                                                    distance={restaurant.distance}
                                                    rating={restaurant.rating}
                                                    delivey={restaurant.delivreyCost}
                                                    previewButton={() => handlePreviewButton(restaurant)}
                                                    onEditClik={!isHorizontal ? () => navigate("./customize/", { state: { restaurant: restaurant, menuSource: 0 } }) : null} />
                                            </div>
                                        ) :
                                        <div className="flex flex-col gap-2 m-auto p-5">
                                            <MdNoFood style={{ fontSize: "3em", width: "100%" }} />
                                            <div> Can't find restaurants</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Fatch> : <>Identifying your location..</>
                }

            </Panel>

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
