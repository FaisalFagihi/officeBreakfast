import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Modal, Stack } from 'rsuite';
import { MenuItem } from '../../components/Menu/MenuItem';
import MenuItemControl from '../../components/Menu/MenuItemControl';
import MenuItemOptions from '../../components/Menu/MenuItemOptions';
import Toaster from '../../components/Toaster';
import restaurantController from '../../controller/restaurantController';
import axiosInstance from "../../interceptors/axiosInstance"
import deliveryAppFactory from '../../modules/deliveryAppFactory';
import Fatch from '../../Helpers/Fatcher';

// var branchData = require("../data/alShalalMenu.json");

export default function MenuPage({ restaurantID, menu, menuSource = 0, isPreview, addToCart, disabled }) {
    const { restaurant_id, menu_source } = useParams()
    const [menuData, setMenuData] = useState(menu);

    const [menuGroups, setMenuGroups] = useState(null);
    const [menuItems, setMenuItems] = useState(null);
    const [selectedMenuItemID, selectMenuItemID] = useState(null);
    const [menuItemOptions, setMenuItemOptions] = useState(null);
    const [menuItemComponents, setMenuItemComponents] = useState(null);
    const [modalValue, setModalValue] = useState({ isOpen: false, menuItemID: 0 });

    const toaster = Toaster()

    const getData = () => restaurantController.getRestaurantByID(restaurantID == null ? restaurant_id : restaurantID, menuSource == null ? menu_source : menuSource)
        .then(function ({ data }) {
            setMenuData(data?.menuGroups)
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })

    useEffect(() => {

        if (menu !== null && menu !== undefined) {
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
        return restaurantController.getMeniItemOptionsByID(`${item.id}&${restaurantID}`).then(({ data }) => {
            setMenuItemOptions(data)
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }

    const getMenuItemComponents = async (id) => {
        return restaurantController.getItemComponentsByID(id).then(({ data }) => {
            setMenuItemComponents(data?.response?.additions?.map(x => deliveryAppFactory.getMenuItemComponents(id, x)))
        }).catch(({ response }) => {
            toaster.push(response?.data, "error")
        })
    }

    const openMenuItem = (item) => {
        selectMenuItemID(item.id)
        // await getMenuItemOption(item)
        setModalValue({ isOpen: true })
    }

    return menuGroups && (
        <>
        <div className='menugroupsContainer flex  gap-2 items-start overflow-auto w-full  lg:flex-wrap whitespace-nowrap pb-0 
        scroll-smooth '>
            {menuGroups?.map((item, index) =>
                <div key={item.id} className="MenuGroups w-auto">
                    <input id={item.id} name='{item.id}' type="radio" className="MenugroupItem w-full" defaultChecked={index === 0} />
                    <label htmlFor={item.id} className={`MenugroupItem py-1 px-2 ${disabled? 'cursor-not-allowed':'cursor-pointer'}`} onClick={(e) => !disabled ? setMenuItems(item?.menuItems):e.preventDefault() }>
                        {item.nameAr}
                    </label>
                </div>
            )}
            </div>

            <br />
                <div className={`cartHeight flex flex-col xl:grid xl:grid-cols-2 gap-2 p-2 xl:max-h-[600px] xl:!h-full overflow-auto items-start scroll-smooth ${disabled? 'cursor-not-allowed':'cursor-default'}`}>
                    {menuItems?.map((item) =>
                        <MenuItem key={item.id} name={item.nameAr}
                            price={item.price}
                            calories={item.calories}
                            photo={item.image}
                            onClick={!disabled? () => openMenuItem(item):()=>{}} />
                    )}
                </div>

            <Modal  open={modalValue.isOpen && !isPreview} onClose={() => setModalValue({ isOpen: false })}>
                <Fatch request={restaurantController.getMeniItemOptionsByID} params={{id: `${selectedMenuItemID}&${restaurantID}`, menuSource:menuSource}} setData={setMenuItemOptions} >
                    <MenuItemOptions
                        key={menuItemOptions?.id}
                        id={menuItemOptions?.id}
                        name={menuItemOptions?.nameAr}
                        description={menuItemOptions?.description}
                        price={menuItemOptions?.price}
                        calorie={menuItemOptions?.calorie}
                        photo={menuItemOptions?.image}
                        options={menuItemOptions?.modifierGroups}
                        types={menuItemOptions?.types}
                        addToCart={addToCart}
                        onAddToCart={() => setModalValue({ isOpen: false })} />
                </Fatch>
            </Modal>
        </>
    )
}
