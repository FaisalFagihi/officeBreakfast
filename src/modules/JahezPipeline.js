import uuid from 'react-uuid';

class JahezPipeline {
    constructor() {
        this.baseUrl = "https://catalog.cdn.shgardi.app/"
    }

     getParameterCaseInsensitive(object, key) {
        var asLowercase = key.toLowerCase();
        return object[Object.keys(object).find(key => key.toLowerCase() === asLowercase)];
      }

    getResturants = (jahezData) => {
        return jahezData.map(x => this.getResturant(x))
    }

    getResturant = (jahezData) => {
        return {
            id: jahezData.restaurantId.toString() +'|'+jahezData.branchId.toString(),
            name: jahezData.restaurantName,
            distance: jahezData.distance,
            logo: jahezData.logo,
            photo: jahezData.logo,
            deliveryCost: 0,
        }


    }

    groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    }

    getMenu = (data) => {
        let id = uuid()
        let categories = this.groupBy(data?.menuList, 'categoryId')
        let menu = Object.keys(categories).map(x => ({

            menuGroupID: categories[x][0].categoryId,
            menuGroupName: categories[x][0].categoryName,
            menuGroupName_en: categories[x][0].categoryName,
            menuItems: this.getMenuItem(categories[x])
        }))

        return menu;
    }

    getMenuItem = (data) => {
       return data.map(item => ({
            id: item.itemId,
            name: item.itemName,
            name_en: item.itemName,
            photo: item.image,
            description: '',
            price: parseFloat(item.prize),
            calorie: null
        }))

    }

    getMenuItemOptions = (data) => {
        return {
            id: data.itemId,
            name: data.itemName,
            photo: data.imageUrl,
            description: data.description,
            price: data.price,
            calorie: data.calories,
            size: data.size,
            modifiersGroups: data.modifiers.map(x=> this.getModifierGroups(x)),
        }
    }
    getMenuItemComponents = (productId, data) => {

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
            name: data.nameAr,
            name_en: data.nameEn,
            minQty: data.minOption,
            maxQty: data.maxOption,
            modifierItems: data.options.map(x => this.getModifierItems(x))
        }
    }
    getModifierItems = (data) => {
        return {
            id: data.id,
            name: data.nameAr,
            name_en: data.nameEn,
            price: data.price,
            calorie: data.calories,
        }
    }
}

export default new JahezPipeline();







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