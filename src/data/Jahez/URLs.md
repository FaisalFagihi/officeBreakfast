
## Search Restaurant (الشلال)
- Request ( `https://jahez-portal-gateway.jahez.net/restaurant-list/searchNearestRestaurants?page=0&pageSize=50&searchText=%D8%A7%D9%84%D8%B4%D9%84%D8%A7%D9%84&lat=21.6246933&lon=39.2035283`)
  
    ```json
    {
  "restaurantList": [
    {
      "restaurantId": 17981,
      "restaurantName": "Alshallal Pastrise - معجنات الشلال ",
      "branchId": 45983,
      "branchName": "Al Samer",
      "lat": 21.589985680564173,
      "lon": 39.25071628845025,
      "rating": null,
      "distance": 6.220342433047131,
      "cuisines": [
        "Fast Food",
        " Bakeries"
      ],
      "workHours": "06:00 AM - 12:00 PM & 12:00 PM - 11:50 PM",
      "nowWorking": true,
      "logo": "https://jahez.net/ShowRestaurantLogo.htm?lang=en&restaurantId=17981&lastUpdate=null",
      "createdDate": "2022-11-07T00:00:00+03:00",
      "menuClass": "JAHEZ",
      "thirdPartyBranchId": null,
      "currency": "SAR",
      "countryCode": "SA",
      "vatEnabled": true,
      "vatExempted": false,
      "deliveryEnabled": true,
      "scheduleEnabled": false,
      "eventEnabled": false,
      "pickupEnabled": false,
      "primeRestaurant": false,
      "topListRestaurant": false,
      "bottomOffers": [],
      "sideOffers": [],
      "shifts": [
        {
          "title": "prv_alpha_utc",
          "startTime": "2023-02-27T03:00:00Z",
          "endTime": "2023-02-27T09:00:00Z"
        },
        {
          "title": "prv_beta_utc",
          "startTime": "2023-02-27T09:00:00Z",
          "endTime": "2023-02-27T20:50:00Z"
        },
        {
          "title": "alpha_utc",
          "startTime": "2023-02-28T03:00:00Z",
          "endTime": "2023-02-28T09:00:00Z"
        },
        {
          "title": "beta_utc",
          "startTime": "2023-02-28T09:00:00Z",
          "endTime": "2023-02-28T20:50:00Z"
        },
        {
          "title": "nxt_alpha_utc",
          "startTime": "2023-03-01T03:00:00Z",
          "endTime": "2023-03-01T09:00:00Z"
        },
        {
          "title": "nxt_beta_utc",
          "startTime": "2023-02-27T09:00:00Z",
          "endTime": "2023-02-27T20:50:00Z"
        }
      ]
    }
  ],
  "page": 0,
  "numberOfPages": 1,
  "totalNumberOfRestaurants": 1
}
    ```
- Response
    ```json
    {
        "message": "Verification Code Sent To Your Mobile.",
        "new_user": false
    }
    ```
