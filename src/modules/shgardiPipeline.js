import uuid from 'react-uuid';

class ShgardiPipeline {
    constructor() {
        this.baseUrl = "https://catalog.cdn.shgardi.app/"
    }
    getResturant = (data) => {

        return {
            id: data.id,
            name: data.name,
            distance: data.distance,
            logo: this.baseUrl + data.logoUrl,
            photo: this.baseUrl + data.storeCoverImageUrl,
            delivery_fee: data.deliveryFees,
            promotion: data.catalogOffersHomePageNotifications[0] != null ? {
                message: data.catalogOffersNotifications[0].split("الى")[0],
                minimum_order: data.catalogOffersHomePageNotifications[0]?.text,
                fee: data.catalogOffersHomePageNotifications[0]?.deliveryFee,
            } : null

        }
    }

    getMenu = (data) => {
        let id = uuid()
        let menuItems = data?.productList?.map(x=> this.getMenuItem(x))
        menuItems.menuGroupID = id
        return {
            menuGroupID:id, 
            menuGroupName: data?.categoryName,
            menuGroupName_en: data?.categoryName,
            menuItems: menuItems,
        }
    }

    getMenuItem = (data) => {

        return {
            id: data.productId,
            name: data.name,
            name_en: data.name,
            photo: this.baseUrl + data.imageUrl,
            description : data.description,
            price: parseFloat(data.price),
            calorie: data.calorie
        }
    }

    getMenuItemOptions = (data) => {

        return {
            id: data.skuId,
            name: data.skuName,
            photo: this.baseUrl + data.images[0]?.imageUrl,
            description : data.description,
            price: parseFloat(data.price),
            calorie: data.calorie,
            size: data.size,
            minQty: data.minQty,
            maxQty: data.maxQty,
        }
    }
    getMenuItemComponents = (productId,data) => {

        return {
            productId,
            id: data.id,
            name: data.name,
            price: parseFloat(data.price)
        }
    }
    getModifierGroups = (data) => {
        
        return {
            id: data.id,
            name: data.name.ar,
            // name_en: data.name.en,
            minQty:data.minSelection,
            maxQty:data.maxSelection,
            modifierItems: data.items.map(x=> this.getModifierItems(x))
        }
    }
    getModifierItems = (data) => {
        return {
            id: data.id,
            name: data.name.ar,
            // name_en: data.name.en,
            price: parseFloat(data.price),
            calorie: data.calorie,
        }
    }
}

export default new ShgardiPipeline();
// {
//     "restaurantId": 15175,
//     "restaurantName": "جمعية الأطفال ذوي الإعاقة",
//     "branchId": 33975,
//     "branchName": "جمعية الأطفال ذوي الإعاقة",
//     "cityName": "Riyadh",
//     "cityId": 1,
//     "lat": 24.68773,
//     "lon": 46.72185,
//     "rating": 8,
//     "vote": 1,
//     "distance": 840.4995990246492,
//     "cuisines": "JahezCharity",
//     "workhr": "05:00 AM - 04:59 AM",
//     "logo": "http://www.jahez.net/ShowRestaurantLogo.htm?restaurantId=15175&_=null",
//     "logob": null,
//     "nowworking": "Y",
//     "deliveryChrg": 15,
//     "hasDelivery": "true",
//     "currency": "SAR",
//     "hasImage": "Y",
//     "delv_t_code": "F",
//     "deliveryPrice": null,
//     "vatEnabled": "Y",
//     "createdDate": "13-04-2022",
//     "menuClass": "JAHEZ",
//     "thirdPartyBranchId": null,
//     "scheduleFlag": false,
//     "eventFlag": null,
//     "countryCode": "SA",
//     "pickupEnabled": null,
//     "modifiedDate": "null",
//     "vatExempted": "N",
//     "menuMobileList": null
// }