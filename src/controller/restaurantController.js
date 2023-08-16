import axiosInstance from "../interceptors/axiosInstance"

class RestaurantController {

    submitCustom = (data) => {
        return axiosInstance.post("Restaurant/Custom", data);
    }

    getAllCustoms = () => {
        return axiosInstance.get("Restaurant/Customs");
    }

    removeCustom = (id) => {
        return axiosInstance.get("Restaurant/RemoveCustom", { params: { id } })
    }

    searchRestaurant = ({ searchQuery, location }) => {
        return axiosInstance.get("Restaurant/Search", { params: { searchQuery, latitude: location.coords.latitude, longitude: location.coords.longitude } })
    }

    getRestaurantByID = (id, menuSource) => {
        console.log('menuSource', menuSource)
        return axiosInstance.get("Restaurant/Get", { params: { id, menuSource } })
    }

    getMeniItemOptionsByID = ({ id, menuSource }) => {
        return axiosInstance.get("Restaurant/GetMenuItemOptions", { params: { id: id, menuSource: menuSource } })
    }

    getMenuItemModifiersByID = (id) => {
        return axiosInstance.get("Restaurant/GetMenuItemModifiers", { params: { id } })
    }
    getItemComponentsByID = (id) => {
        return axiosInstance.get("Restaurant/GetItemComponents", { params: { id } })
    }

}

export default new RestaurantController();