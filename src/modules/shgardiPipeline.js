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
