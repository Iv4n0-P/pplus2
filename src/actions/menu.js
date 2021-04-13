//import planplus from '../apis/planplus'
//import history from '../history'

export const getCategories = () => {
    return async (dispatch, getState) => {

        //const { data } = await planplus.get('hr/categories/menu')

        await dispatch({
            type: 'SET_MENU',
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

        const menu = getState().menu

        menu.forEach((menuItem) => {
            dispatch({
                type: 'EDIT_MENU',
                id: menuItem.id,
                payload: {
                    meals: [
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
                    ]
                }
            })
        })
    }
}