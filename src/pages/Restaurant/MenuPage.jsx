import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Modal, Stack } from 'rsuite';
import { MenuItem } from '../../components/Menu/MenuItem';
import MenuItemControl from '../../components/Menu/MenuItemControl';
import Toaster from '../../components/Toaster';
import restaurantController from '../../controller/restaurantController';
import axiosInstance from "../../interceptors/axiosInstance"
import shgardiPipeline from '../../modules/shgardiPipeline';

// var branchData = require("../data/alShalalMenu.json");

export default function MenuPage({ restaurantID, menu, menuSource = 0, isPreview, addToCart, height }) {
    const { restaurant_id, menu_source } = useParams()
    const [menuData, setMenuData] = useState(menu);

    const [menuGroups, setMenuGroups] = useState(null);
    const [menuItems, setMenuItems] = useState(null);
    const [selectedMenuItem, selectMenuItem] = useState();
    const [menuItemOptions, setMenuItemOptions] = useState(null);
    const [menuItemComponents, setMenuItemComponents] = useState(null);
    const [modalValue, setModalValue] = useState({ isOpen: false, menuItemID: 0 });

    const toaster = Toaster()

    const getData = () => restaurantController.getRestaurantByID(restaurantID == null ? restaurant_id : restaurantID, menuSource == null ? menu_source : menuSource)
        .then(function ({ data }) {
            if (menuSource === 0) {
                setMenuData(data?.response.map(x => shgardiPipeline.getMenu(x)))
            } else {
                setMenuData(data)
            }

        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    useEffect(() => {

        if (menu !== null && menu !== undefined) {
            console.log(menu)
            setMenuData(menu)
            return;
        }
        getData();
    }, []);


    useEffect(() => {
        if (menuData === null || menuData === undefined) {
            return;
        }
        setMenuGroups(menuData)
        setMenuItems(menuData[0]?.menuItems)
    }, [menuData]);

    const getMenuItemOption = async (item) => {
        if (menuSource === 0) {
            return restaurantController.getMeniItemOptionsByID(item.id).then(({ data }) => {
                setMenuItemOptions(data?.response?.map(x => shgardiPipeline.getMenuItemOptions(x)))
                console.log(1.0)
            }).catch(({ response }) => {
                toaster.push(response?.data, "error")
            })
        } else {
            let options = [{
                id: item.id,
                name: item.name,
                photo: item.photo,
                description: item.description,
                price: item.price,
                calorie: null,
                size: null,
                minQty: 1,
                maxQty: 10,
            }]
            setMenuItemOptions(options)
        }
    }
    const getMenuItemComponents = async (id) => {
        return restaurantController.getItemComponentsByID(id).then(({ data }) => {
            setMenuItemComponents(data?.response?.additions?.map(x => shgardiPipeline.getMenuItemComponents(id, x)))
            console.log(2.0)
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }
    const openMenuItem = async (item) => {
        selectMenuItem(item)
        await getMenuItemOption(item)
        await getMenuItemComponents(item.id)
        setModalValue({ isOpen: true })
    }

    return menuGroups && (
        <>
            {menuGroups?.map((item, index) =>
                <div key={item.menuGroupID} className="MenuGroups">
                    <input id={item.menuGroupID} name='{item.menuGroupID}' type="radio" className="MenugroupItem" defaultChecked={index === 0} />
                    <label htmlFor={item.menuGroupID} className="MenugroupItem" onClick={() => setMenuItems(item?.menuItems)}>
                        {item.menuGroupName}
                    </label>
                </div>
            )}

            <br />
            <Container style={{ overflow: "auto", height: height }}>
                <Stack wrap spacing={10}>
                    {menuItems?.map((item) =>
                        <MenuItem key={item.id} name={item.name}
                            price={item.price}
                            calories={item.calories}
                            photo={item.photo}
                            onClick={() => openMenuItem(item)} />
                    )}
                </Stack>
            </Container>

            <Modal open={modalValue.isOpen && !isPreview} onClose={() => setModalValue({ isOpen: false })}>
                <MenuItemControl
                    key={selectedMenuItem?.id}
                    id={selectedMenuItem?.id}
                    name={selectedMenuItem?.name}
                    description={selectedMenuItem?.description}
                    price={selectedMenuItem?.price}
                    calorie={selectedMenuItem?.calorie}
                    photo={selectedMenuItem?.photo}
                    options={menuItemOptions} addToCart={addToCart}
                    components={menuItemComponents}
                    onAddToCart={() => setModalValue({ isOpen: false })} />
            </Modal>
        </>
    );


}
