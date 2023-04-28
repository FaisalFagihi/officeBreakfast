
## Search Restaurant (الشلال)
- Request ( `https://api.shgardi.app/catalog/api/1.1/Store/location?UserLocation.Latitude=21.624423580473977&UserLocation.Longitude=39.20348212122917&AllPartnerStores=true&SearchText=%D8%A7%D9%84%D8%B4%D9%84%D8%A7%D9%84`)

- Response
    ```json
        {
        "status": "Success",
        "message": "",
        "response": {
            "pageIndex": 1,
            "totalPages": 1,
            "totalCount": 1,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "items": [
            {
                "isBusy": false,
                "logoUrl": "StoreLogoImages/2fedb078-9c9a-4f64-b9c1-d980167c7aa0_2022-10-31_12-52-02-PM.jpg",
                "storeCoverImageUrl": "StoreLogoImages/3df585ae-6e86-4f51-b3a3-0a4cc7d172a3_2023-02-22_01-30-27-PM.jpg",
                "distanceFormatted": "9.4 KM",
                "distance": 9.4,
                "isFavourite": false,
                "rate": 5,
                "maxEstimationDeliveryTime": 40,
                "description": "",
                "name": "Elshalal Pastries",
                "distanceFromDb": 583.9900973198429,
                "partnerId": "735780d9-e1e2-4f1b-9de4-e6cb063af2dc",
                "deliveryFees": 13,
                "partnerDebitFare": 0,
                "isOutOfRange": false,
                "location": {
                "latitude": 21.589875959144056,
                "longitude": 39.25056615459634
                },
                "minimumCharge": 15,
                "isAvailable": true,
                "catalogOffersNotifications": [],
                "catalogOffersHomePageNotifications": [],
                "storeWorkingHours": [
                {
                    "workingFrom": "0.06:00",
                    "workingTo": "0.23:30"
                },
                {
                    "workingFrom": "1.06:00",
                    "workingTo": "1.23:30"
                }
                ],
                "hasAds": false,
                "twitterAccount": "",
                "instagramAccount": "",
                "youtubeAccount": "",
                "facebookAccount": "",
                "snapchatAccount": "",
                "hasDiscount": false,
                "discountSkusCount": 0,
                "maxDiscount": 0,
                "catalogDiscountType": null,
                "isIntegration": false,
                "addressDetails": {
                "fullAddress": "",
                "levels": []
                },
                "deliveryTypes": [
                1
                ],
                "cashbacks": [],
                "zoneId": 149,
                "cityId": 97,
                "storeCategoryTypeId": 30,
                "id": "418a4f26-37ae-4534-990c-c0a752bcd098"
            }
            ]
        }
        }
    ```


## SelectRestaurant (418a4f26-37ae-4534-990c-c0a752bcd098)
- Request ( `https://api.shgardi.app/catalog/api/1.1/Store/products?storeId=418a4f26-37ae-4534-990c-c0a752bcd098&deliveryType=1`)

- Response
    ```json
    {
        "status": "Success",
        "message": "",
        "response": 
            [
                {
                "categoryName": "Best Seller 🔥",
                "productList": 
                    [
                        {
                        "categoryTypeId": 30,
                        "productId": 2017306,
                        "name": "Labneh Pie with Honey",
                        "imageUrl": "ProductImages/d19b760c-9896-4c00-8fa0-2151b7d531c7_2023-01-10_01-56-20-PM.png",
                        "description": "It is made of a special dough, with fresh labneh and delicious honey added to it",
                        "calorie": 237,
                        "maxComponentCount": 6,
                        "minComponentCount": 0,
                        "price": 8,
                        "isAvailable": true,
                        "nameLocalized": {
                            "ar": "فطيرة لبنة بالعسل",
                            "en": "Labneh Pie with Honey"
                        },
                        "hasDiscount": false,
                        "priceAfterDiscount": 8
                        },
                        {
                        "categoryTypeId": 30,
                        "productId": 2017316,
                        "name": "Spinach pie with cheese",
                        "imageUrl": "ProductImages/b5e7b9a5-39fe-4cb3-a96b-5f6d05810f27_2023-01-10_12-20-31-PM.png",
                        "description": "It is made of special dough, topped with spinach prepared daily and sprinkled with fresh cheese",
                        "calorie": 254,
                        "maxComponentCount": 8,
                        "minComponentCount": 0,
                        "price": 8,
                        "isAvailable": true,
                        "nameLocalized": {
                            "ar": "فطيرة سبانخ بالجبن",
                            "en": "Spinach pie with cheese"
                        },
                        "hasDiscount": false,
                        "priceAfterDiscount": 8
                        }
                    ]
                },
                {
                "categoryName": "Labneh pies",
                "productList": 
                    [
                        {
                        "categoryTypeId": 30,
                        "productId": 2017302,
                        "name": "Labneh pie",
                        "imageUrl": "ProductImages/4cb62976-470c-4a4d-a0b1-087dd5a790e5_2023-01-10_11-59-31-AM.png",
                        "description": "It is made of special dough and fresh labneh is added to it",
                        "calorie": 236,
                        "maxComponentCount": 6,
                        "minComponentCount": 0,
                        "price": 6,
                        "isAvailable": true,
                        "nameLocalized": {
                            "ar": "فطيرة لبنة",
                            "en": "Labneh pie"
                        },
                        "hasDiscount": false,
                        "priceAfterDiscount": 6
                        },
                        {
                        "categoryTypeId": 30,
                        "productId": 2017303,
                        "name": "Labneh with thyme pie",
                        "imageUrl": "ProductImages/2764b3b3-3df1-42cf-8537-db73f28c776e_2023-01-10_12-01-50-PM.png",
                        "description": "It is made of special dough, topped with fresh labneh and sprinkled with thyme prepared daily",
                        "calorie": 278,
                        "maxComponentCount": 6,
                        "minComponentCount": 0,
                        "price": 6,
                        "isAvailable": true,
                        "nameLocalized": {
                            "ar": "فطيرة لبنة بالزعتر",
                            "en": "Labneh with thyme pie"
                        },
                        "hasDiscount": false,
                        "priceAfterDiscount": 6
                        }
                    ]
                }
            ]
    }
    ```


## SelectProduct (885726)
- Request ( `https://api.shgardi.app/catalog/api/1.1/Store/skus?productId=885726&DeliveryType=1`)

- Response
    ```json
        {
            "status": "Success",
            "message": "",
            "response": [
                {
                "calorie": 1240,
                "price": 32,
                "hasDiscount": false,
                "priceAfterDiscount": 32,
                "size": "Regular ",
                "sizeLocalized": {
                    "ar": "عادي ",
                    "en": "Regular "
                },
                "skuId": 1141944,
                "isDefault": true,
                "skuName": "Chicken Pasta",
                "skuNameLocalized": {
                    "ar": "باستا الدجاج",
                    "en": "Chicken Pasta"
                },
                "order": 0,
                "images": [
                    {
                    "isDefault": true,
                    "imageUrl": "ProductImages/6bc8748c-25da-44d7-bde2-557db6ea8c0b_2022-09-07_11-21-08-AM.png"
                    }
                ],
                "categoryTypeId": 20,
                "maxQty": 100,
                "minQty": 1,
                "stepCount": 1,
                "productId": null
                }
            ]
        }

        {
        "status": "Success",
        "message": "",
        "response": [
            {
            "calorie": 150,
            "price": 4,
            "hasDiscount": false,
            "priceAfterDiscount": 4,
            "size": "Regular ",
            "sizeLocalized": {
                "ar": "عادي ",
                "en": "Regular "
            },
            "skuId": 1141979,
            "isDefault": true,
            "skuName": "Pepsi",
            "skuNameLocalized": {
                "ar": "بيبسي",
                "en": "Pepsi"
            },
            "order": 0,
            "images": [
                {
                "isDefault": true,
                "imageUrl": "ProductImages/e91bfc36-1fcc-4416-ad88-0ba1046b057a_1444-03-01_11-36-45-ص.jpeg"
                }
            ],
            "categoryTypeId": 43,
            "maxQty": 100,
            "minQty": 1,
            "stepCount": 1,
            "productId": null
            },
            {
            "calorie": 200,
            "price": 5,
            "hasDiscount": false,
            "priceAfterDiscount": 5,
            "size": "Medium ",
            "sizeLocalized": {
                "ar": "وسط ",
                "en": "Medium "
            },
            "skuId": 1141980,
            "isDefault": false,
            "skuName": "Pepsi",
            "skuNameLocalized": {
                "ar": "بيبسي",
                "en": "Pepsi"
            },
            "order": 0,
            "images": [],
            "categoryTypeId": 43,
            "maxQty": 100,
            "minQty": 1,
            "stepCount": 1,
            "productId": null
            },
            {
            "calorie": 300,
            "price": 7,
            "hasDiscount": false,
            "priceAfterDiscount": 7,
            "size": "Large ",
            "sizeLocalized": {
                "ar": "كبير ",
                "en": "Large "
            },
            "skuId": 1141981,
            "isDefault": false,
            "skuName": "Pepsi",
            "skuNameLocalized": {
                "ar": "بيبسي",
                "en": "Pepsi"
            },
            "order": 0,
            "images": [],
            "categoryTypeId": 43,
            "maxQty": 100,
            "minQty": 1,
            "stepCount": 1,
            "productId": null
            }
        ]
        }
    ```
## Options (1141944)
- Request ( `https://api.shgardi.app/catalog/api/1.1/Store/sku/options?skuId=1141944`)

- Response
```json
    {
    "status": "Success",
    "message": "",
    "response": [
        {
        "id": 336431,
        "name": {
            "ar": "إختر المكرونة",
            "en": "Choose Pasta"
        },
        "minSelection": 1,
        "maxSelection": 1,
        "ordering": 1,
        "items": [
            {
            "id": 2207493,
            "price": 0,
            "calorie": null,
            "isItemDefaultSelected": false,
            "size": {
                "ar": "عادي ",
                "en": "Regular "
            },
            "name": {
                "ar": "فارفالي",
                "en": "Farfalle"
            },
            "skuId": 1134193,
            "imageUrls": [
                "ProductImages/default-product.jpg"
            ],
            "ordering": 0
            },
            {
            "id": 2207494,
            "price": 0,
            "calorie": null,
            "isItemDefaultSelected": false,
            "size": {
                "ar": "عادي ",
                "en": "Regular "
            },
            "name": {
                "ar": "لينجويني",
                "en": "Linguine"
            },
            "skuId": 1134194,
            "imageUrls": [
                "ProductImages/default-product.jpg"
            ],
            "ordering": 0
            }
        ],
        "options": []
        },
        {
        "id": 336432,
        "name": {
            "ar": "إختر الصوص",
            "en": "Choose Sauce"
        },
        "minSelection": 1,
        "maxSelection": 1,
        "ordering": 2,
        "items": [
            {
            "id": 2207498,
            "price": 0,
            "calorie": null,
            "isItemDefaultSelected": false,
            "size": {
                "ar": "عادي ",
                "en": "Regular "
            },
            "name": {
                "ar": "مارينارا",
                "en": "Marinara"
            },
            "skuId": 1134199,
            "imageUrls": [
                "ProductImages/default-product.jpg"
            ],
            "ordering": 0
            },
            {
            "id": 2207499,
            "price": 0,
            "calorie": null,
            "isItemDefaultSelected": false,
            "size": {
                "ar": "عادي ",
                "en": "Regular "
            },
            "name": {
                "ar": "روزيتا",
                "en": "Rosetta"
            },
            "skuId": 1134200,
            "imageUrls": [
                "ProductImages/default-product.jpg"
            ],
            "ordering": 0
            }
        ],
        "options": []
        }
    ]
    }
```


## Components (1140936)
- Request ( `https://api.shgardi.app/catalog/api/1.0/Store/components?productId=1140936`)

- Response
```json
{
  "status": "Success",
  "message": "",
  "response": {
    "additions": [
      {
        "id": 16972,
        "nameLocalized": {
          "ar": "هالبينو",
          "en": "Jalapeno"
        },
        "name": "Jalapeno",
        "price": 3,
        "maxCount": 1,
        "componentId": 16972
      },
      {
        "id": 16973,
        "nameLocalized": {
          "ar": "فلفل حار أخضر",
          "en": "Green Hot Pepper"
        },
        "name": "Green Hot Pepper",
        "price": 3,
        "maxCount": 1,
        "componentId": 16973
      },
      {
        "id": 16974,
        "nameLocalized": {
          "ar": "زعتر أورغان",
          "en": "Oregano Thyme"
        },
        "name": "Oregano Thyme",
        "price": 3,
        "maxCount": 1,
        "componentId": 16974
      },
      {
        "id": 16975,
        "nameLocalized": {
          "ar": "زيت زيتون",
          "en": "Olive Oil"
        },
        "name": "Olive Oil",
        "price": 3,
        "maxCount": 1,
        "componentId": 16975
      },
      {
        "id": 16976,
        "nameLocalized": {
          "ar": "صوص باربكيو المدخن",
          "en": "Smoked Barbecue Sauce"
        },
        "name": "Smoked Barbecue Sauce",
        "price": 3,
        "maxCount": 1,
        "componentId": 16976
      },
      {
        "id": 16977,
        "nameLocalized": {
          "ar": "كاتشب",
          "en": "Ketchup"
        },
        "name": "Ketchup",
        "price": 3,
        "maxCount": 1,
        "componentId": 16977
      },
      {
        "id": 16978,
        "nameLocalized": {
          "ar": "صوص المحل المميز",
          "en": "Lasani Special Sauce"
        },
        "name": "Lasani Special Sauce",
        "price": 3,
        "maxCount": 1,
        "componentId": 16978
      }
    ],
    "canBeRemoved": [],
    "maxComponentCount": 7
  }
}
```




