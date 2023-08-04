import { Button, Input, InputGroup, Loader, Modal, Stack } from "rsuite";
import { RestaurantItem } from "../../components/Restaurant/RestaurantItem";
import SearchIcon from '@rsuite/icons/Search';
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import restaurantController from "../../controller/restaurantController";
import { VendorCustom } from "../../components/Restaurant/RestaurantCustomItem";
import shgardiPipeline from "../../modules/shgardiPipeline";
import MenuPage from "./MenuPage";
import Toaster from "../../components/Toaster";
import { Panel } from "../../style/Style";

export default function RestaurantsPage() {
    const [restaurantsResult, setResturantsResult] = useState([])
    const [loadRestaurants, setloadRestaurants] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [loadBranchMenu, setLoadBranchMenu] = useState(false)
    const [isModalOpen, setModalOpenStatus] = useState(false);
    const [isCustomModalOpen, setCustopmModalOpenStatus] = useState(false);
    const [customMenu, setCustomMenu] = useState(null);
    const [customs, setCustoms] = useState();
    const [viewRestaurantID, setViewRetrestaurantID] = useState(null);

    const viewVendor = (restaurantID) => {
        setViewRetrestaurantID(restaurantID)
        setModalOpenStatus(true);
    }


    const editCustom = (id) => {

    }

    const toaster = Toaster()

    const removeCustom = (id) => {
        //Confirmation message
        restaurantController.removeCustom(id).then((data) => {
            restaurantController.getAllCustoms().then(({ data }) => {
                console.log(data);
                setCustoms(data)
            }).catch(({ response }) => {
                toaster.push(response?.data, "error")
            })
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }
    useEffect(() => {
        setloadRestaurants(true)
        searchRestaurant("")
        restaurantController.getAllCustoms().then(({ data }) => {
            console.log(data);
            setCustoms(data)
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }, [])

    const searchRestaurant = (searchQuery) => {
        navigator.geolocation.getCurrentPosition((location) => {
            restaurantController.searchRestaurant(searchQuery, location).then(({ data }) => {
                console.log("ssss", data)
                setResturantsResult(data?.response?.items.map(x => shgardiPipeline.getResturant(x)))
            }).catch(({ response }) => {
                toaster.push(response?.data, "error")
                console.log("ssss", response)

            }).finally(() => {
                setloadRestaurants(false)
            })
        })

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchRestaurant(event.target.value);
        }
    };


    const viewCustom = (menu) => {
        setCustomMenu(menu)
        setCustopmModalOpenStatus(true)
    }

    const navigate = useNavigate();

    const search = useRef();

    return (
        <div>

            <Panel header={<div className="flex gap-1">
                <img src='https://lf16-adcdn-va.ibytedtos.com/obj/i18nblog//images/916cfdb23feb3d4101060bbf755cbdcd.jpg' alt='logo' className='h-8 rounded object-cover' draggable="false" />
                <h4>Shgardi Menu</h4>
            </div>}>
                <div>
                    <InputGroup inside >
                        <Input placeholder="Search.." ref={search} name='restaurant' onKeyDown={handleKeyDown} />
                        <InputGroup.Button tabIndex={-1} onClick={() => searchRestaurant(search.current.value)}>
                            <SearchIcon />
                        </InputGroup.Button>
                    </InputGroup>
                </div>
                <div className={'h-auto p-1 max-h-96 overflow-auto '}>
                    {!loadRestaurants ?
                        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">

                            {restaurantsResult?.map((restaurant) =>
                                <RestaurantItem isSelected={selectedRestaurant?.id === restaurant?.id} key={restaurant.id} name={restaurant.name} logo={restaurant.logo}
                                    image={restaurant.photo}
                                    promotion={restaurant?.promotion} minimumOrder={restaurant?.minimum_order}
                                    distance={restaurant.distance}
                                    delivey={restaurant.delivery_fee}
                                    previewButton={() => viewVendor(restaurant.id)}
                                    onCardClik={() => navigate("./customize/", { state: restaurant })} />
                            )}
                        </div>
                        : <Loader size="sm" content="Getting restaurants" className="flex justify-center mt-10" />
                    }
                </div>
            </Panel>

            <div hidden={customs?.length === 0}>

                <Panel header={<h4>Custom Menu</h4>}>
                    <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                        {customs?.map((item) =>
                            <VendorCustom key={item.vendor.id} name={item.vendor.name} logo={item.vendor?.logo}
                                image={item.vendor.photo} delivery={item.vendor.delivery_fee}
                                editButton={() => editCustom(item.vendor.id)} removeButton={() => removeCustom(item.vendor.id)}
                                previewButton={() => viewCustom(item.menu)} />
                        )}
                    </div>
                </Panel>
            </div>

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

    );
}
