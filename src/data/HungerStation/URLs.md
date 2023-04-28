
## Register 
- Request ( `https://hungerstation.com/api/v2/verification/register` )
    ```json
    {
        "mobile": "+966552349209",
        "country": "1",
        "device_type": 1,
        "device_uid": "4f7d1808-40ae-47f5-b3d1-2713b28fd83eed8df8007c5ffcf7",
        "fcm_token": "cM_fhJqsSGa48TKUU6mbEw:APA91bH2wAAiVW8klGKPRMpxoJSBsvJQY9dsR1PFv7LbTPOxY96vk4GTSXz7JCAyBzGKsRUS6QXLkoApp9DOhSQ57hrgJzkpJBrJnAJNF6KKc2foBuoz3nXB5ghI_-79svDWURr5NHVG",
        "language": "en"
    }
    ```
- Response
    ```json
    {
        "message": "Verification Code Sent To Your Mobile.",
        "new_user": false
    }
    ```

## Verify
- Request ( `https://hungerstation.com/api/v2/verification/verify` )
    ```json
    {
        "verification_code": "872308",
        "jwt_enabled": true,
        "device_uid": "4f7d1808-40ae-47f5-b3d1-2713b28fd83eed8df8007c5ffcf7",
        "client_id": "b88a2d69039bde0712271f619f97f0ea1eca075a5343c1631a3a3d6942079543",
        "client_secret": "cddb11927666752d20fa7de527464ea8406244df57a31f64c2dbbff08b8c57f7",
        "device_type": 1
    }
    ```
- Response
    ```json
    {
        "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Imhza2V5IiwidHlwIjoiSldUIn0.eyJhdWQiOlsiSFNfU0VSVklDRSJdLCJkZXZpY2VfaWQiOiI1ODIyNTgzNyIsImV4cCI6MTY2MzkyMDY5NywiaWF0IjoxNjYzNzA0Njk3LCJpc3MiOiJBVVRIX1NFUlZJQ0UiLCJqdGkiOiJLUnN4bUg5Q081MFpGQVNtNFJZeUZhRUNoMUgzU3ZrVyIsIm5iZiI6MTY2MzcwNDY5Nywic3ViIjoiSFNfQVVUSF9TRVJWSUNFIiwidXNlcl9pZCI6Ijg1MzY0NTIifQ.oJxu7lA9mbMSmlFG3ludkC-oYvUMLneJIbEsX_HFkodgKGSQ6zqtBJUa7Xq9Gv_r4DSHGfcBB5LpidTq4ctdJt7oDGsT8EFAFObDOV68pPMMeSRRylx0hsf-JLAfe0QGJxuSKi5-IUEdbApS4MXVdUdEfQcvub5iH9mugYvZ-OG-K35FcoYqNvpmZDMli_jCAmwzh6PWAjy7-Lw24HlqQVNcGPCSKXpiUH1pMkPueBipF5LZOFRBvoOv8YFco6L305TzOpmMABuv1KB8S6eZrMXiHycGDjr7Y6GO-PAtv82-NcU9thw-btqzS4P69t_NHRQA3GzV50hd7WWtfMH7_w",
        "refresh_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Imhza2V5IiwidHlwIjoiSldUIn0.eyJhdWQiOlsiSFNfU0VSVklDRSJdLCJkZXZpY2VfaWQiOiI1ODIyNTgzNyIsImV4cCI6MTY3MTU4ODY5NywiaWF0IjoxNjYzNzA0Njk3LCJpc3MiOiJBVVRIX1NFUlZJQ0UiLCJqdGkiOiJpbHJhWktseXh3bnJmdE5URzVZeWUxWUR2ZjZscm1hciIsIm5iZiI6MTY2MzcwNDY5NywicmVmcmVzaF90b2tlbiI6ImU3cGo2T1doSmt4dksxcTRlUXFPWWV2dFlBYlYwTFhBIiwic3ViIjoiSFNfQVVUSF9TRVJWSUNFIiwidXNlcl9pZCI6Ijg1MzY0NTIifQ.rz0fa-uS0KqHWu-LeUrLmbMVIpLRT0Ak2j2EKSUU8AGeypmip0wcz2zqNrfcyIkIBL7iOAINhG-BYihMWlES3IwMog_DL2c8ha0VeqJBiz3rd9_K8Nxz62G-vUV6SgMdBi9LTzanvKh-KdBe7jpwR5hUB-9c4wEriMnwF9TIRH9u_aU0Nz-LqHaRjGP1vEByN9YDUiQdU7umPUn0U8pIrOQHoCc-4SX2j1DPKI2Jim_eVejGu0W_zyUFMV-mGogbio2CvyRjmoQYhvRP7fd-_hqqYZPs0TbeD4aYUfaw-tIONbH5UutDX7GOQionFgqzbiVHrUz_njVJ0ZPEIrCIUg",
        "token_type": "Bearer",
        "expires_in": 216000,
        "new_user": false
    }
    ```

## Me
- Request ( `https://hungerstation.com/api/v2/users/me` )
- Response
    ```json
    {
        "id": 8536452,
        "mobile": "+966552349209",
        "email": "",
        "user_type": "normal",
        "zendesk_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci04NTM2NDUyIn0.JvPoEEZu4DG6D_-xaPiyxSCtKBdeYu2uB5dlLUnNIz8",
        "country_id": 1,
        "gender": null,
        "date_of_birth": null,
        "orders_count": 13,
        "name": "",
        "need_survey": true,
        "referral_code": "",
        "referral_program": {
            "already_referred": true
        }
    }
    ```

## Specific Address
- Request (`https://hungerstation.com/api/v2/specific_addresses`)
  ```json
    {
        "id": "0",
        "local_id": "179",
        "local": {
            "id": "179",
            "city_id": "2",
            "name": "Al Marwah",
            "name_en": "Al Marwah"
        },
        "addresstype_id": "1",
        "latitude": 21.62050010921863,
        "longitude": 39.19249176979065,
        "description": "",
        "specific_type": "old_style",
        "specific_type_name": "Old Style",
        "accuracy": 0.0,
        "dynamic_field": {}
    }
  ```
- Response
  ```json
    {
        "id": 329912415,
        "user_id": 8536452,
        "local_id": 179,
        "name": null,
        "addresstype_id": 1,
        "latitude": 21.62050010921863,
        "longitude": 39.19249176979065,
        "dynamic_field": {},
        "description": null,
        "disabled": false,
        "specific_type": "old_style",
        "specific_type_name": "Old Style",
        "specific_type_name_en": "Old style",
        "local": {
            "id": 179,
            "city_id": 2,
            "country_id": 1,
            "name": "Al Marwah",
            "name_en": "Al Marwah"
        }
    }
  ```

## Specific Address draft
- Request (`https://hungerstation.com/api/v2/specific_addresses/draft`)
  ```json
    {
        "local_id": 179,
        "addresstype_id": 1,
        "latitude": 21.62050010921863,
        "longitude": 39.19249176979065,
        "description": "",
        "specific_type": "old_style",
        "accuracy": 0.0
    }
  ```
- Response
  ```json
    {
        "local_id": 179,
        "name": null,
        "addresstype_id": 1,
        "latitude": 21.62050010921863,
        "longitude": 39.19249176979065,
        "dynamic_field": {},
        "description": null,
        "disabled": false,
        "specific_type": "old_style",
        "specific_type_name": "Old Style",
        "local": {
            "id": 179,
            "city_id": 2,
            "name": "Al Marwah",
            "name_en": "Al Marwah"
        }
    }
 ```

## Specific Address Type
- Request (`https://hungerstation.com/api/v2/specific_addresses?specific_type=2`)
- Response
  ```json
    [{
        "id": 67216797,
        "user_id": 8536452,
        "local_id": 218,
        "name": null,
        "addresstype_id": 2,
        "latitude": 21.60220444356721,
        "longitude": 39.24530010670424,
        "dynamic_field": {},
        "description": "شركة النظم الاستراتيجية",
        "disabled": false,
        "specific_type": "work",
        "specific_type_name": "Work",
        "specific_type_name_en": "Work",
        "local": {
            "id": 218,
            "city_id": 2,
            "country_id": 1,
            "name": "Al Manar",
            "name_en": "Al Manar"
        }
    }, {
        "id": 67904997,
        "user_id": 8536452,
        "local_id": 179,
        "name": null,
        "addresstype_id": 2,
        "latitude": 21.63105378040117,
        "longitude": 39.20610163360834,
        "dynamic_field": {},
        "description": null,
        "disabled": false,
        "specific_type": "home",
        "specific_type_name": "Home",
        "specific_type_name_en": "Home",
        "local": {
            "id": 179,
            "city_id": 2,
            "country_id": 1,
            "name": "Al Marwah",
            "name_en": "Al Marwah"
        }
    }]
  ```

## Payment method
- Request (`/api/v2/payment_methods?branch_id=5915&delivery_option=2`)
- Response
    ```json
    {
        "methods": [
            {
                "type": "credit_card",
                "title": "Credit Card",
                "available": true,
                "settings": {
                    "add_credit_card": {
                        "enabled": true
                    }
                },
                "enabled": true,
                "message": null,
                "credit_cards": [
                    {
                        "id": 3631211,
                        "name": "فيصل فقيهي",
                        "payment_method": "credit_card",
                        "title": "Visa",
                        "payment_type": "credit_card",
                        "type": "visa",
                        "number": "405433******6187",
                        "icon_url": "https://platform.hsobjects.com/assets/v2/payment/schemes/visa-f1d7e9acad62303ddac92fa8673ff810be03b8ecb06c3cff624fe7fdfd7e2e19.png",
                        "cvv_length": 3,
                        "status": "verified_on_gateway",
                        "gateway_type": "checkout",
                        "verifiable": false,
                        "hints": [],
                        "enabled": true,
                        "message": null
                    }
                ]
            },
            {
                "type": "cash",
                "title": "Cash on Delivery",
                "available": true,
                "settings": {},
                "enabled": true,
                "message": null
            },
            {
                "type": "wallet",
                "title": "Wallet",
                "available": false,
                "settings": {
                    "redeem_voucher": {
                        "enabled": false
                    }
                },
                "enabled": true,
                "message": null,
                "wallets": [
                    {
                        "id": 8563556,
                        "name": " Wallet",
                        "balance": "0",
                        "currency": {
                            "code": "SAR",
                            "name": "Saudi Riyal",
                            "symbol": "SR",
                            "symbol_en": "SR"
                        },
                        "toggled": false,
                        "enabled": false,
                        "message": null
                    }
                ]
            }
        ]
    }
    ```

## Order Applicable
- Request (`https://hungerstation.com/api/v2/order_applicable_coupons?page=1`)
  ```json
    {
        "address_id": 328785453,
        "branch_id": 5915,
        "cart_id": "3e54acc0-c263-43be-8e17-77b3342beaf1",
        "contactLessDeliverySelected": false,
        "delivery_option": 2,
        "local_id": 179,
        "orderitems": [
            {
                "count": 2,
                "menuitem": {
                    "menugroup_id": 425973,
                    "name": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal",
                    "name_en": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal"
                },
                "menuitem_id": 2471481,
                "note": "",
                "total_cost": 42.0
            },
            {
                "count": 1,
                "menuitem": {
                    "menugroup_id": 425973,
                    "name": "Chicken Fillet Sandwich - Chicken Fillet Sandwich",
                    "name_en": "Chicken Fillet Sandwich - Chicken Fillet Sandwich"
                },
                "menuitem_id": 2471551,
                "note": "",
                "options": [
                    "Without Garlic Sauce",
                    "Less Garlic Sauce",
                    "Without Fries"
                ],
                "orderitem_link_modifiers": [
                    2618606,
                    2618621,
                    2618635
                ],
                "total_cost": 9.0
            }
        ],
        "payment_method": {
            "credit_card": {
                "enabled": false,
                "gateway_type": "checkout",
                "id": 3631211,
                "name": "فيصل فقيهي",
                "number": "405433******6187",
                "payment_type": "credit_card",
                "status": "verified_on_gateway",
                "type": "visa"
            },
            "cvv_length": 3,
            "icon_url": "https://platform.hsobjects.com/assets/v2/payment/schemes/visa-f1d7e9acad62303ddac92fa8673ff810be03b8ecb06c3cff624fe7fdfd7e2e19.png",
            "title": "•••• 6187",
            "type": "credit_card",
            "wallet": {
                "balance": "0.0",
                "currency": {
                    "code": "SAR",
                    "name": "Saudi Riyal",
                    "symbol": "SR",
                    "symbol_en": "SR"
                },
                "enabled": false,
                "id": 8563556,
                "messages": [],
                "name": " Wallet",
                "toggled": false
            }
        }
    }
  ```

- Response
  ```json
  {
	"coupons": [],
	"pagination": {
		"total_count": 0,
		"current_page": 1,
		"per_page": 20,
		"total_pages": 0
	}
  }
  ```

## Order Draft
- Request (`https://hungerstation.com/api/v2/orders/draft`)
    ```json
    {
        "address_id": 328785453,
        "branch_id": 5915,
        "cart_id": "3e54acc0-c263-43be-8e17-77b3342beaf1",
        "contactLessDeliverySelected": false,
        "delivery_option": 2,
        "local_id": 179,
        "orderitems": [
            {
                "count": 2,
                "menuitem": {
                    "menugroup_id": 425973,
                    "name": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal",
                    "name_en": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal"
                },
                "menuitem_id": 2471481,
                "note": "",
                "total_cost": 42.0
            },
            {
                "count": 1,
                "menuitem": {
                    "menugroup_id": 425973,
                    "name": "Chicken Fillet Sandwich - Chicken Fillet Sandwich",
                    "name_en": "Chicken Fillet Sandwich - Chicken Fillet Sandwich"
                },
                "menuitem_id": 2471551,
                "note": "",
                "options": [
                    "Without Garlic Sauce",
                    "Less Garlic Sauce",
                    "Without Fries"
                ],
                "orderitem_link_modifiers": [
                    2618606,
                    2618621,
                    2618635
                ],
                "total_cost": 9.0
            }
        ]
    }
    ```
- Response
  ```json
    {
        "expiration_time": 1663712267,
        "fee": 16.0,
        "disclaimer_messages": [
            "Prices are 15% VAT inclusive (except rider tip)"
        ],
        "cutback_minimum": null,
        "preferred_payment_method": {
            "type": "credit_card",
            "credit_card_id": null
        },
        "payment_method": {
            "type": "credit_card",
            "credit_card": {
                "id": 3631211,
                "name": "فيصل فقيهي",
                "payment_method": "credit_card",
                "title": "Visa",
                "payment_type": "credit_card",
                "type": "visa",
                "number": "405433******6187",
                "status": "verified_on_gateway",
                "gateway_type": "checkout",
                "verifiable": false,
                "hints": []
            },
            "icon_url": "https://platform.hsobjects.com/assets/v2/payment/schemes/visa-f1d7e9acad62303ddac92fa8673ff810be03b8ecb06c3cff624fe7fdfd7e2e19.png",
            "cvv_length": 3,
            "title": "•••• 6187"
        },
        "discount": 4.0,
        "delivery_estimation_time_range": "35 - 45",
        "delivery_estimation_time_formatted": {
            "value": "35 - 45",
            "unit": "minutes"
        },
        "referral_eligible": false,
        "total_without_fee_without_discount": 51.0,
        "promotion": null,
        "address": {
            "id": 328785453,
            "name": "Al Marwah",
            "name_en": "Al Marwah",
            "local_id": 179,
            "addresstype_id": 1,
            "latitude": 21.62050010921863,
            "longitude": 39.19249176979065,
            "dynamic_field": {},
            "description": "",
            "disabled": false,
            "specific_type": "old_style",
            "specific_type_name": "Old Style",
            "local": {
                "id": 179,
                "city_id": 2,
                "name": "Al Marwah",
                "name_en": "Al Marwah"
            },
            "empty_description_message": "no description provided"
        },
        "terms_and_conditions": [
            {
                "content": "Prices are 15% VAT inclusive (except rider tip)",
                "bindings": []
            },
            {
                "content": "By ordering, you agree to our ((tos))",
                "bindings": [
                    {
                        "key": "((tos))",
                        "content": "Terms \u0026 Conditions",
                        "url": "https://hungerstation.com/sa-en/terms-of-use"
                    }
                ]
            }
        ],
        "wallet": {
            "id": 8563556,
            "name": " Wallet",
            "balance": "0.0",
            "currency": {
                "code": "SAR",
                "name": "Saudi Riyal",
                "symbol": "SR",
                "symbol_en": "SR"
            },
            "toggled": false,
            "enabled": false,
            "messages": []
        },
        "disable_order_note": false,
        "branch": {
            "id": 5915,
            "pickup": false,
            "restaurant_id": 19824,
            "local_id": 179,
            "enabled": true,
            "accept_credit_card": true,
            "accept_cash_on_delivery": true,
            "accept_voucher": true,
            "deliver_using_map": false,
            "latitude": 21.618406,
            "longitude": 39.180794,
            "accept_sadad": false,
            "public_notes": [],
            "restaurant_delivery": false,
            "thirdparty_delivery": false,
            "has_promotion": true,
            "fast_delivery": true,
            "restaurant": {
                "id": 19824,
                "featured": false,
                "enabled": true,
                "weight": 3295,
                "name": "Al Baik",
                "store_type": "RESTAURANT",
                "vertical": "restaurants",
                "name_en": "Al Baik",
                "logo": "https://hsaa.hsobjects.com/h/restaurants/logos/000/019/824/e2792c2827639ba97a708e7a6ae5a2a8-thumb.png",
                "rate_average": 4.45,
                "rate_count": 19812,
                "share_url": "https://hungerstation.com/en/restaurants/al-baik-5",
                "country_id": 1,
                "kitchens": [
                    {
                        "id": 37,
                        "name": "Fast Food",
                        "name_en": "Fast Food",
                        "image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/037/f0caac83f848ac372d16755accd1ae31-thumb.png",
                        "image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/037/f0caac83f848ac372d16755accd1ae31-original.png"
                    },
                    {
                        "id": 36,
                        "name": "Sandwiches ",
                        "name_en": "Sandwiches ",
                        "image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/036/8a46d1f06ca1bd8265b8943877ec4e18-thumb.png",
                        "image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/036/8a46d1f06ca1bd8265b8943877ec4e18-original.png"
                    },
                    {
                        "id": 42,
                        "name": "Arabic",
                        "name_en": "Arabic",
                        "image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/042/62ce6ebaac6b6ff34c15987613398c92-thumb.png",
                        "image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/042/62ce6ebaac6b6ff34c15987613398c92-original.png"
                    }
                ]
            },
            "local": {
                "id": 179,
                "city_id": 2,
                "name": "Al Marwah",
                "name_en": "Al Marwah"
            },
            "food_characteristics": []
        },
        "currency": "SR",
        "currency_en": "SR",
        "payment_detail_items": [
            {
                "key": "order_total",
                "label": "Order Total",
                "label_en": "Order Total",
                "label_style": "plain",
                "value_style": "plain",
                "amount": 51.0,
                "discounted_amount": 51.0,
                "messages": []
            },
            {
                "key": "delivery_fees",
                "label": "Delivery Fees",
                "label_en": "Delivery Fees",
                "label_style": "plain",
                "value_style": "plain",
                "amount": 16.0,
                "discounted_amount": 12.0,
                "messages": [
                    {
                        "detail": {
                            "content": "((amount))",
                            "bindings": [
                                {
                                    "key": "((amount))",
                                    "content": "16.0",
                                    "style": "strikethrough"
                                }
                            ]
                        },
                        "type": "DISCOUNT"
                    },
                    {
                        "detail": {
                            "content": "((content))",
                            "bindings": [
                                {
                                    "key": "((content))",
                                    "content": "12 SR Delivery fees For Orders Above 25 SR",
                                    "style": "semiBold"
                                }
                            ]
                        },
                        "type": "TOOLTIP"
                    }
                ]
            },
            {
                "key": "discount",
                "label": "Discount",
                "label_en": "Discount",
                "label_style": "plain",
                "value_style": "reduction",
                "amount": -4.0,
                "discounted_amount": -4.0,
                "messages": []
            },
            {
                "key": "total",
                "label": "Total",
                "label_en": "Total",
                "label_style": "bold",
                "value_style": "bold",
                "amount": 63.0,
                "discounted_amount": 63.0,
                "messages": [
                    {
                        "detail": {
                            "content": "You saved ((amount)) ((currency))!",
                            "bindings": [
                                {
                                    "key": "((amount))",
                                    "content": "4.0",
                                    "style": "bold"
                                },
                                {
                                    "key": "((currency))",
                                    "content": "SR",
                                    "style": "plain"
                                }
                            ]
                        },
                        "type": "DISCOUNT"
                    }
                ]
            }
        ],
        "precision": 2,
        "delivery_option": 2,
        "hs_subscription": {
            "order_status": false,
            "message": null
        }
    }
  ```

## Order Place
  - Request (`https://hungerstation.com/api/v2/orders`)
    ```json
        {
        "address_id": 328785453,
        "branch_id": 5915,
        "cart_id": "3e54acc0-c263-43be-8e17-77b3342beaf1",
        "contactLessDeliverySelected": false,
        "delivery_option": 2,
        "local_id": 179,
        "state_info_variation": "order_placed_successfully",
        "orderitems": [
            {
                "count": 2,
                "menuitem": {
                    "menugroup_id": 425973,
                    "name": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal",
                    "name_en": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal"
                },
                "menuitem_id": 2471481,
                "note": "",
                "total_cost": 42.0
            },
            {
                "count": 1,
                "menuitem": {
                    "menugroup_id": 425973,
                    "name": "Chicken Fillet Sandwich - Chicken Fillet Sandwich",
                    "name_en": "Chicken Fillet Sandwich - Chicken Fillet Sandwich"
                },
                "menuitem_id": 2471551,
                "note": "",
                "options": [
                    "Without Garlic Sauce",
                    "Less Garlic Sauce",
                    "Without Fries"
                ],
                "orderitem_link_modifiers": [
                    2618606,
                    2618621,
                    2618635
                ],
                "total_cost": 9.0
            }
        ],
        "payment_method": {
            "credit_card": {
                "enabled": false,
                "gateway_type": "checkout",
                "id": 3631211,
                "name": "فيصل فقيهي",
                "number": "405433******6187",
                "payment_type": "credit_card",
                "status": "verified_on_gateway",
                "type": "visa"
            },
            "cvv_length": 3,
            "icon_url": "https://platform.hsobjects.com/assets/v2/payment/schemes/visa-f1d7e9acad62303ddac92fa8673ff810be03b8ecb06c3cff624fe7fdfd7e2e19.png",
            "title": "•••• 6187",
            "type": "credit_card"
        }
    }
    ```

- Response
  ```json
    {
        "reviewable": false,
        "ratable": false,
        "actions_info": {
            "track": {
                "title": "track",
                "enabled": false
            },
            "chat": {
                "title": "chat",
                "enabled": false
            }
        },
        "ask_order_delivered": false,
        "driver": null,
        "payment_info": {
            "payment_method": "credit_card",
            "can_change_payment": false,
            "payment_type": "credit",
            "redirection": true,
            "redirection_details_url": "https://hungerstation.com/api/v2/orders/269125532/online_payment",
            "required_cvv": false,
            "credit_card_payment": {
                "credit_card_type": "visa",
                "credit_card_number": "405433******6187",
                "payment_status": "being_authorized",
                "amount": "63.0",
                "payment_type": "credit"
            }
        },
        "payment_method": {
            "credit_card": {
                "enabled": false,
                "gateway_type": "checkout",
                "id": 3631211,
                "name": "فيصل فقيهي",
                "number": "405433******6187",
                "payment_type": "credit_card",
                "status": "verified_on_gateway",
                "type": "visa"
            },
            "cvv_length": 3,
            "icon_url": "https://platform.hsobjects.com/assets/v2/payment/schemes/visa-f1d7e9acad62303ddac92fa8673ff810be03b8ecb06c3cff624fe7fdfd7e2e19.png",
            "title": "•••• 6187",
            "type": "credit_card",
            "redirection_details_url": "https://hungerstation.com/api/v2/orders/269125532/online_payment",
            "can_change_payment": false,
            "credit_card_payment": {
                "credit_card_type": "visa",
                "credit_card_number": "405433******6187",
                "payment_status": "being_authorized",
                "amount": "63.0",
                "payment_type": "credit"
            },
            "cvv_post_url": null,
            "failure_message": null
        },
        "reorder_active": null,
        "chat": {
            "enabled": true,
            "app_id": "4A42EECD-FC93-483A-BFA2-CDEB45F45A75",
            "call_enabled": true,
            "user_token": "01eb2dc32e19277150471329f6b7985a136efb54",
            "user_id": "966552349209",
            "order_id": 269125532,
            "channel_url": null,
            "chattable": false,
            "available": true,
            "message": "HungerStation's driver is at your service!",
            "title": null,
            "subtitle": "Al Baik #269125532"
        },
        "dh_chat": null,
        "id": 269125532,
        "user_id": 8536452,
        "address_id": 328785453,
        "branch_id": 5915,
        "local_id": 179,
        "note": "",
        "pickup": false,
        "deliverydelay": null,
        "orderstatus_id": 40,
        "fee": 16.0,
        "discount": 4.0,
        "due_at": 0,
        "created_at": 1663709086,
        "action_at": 0,
        "totalWithoutFee": 47.0,
        "total_without_fee_without_discount": 51.0,
        "status_message": "First time ordering? You are awesome! We will call you shortly to confirm the order!",
        "failure_cause_title": "Not Delivered",
        "failure_cause_description": null,
        "delivery_provider": "hungerstation_delivery",
        "referral_code": "",
        "state": "processing",
        "state_info": {
            "status": "processing",
            "refresh_rate": 180000,
            "active_status": true,
            "current_state_key": "finding_driver",
            "trackable": true,
            "state_list": [
                {
                    "index": 0,
                    "key": "finding_driver",
                    "title": "Order placed successfully!",
                    "description": "Updates will be shared shortly"
                },
                {
                    "index": 1,
                    "key": "in_the_kitchen",
                    "title": "Order Preparation",
                    "description": ""
                },
                {
                    "index": 2,
                    "key": "en_route",
                    "title": "Order Delivery",
                    "description": ""
                }
            ],
            "show_tracking_url": false
        },
        "real_time_tracking": null,
        "active_tracking_button": false,
        "payment_status": "Credit Card (being authorized) ",
        "branch": {
            "id": 5915,
            "pickup": false,
            "restaurant_id": 19824,
            "local_id": 179,
            "enabled": true,
            "accept_credit_card": true,
            "accept_cash_on_delivery": true,
            "accept_voucher": true,
            "deliver_using_map": false,
            "latitude": 21.618406,
            "longitude": 39.180794,
            "accept_sadad": false,
            "public_notes": [],
            "restaurant_delivery": false,
            "thirdparty_delivery": false,
            "has_promotion": true,
            "fast_delivery": true,
            "restaurant": {
                "id": 19824,
                "featured": false,
                "enabled": true,
                "weight": 3295,
                "name": "Al Baik",
                "store_type": "RESTAURANT",
                "vertical": "restaurants",
                "name_en": "Al Baik",
                "logo": "https://hsaa.hsobjects.com/h/restaurants/logos/000/019/824/e2792c2827639ba97a708e7a6ae5a2a8-thumb.png",
                "rate_average": 4.45,
                "rate_count": 19812,
                "share_url": "https://hungerstation.com/en/restaurants/al-baik-5",
                "country_id": 1,
                "kitchens": [
                    {
                        "id": 37,
                        "name": "Fast Food",
                        "name_en": "Fast Food",
                        "image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/037/f0caac83f848ac372d16755accd1ae31-thumb.png",
                        "image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/037/f0caac83f848ac372d16755accd1ae31-original.png"
                    },
                    {
                        "id": 36,
                        "name": "Sandwiches ",
                        "name_en": "Sandwiches ",
                        "image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/036/8a46d1f06ca1bd8265b8943877ec4e18-thumb.png",
                        "image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/036/8a46d1f06ca1bd8265b8943877ec4e18-original.png"
                    },
                    {
                        "id": 42,
                        "name": "Arabic",
                        "name_en": "Arabic",
                        "image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/042/62ce6ebaac6b6ff34c15987613398c92-thumb.png",
                        "image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/042/62ce6ebaac6b6ff34c15987613398c92-original.png"
                    }
                ]
            },
            "local": {
                "id": 179,
                "city_id": 2,
                "name": "Al Marwah",
                "name_en": "Al Marwah"
            },
            "food_characteristics": [],
            "deliveries": []
        },
        "address": {
            "id": 328785453,
            "name": "Al Marwah",
            "name_en": "Al Marwah",
            "local_id": 179,
            "addresstype_id": 1,
            "latitude": 21.62050010921863,
            "longitude": 39.19249176979065,
            "dynamic_field": {},
            "description": "",
            "disabled": false,
            "specific_type": "old_style",
            "specific_type_name": "Old Style",
            "local": {
                "id": 179,
                "city_id": 2,
                "name": "Al Marwah",
                "name_en": "Al Marwah"
            }
        },
        "local": {
            "id": 179,
            "city_id": 2,
            "name": "Al Marwah",
            "name_en": "Al Marwah"
        },
        "orderitems": [
            {
                "id": 970769297,
                "order_id": 269125532,
                "menuitem_id": 2471551,
                "count": 1,
                "note": "",
                "total_cost": 9.0,
                "orderitemlinkcheckoptions": [],
                "orderitemlinkradiooptionitems": [],
                "orderitem_link_modifiers": [
                    {
                        "id": 767831951,
                        "modifier_id": 2618606,
                        "orderitem_id": 970769297
                    },
                    {
                        "id": 767831950,
                        "modifier_id": 2618621,
                        "orderitem_id": 970769297
                    },
                    {
                        "id": 767831949,
                        "modifier_id": 2618635,
                        "orderitem_id": 970769297
                    }
                ],
                "menuitem": {
                    "id": 2471551,
                    "enabled": true,
                    "price": 9.0,
                    "name": "Chicken Fillet Sandwich - Chicken Fillet Sandwich",
                    "name_en": "Chicken Fillet Sandwich - Chicken Fillet Sandwich",
                    "checkoptiongroups": [],
                    "radiooptions": [],
                    "modifier_groups": [
                        {
                            "id": 384025,
                            "min_option": 0,
                            "max_option": 4,
                            "weight": 0,
                            "menuitem_ids": [
                                2471551
                            ],
                            "name": "Pickles",
                            "name_en": "Pickles",
                            "modifier_ids": [
                                2618648,
                                2618635,
                                2618621,
                                2618606
                            ],
                            "modifiers": [
                                {
                                    "id": 2618648,
                                    "modifier_group_id": 384025,
                                    "price": "0.0",
                                    "calories": 0,
                                    "weight": 3,
                                    "name": "Without Pickles"
                                },
                                {
                                    "id": 2618635,
                                    "modifier_group_id": 384025,
                                    "price": "0.0",
                                    "calories": 0,
                                    "weight": 2,
                                    "name": "Without Fries"
                                },
                                {
                                    "id": 2618621,
                                    "modifier_group_id": 384025,
                                    "price": "0.0",
                                    "calories": 0,
                                    "weight": 1,
                                    "name": "Less Garlic Sauce"
                                },
                                {
                                    "id": 2618606,
                                    "modifier_group_id": 384025,
                                    "price": "0.0",
                                    "calories": 0,
                                    "weight": 0,
                                    "name": "Without Garlic Sauce"
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": 970769296,
                "order_id": 269125532,
                "menuitem_id": 2471481,
                "count": 2,
                "note": "",
                "total_cost": 42.0,
                "orderitemlinkcheckoptions": [],
                "orderitemlinkradiooptionitems": [],
                "orderitem_link_modifiers": [],
                "menuitem": {
                    "id": 2471481,
                    "enabled": true,
                    "price": 21.0,
                    "name": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal",
                    "name_en": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal",
                    "checkoptiongroups": [],
                    "radiooptions": [],
                    "modifier_groups": []
                }
            }
        ],
        "order_code": "269125532",
        "pickup_name": null,
        "order_anything_type": null,
        "disclaimer_messages": [
            "Prices are 15% VAT inclusive (except rider tip)"
        ],
        "vat_invoices": [],
        "special_sale": null,
        "promotion": null,
        "delivery_estimation_time": null,
        "payment_processing_status": {
            "type": "online",
            "status": "processing",
            "title": "Processing your payment",
            "description": "Processing payment may take couple of seconds",
            "gateway_message": "Oops! it seems there's an issue with your card! Please contact your bank for more info."
        },
        "payment_section": null,
        "cancellable": true,
        "delivery_option": 2,
        "confirmable": false,
        "estimated_delivery": null
    }
  ```

## Online Payment
- Request (`https://hungerstation.com/api/v2/orders/269125532/online_payment`)
- Response
  ```json
  {
	"order_id": 269125532,
	"user_payment_id": 196306560,
	"status": "being_verified_3d",
	"redirection": true,
	"redirect_url": "https://api2.checkout.com/v2/3ds/acs/sid_gbozxsdawnne5hoocq4wgqmasy"
  }
  ```

## Payment Status
- Request (`https://hungerstation.com/api/v2/orders/269125532/payment_processing_status`)
- Response 
    ```json
    {
        "type": "online",
        "status": "failed",
        "title": "Payment failed",
        "description": "Unfortunately, we couldn't process your payment",
        "gateway_message": "Oops! We can't proceed due to authentication problem! Please contact your bank for more info."
    }
    ```

## Cancel Order
- Request (`https://hungerstation.com/api/v2/orders/269125532/cancel`)
- Response
  ```json
  {
	"reviewable": false,
	"ratable": false,
	"actions_info": {
		"track": {
			"title": "track",
			"enabled": false
		},
		"chat": {
			"title": "chat",
			"enabled": false
		}
	},
	"ask_order_delivered": false,
	"driver": null,
	"payment_info": null,
	"payment_method": "credit_card",
	"reorder_active": null,
	"chat": {
		"enabled": true,
		"app_id": "4A42EECD-FC93-483A-BFA2-CDEB45F45A75",
		"call_enabled": true,
		"user_token": "01eb2dc32e19277150471329f6b7985a136efb54",
		"user_id": "966552349209",
		"order_id": 269125532,
		"channel_url": null,
		"chattable": false,
		"available": true,
		"message": "HungerStation's driver is at your service!",
		"title": null,
		"subtitle": "Al Baik #269125532"
	},
	"dh_chat": null,
	"id": 269125532,
	"user_id": 8536452,
	"address_id": 328785453,
	"branch_id": 5915,
	"local_id": 179,
	"note": "",
	"pickup": false,
	"deliverydelay": 37,
	"orderstatus_id": 50,
	"fee": 16.0,
	"discount": 4.0,
	"due_at": 0,
	"created_at": 1663709086,
	"action_at": 0,
	"totalWithoutFee": 47.0,
	"total_without_fee_without_discount": 51.0,
	"status_message": "Canceled",
	"failure_cause_title": "Not Delivered",
	"failure_cause_description": "Canceled early by customer",
	"delivery_provider": "hungerstation_delivery",
	"referral_code": "",
	"state": "failed",
	"state_info": {
		"status": "failed",
		"refresh_rate": 180000,
		"active_status": false,
		"current_state_key": null,
		"trackable": null,
		"state_list": null,
		"show_tracking_url": false
	},
	"real_time_tracking": null,
	"active_tracking_button": false,
	"payment_status": "Credit Card (Failed) ",
	"branch": {
		"id": 5915,
		"pickup": false,
		"restaurant_id": 19824,
		"local_id": 179,
		"enabled": true,
		"accept_credit_card": true,
		"accept_cash_on_delivery": true,
		"accept_voucher": true,
		"deliver_using_map": false,
		"latitude": 21.618406,
		"longitude": 39.180794,
		"accept_sadad": false,
		"public_notes": [],
		"restaurant_delivery": false,
		"thirdparty_delivery": false,
		"has_promotion": true,
		"fast_delivery": true,
		"restaurant": {
			"id": 19824,
			"featured": false,
			"enabled": true,
			"weight": 3295,
			"name": "Al Baik",
			"store_type": "RESTAURANT",
			"vertical": "restaurants",
			"name_en": "Al Baik",
			"logo": "https://hsaa.hsobjects.com/h/restaurants/logos/000/019/824/e2792c2827639ba97a708e7a6ae5a2a8-thumb.png",
			"rate_average": 4.45,
			"rate_count": 19812,
			"share_url": "https://hungerstation.com/en/restaurants/al-baik-5",
			"country_id": 1,
			"kitchens": [
				{
					"id": 37,
					"name": "Fast Food",
					"name_en": "Fast Food",
					"image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/037/f0caac83f848ac372d16755accd1ae31-thumb.png",
					"image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/037/f0caac83f848ac372d16755accd1ae31-original.png"
				},
				{
					"id": 36,
					"name": "Sandwiches ",
					"name_en": "Sandwiches ",
					"image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/036/8a46d1f06ca1bd8265b8943877ec4e18-thumb.png",
					"image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/036/8a46d1f06ca1bd8265b8943877ec4e18-original.png"
				},
				{
					"id": 42,
					"name": "Arabic",
					"name_en": "Arabic",
					"image_thumb": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/042/62ce6ebaac6b6ff34c15987613398c92-thumb.png",
					"image_original": "https://hsaa.hsobjects.com/h/kitchens/images/000/000/042/62ce6ebaac6b6ff34c15987613398c92-original.png"
				}
			]
		},
		"local": {
			"id": 179,
			"city_id": 2,
			"name": "Al Marwah",
			"name_en": "Al Marwah"
		},
		"food_characteristics": [],
		"deliveries": []
	},
	"address": {
		"id": 328785453,
		"name": "Al Marwah",
		"name_en": "Al Marwah",
		"local_id": 179,
		"addresstype_id": 1,
		"latitude": 21.62050010921863,
		"longitude": 39.19249176979065,
		"dynamic_field": {},
		"description": "",
		"disabled": false,
		"specific_type": "old_style",
		"specific_type_name": "Old Style",
		"local": {
			"id": 179,
			"city_id": 2,
			"name": "Al Marwah",
			"name_en": "Al Marwah"
		}
	},
	"local": {
		"id": 179,
		"city_id": 2,
		"name": "Al Marwah",
		"name_en": "Al Marwah"
	},
	"orderitems": [
		{
			"id": 970769297,
			"order_id": 269125532,
			"menuitem_id": 2471551,
			"count": 1,
			"note": "",
			"total_cost": 9.0,
			"orderitemlinkcheckoptions": [],
			"orderitemlinkradiooptionitems": [],
			"orderitem_link_modifiers": [
				{
					"id": 767831951,
					"modifier_id": 2618606,
					"orderitem_id": 970769297
				},
				{
					"id": 767831950,
					"modifier_id": 2618621,
					"orderitem_id": 970769297
				},
				{
					"id": 767831949,
					"modifier_id": 2618635,
					"orderitem_id": 970769297
				}
			],
			"menuitem": {
				"id": 2471551,
				"enabled": true,
				"price": 9.0,
				"name": "Chicken Fillet Sandwich - Chicken Fillet Sandwich",
				"name_en": "Chicken Fillet Sandwich - Chicken Fillet Sandwich",
				"checkoptiongroups": [],
				"radiooptions": [],
				"modifier_groups": [
					{
						"id": 384025,
						"min_option": 0,
						"max_option": 4,
						"weight": 0,
						"menuitem_ids": [
							2471551
						],
						"name": "Pickles",
						"name_en": "Pickles",
						"modifier_ids": [
							2618648,
							2618635,
							2618621,
							2618606
						],
						"modifiers": [
							{
								"id": 2618648,
								"modifier_group_id": 384025,
								"price": "0.0",
								"calories": 0,
								"weight": 3,
								"name": "Without Pickles"
							},
							{
								"id": 2618635,
								"modifier_group_id": 384025,
								"price": "0.0",
								"calories": 0,
								"weight": 2,
								"name": "Without Fries"
							},
							{
								"id": 2618621,
								"modifier_group_id": 384025,
								"price": "0.0",
								"calories": 0,
								"weight": 1,
								"name": "Less Garlic Sauce"
							},
							{
								"id": 2618606,
								"modifier_group_id": 384025,
								"price": "0.0",
								"calories": 0,
								"weight": 0,
								"name": "Without Garlic Sauce"
							}
						]
					}
				]
			}
		},
		{
			"id": 970769296,
			"order_id": 269125532,
			"menuitem_id": 2471481,
			"count": 2,
			"note": "",
			"total_cost": 42.0,
			"orderitemlinkcheckoptions": [],
			"orderitemlinkradiooptionitems": [],
			"orderitem_link_modifiers": [],
			"menuitem": {
				"id": 2471481,
				"enabled": true,
				"price": 21.0,
				"name": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal",
				"name_en": "Albaik 4 Piece Chicken Meal - Albaik 4 Piece Spicy Chicken Meal",
				"checkoptiongroups": [],
				"radiooptions": [],
				"modifier_groups": []
			}
		}
	],
	"order_code": "269125532",
	"pickup_name": null,
	"order_anything_type": null,
	"disclaimer_messages": null,
	"vat_invoices": [],
	"special_sale": null,
	"promotion": null,
	"delivery_estimation_time": null,
	"payment_processing_status": null,
	"payment_section": null,
	"cancellable": true,
	"delivery_option": 2,
	"confirmable": false,
	"estimated_delivery": null
  }
  ```