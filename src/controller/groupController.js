import axiosInstance from "../interceptors/axiosInstance"

class GroupController {

    submitGroup = (data) => {
        return axiosInstance.post("Group/Create", data)
    }

    getMyGroups = () => {
        return axiosInstance.get("Group/My")
    }

    getAllGroups = () => {
        return axiosInstance.get("Group/All");
    }

    getGroup = (id) => {
        return axiosInstance.get("Group", { params: { id } })
    }

    removeGroup = (id) => {
        return axiosInstance.post("Group/Update", { id, action: 1 })
    }

    changeOrderingStatus = (id, status, name, logo) => {
        return axiosInstance.post("Group/ChangeOrderingStatus/", { id, status, name, logo })
    }
    
    changeDeliveryCost = (id, delivery) => {
        return axiosInstance.post("Group/ChangeDeliveryCost/", { id, delivery })
    }

    changeTimer = (id, timer) => {
        return axiosInstance.post("Group/ChangeTimer/", { id, timer })
    }


    checkOut = (groupID) => {
        return axiosInstance.get("Group/Checkout", { params: { groupID } })
    }

    getAllOrders = () => {
        return  axiosInstance.get("Group/Orders");
    }

    getOrderByID = (orderID) => {
        return  axiosInstance.get("Group/Order", { params: { id:orderID } });
    }
}

export default new GroupController();