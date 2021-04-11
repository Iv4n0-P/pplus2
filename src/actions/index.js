//import planplus from '../apis/planplus'
//import history from '../history'

export const getMealCategories = () => {
    return async (dispatch, getState) => {
        //const mealCategories = getState().mealCategories

        //const { data } = await planplus.get('hr/categories/menu')

        dispatch({
            type: 'FETCH_CATEGORIES',
            //payload: data.results
            payload: [
                {
                    "id": 1,
                    "name": "Cold starters",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/side-close-view-of-bowl-of-veggie-salad-with-fork--9H8YWSB.JPG"
                },
                {
                    "id": 2,
                    "name": "Soups",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/soup-T8ZKZBR.JPG"
                },
                {
                    "id": 3,
                    "name": "Clams",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/mussels-with-herbs-and-sauce-in-black-pan-copy-spa-WJZ92E5.JPG"
                },
                {
                    "id": 4,
                    "name": "Holland's menu",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/dutch-traditional-snack-bitterballen-PXPML7R.JPG"
                },
                {
                    "id": 5,
                    "name": "Warm starters",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/baked-potato-with-herbs-top-view-DPK8NYM.JPG"
                },
                {
                    "id": 6,
                    "name": "Meat",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/assorted-meat-cuts-RC6S2A5.JPG"
                },
                {
                    "id": 7,
                    "name": "Sauces",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/delicious-sauces-guacomole-mayonnaise-and-ketchup--LQZP69M.JPG"
                },
                {
                    "id": 8,
                    "name": "Fish",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/fresh-dorado-fish-with-ingredients-RGL4HXY.JPG"
                },
                {
                    "id": 9,
                    "name": "Kids",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/potato-smiling-face-snacks-4QWGVP9.JPG"
                },
                {
                    "id": 10,
                    "name": "Side dishes",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/rainbow-veggie-bell-peppers-pizza-K84DN3B.JPG"
                },
                {
                    "id": 11,
                    "name": "Salads",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/healthy-salad-arugula-salad-in-a-bowl-N3ADD4K.JPG"
                },
                {
                    "id": 12,
                    "name": "Pizza",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/homemade-pizza-top-view-with-copy-space-on-dark-st-6SFCEAP.JPG"
                },
                {
                    "id": 13,
                    "name": "Deserts",
                    "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/categories/dessert-TYBC7WR.JPG"
                }
            ]
        })

        dispatch(getMeals({}))

        /* getState().categories.forEach(async (category) => {

            let id = category.id
            
            const { data } = await planplus.get(`hr/items/menu?category=${id}`)
        
            let currMeals = {
            [id]: data.results
            }                      

            dispatch(getMeals(currMeals))
        })         */
    }
}

export const getMeals = (currMeals) => {
    return {
        type: 'GET_MEALS',
        //payload: currMeals
        payload: {
            1: [
                    {
                        "id": 1,
                        "name": "Plate with cheese, raw ham, beef, tartare and bacon",
                        "price": "85.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/cold-cuts-CXQD8DC666.jpg"
                    },
                    {
                        "id": 2,
                        "name": "Bruschetta",
                        "price": "59.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/ddddasty-bruschetta-PPLH9TW.jpg"
                    },
                    {
                        "id": 3,
                        "name": "Beef carpaccio and rucola",
                        "price": "75.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/marbled-beef-carpaccio-with-arugula-capers-and-par-CAQ2XdfafdsfZZ.jpg"
                    },
                    {
                        "id": 4,
                        "name": "Beef tartare for 2",
                        "price": "149.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/steak-tartare-tartar-steak-beef-tartare-REDdfadf5YU8.jpg"
                    },
                    {
                        "id": 5,
                        "name": "Octopus salad",
                        "price": "63.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/fresh-octopus-salad-PMPQXEZdd_D22JHM8.jpg"
                    },
                    {
                        "id": 6,
                        "name": "Cold sea plate",
                        "price": "85.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/serving-cold-smoked-salmon-fish-restaurant-dish-on-D7SV6ddfHC.jpg"
                    }
                ],
            2: [
                    {
                        "id": 7,
                        "name": "Chicken soup",
                        "price": "25.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/chicken-soup-CWF4YRX666.jpg"
                    },
                    {
                        "id": 8,
                        "name": "Tomato soup with sour cream",
                        "price": "29.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/home-made-tomato-soup-with-cream-M3WdfdAPWE.jpg"
                    }
                ],
            3: [
                    {
                        "id": 9,
                        "name": "Mussels \"Buzara\"",
                        "price": "61.00",
                        "image": "https://cirrus-django-assets.s3.amazonaws.com/planplus/media/items/xseafood-mussels-tomato-soup-in-metal-pot-GGSBLYC.jpg"
                    }
                ]
            
            }
    }
}

export const updateOrder = (updates) => {
    return {
        type: 'UPDATE_ORDER',
        payload: updates
    }
}



export const addMeal = (meal) => {
    return (dispatch, getState) => {
        const newMeals = getState().order.meals.concat(meal)
        const currTotalPrice = getState().order.totalPrice
        
        dispatch(updateOrder({
            meals: newMeals,
            totalPrice: currTotalPrice + Number(meal.price)
        }))
    }
}

export const deleteMeal = (indexOfMealToDelete, mealPrice) => {

    return (dispatch, getState) => {
        const currMeals = getState().order.meals
        const currTotalPrice = getState().order.totalPrice
        const newMeals = currMeals.filter((meal, currMealIndex) => {
            return currMealIndex !== indexOfMealToDelete
        })
        dispatch(updateOrder({
            meals: newMeals,
            totalPrice: currTotalPrice - Number(mealPrice)
        }))
    }
}