import JahezPipeline from "./JahezPipeline";
import shgardiPipeline from "./shgardiPipeline"

class DeliveryAppFactory {

    constructor() {
        this.pipline = JahezPipeline;
    }

    getResturants = (data) => {
        return this.pipline.getResturants(data)
    }

    getMenu = (data) => {
        return this.pipline.getMenu(data)
    }

    getMenuItem = (data) => {
        return this.pipline.getMenuItem(data)
    }

    getModifierGroups = (data) => {
        return this.pipline.getModifierGroupst(data)

    }
    getModifierItems = (data) => {
        return this.pipline.getModifierItems(data)
    }

    getMenuItemOptions = (data) => {
        return this.pipline.getMenuItemOptions(data)
        
    }
    getMenuItemComponents = (productId, data) => {
        return this.pipline.getMenuItemComponents(data)
    }
}

export default new DeliveryAppFactory();
