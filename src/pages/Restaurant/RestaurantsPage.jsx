import { Button, Input, InputGroup, Loader, Modal, Panel, Stack } from "rsuite";
import { RestaurantItem } from "../../components/Restaurant/RestaurantItem";
import SearchIcon from '@rsuite/icons/Search';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import restaurantController from "../../controller/restaurantController";
import { VendorCustom } from "../../components/Restaurant/RestaurantCustomItem";
import shgardiPipeline from "../../modules/shgardiPipeline";
import MenuPage from "./MenuPage";
import Toaster from "../../components/Toaster";

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
    return (
        <>
            <Panel shaded style={{ height: "auto" }} className="mt-3">
                <InputGroup inside>
                    <Input placeholder="Search.." name='restaurant' onKeyDown={handleKeyDown} />
                    <InputGroup.Button tabIndex={-1}>
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>
                <Stack wrap alignItems='center' justifyContent='center' className="mt-3" style={{ height: "600px", overflow: "auto" }} >
                    {!loadRestaurants ?
                        <Stack wrap spacing={10}>

                            {restaurantsResult?.map((restaurant) =>
                                <RestaurantItem isSelected={selectedRestaurant?.id === restaurant?.id} key={restaurant.id} name={restaurant.name} logo={restaurant.logo}
                                    image={restaurant.photo}
                                    promotion={restaurant?.promotion} minimumOrder={restaurant?.minimum_order}
                                    distance={restaurant.distance}
                                    delivey={restaurant.delivery_fee}
                                    previewButton={() => viewVendor(restaurant.id)}
                                    onCardClik={() => setSelectedRestaurant(restaurant)} />
                            )}
                        </Stack>
                        : <Loader size="md" content="Getting restaurants" style={{ textAlign: "center", width: "100%", marginTop: "100px", height: "700px" }} />
                    }
                </Stack>
                <Button disabled={selectedRestaurant == null} block onClick={() => navigate("./customize/", { state: selectedRestaurant })}>Customize</Button>
            </Panel>

            <Panel header={<h4>Customs</h4>} shaded style={{ height: "auto" }} className="mt-3">
                <Stack wrap spacing={10}>
                    {customs?.map((item) =>
                        <VendorCustom key={item.vendor.id} name={item.vendor.name} logo={item.vendor?.logo}
                            image={item.vendor.photo}
                            editButton={() => editCustom(item.vendor.id)} removeButton={() => removeCustom(item.vendor.id)}
                            previewButton={() => viewCustom(item.menu)} />
                    )}
                </Stack>
            </Panel>

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
        </>

    );
}
