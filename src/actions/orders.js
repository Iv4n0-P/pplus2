import planplus from '../apis/planplus'

export const addOrder = (order) => {
    return {
        type: 'ADD_ORDER',
        payload: order
    }
}

export const deleteOrder = (table) => {
    return {
        type: 'DELETE_ORDER',
        table
    }
}

export const editOrder = (table, updates) => {
    return {
        type: 'EDIT_ORDER',
        table,
        payload: updates
    }
}

//---------------

export const startAddOrder = (history, updates) => {
    return (dispatch) => {
        dispatch(addOrder(updates))
        history.push(`/menu/${updates.table}`)
    }
}

export const addMeal = (meal, table) => {
    return (dispatch, getState) => {

        const order = getState().orders.find((order) => { return order.table === table })
        const newMeals = order.meals.concat(meal)
        const currTotalPrice = order.totalPrice
        
        const updates = {
            meals: newMeals,
            totalPrice: currTotalPrice + Number(meal.price)
        }
        
        dispatch(editOrder(table, updates))
    }
}

export const deleteMeal = (table, indexOfMealToDelete, mealPrice) => {

    return (dispatch, getState) => {

        const order = getState().orders.find((order) => { return order.table === table })
        const currMeals = order.meals
        const currTotalPrice = order.totalPrice
        const newMeals = currMeals.filter((meal, currMealIndex) => {
            return currMealIndex !== indexOfMealToDelete
        })

        const updates = {
            meals: newMeals,
            totalPrice: currTotalPrice - Number(mealPrice)
        }

        dispatch(editOrder(table, updates))
    }
}

export const updateSentMeals = (table, history) => {

    return async (dispatch, getState) => {

        const order = getState().orders.find((order) => { return order.table === table })

        //switchaj sent properti za svako jelo u meals arrayu
        const updatedMeals = order.meals.map((meal) => {
            return { ...meal, sent: true }
        })

        //update single order   
        const updates = { ...order, meals: updatedMeals }

        //preparing object for api
        const orderForSend = {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 1,
                    "table": "4",
                    "label": "21-000001",
                    "payment_method": null,
                    "issue_date": "2021-04-13T13:45:36.986244+02:00",
                    "total": "266.00",
                    "is_in_process": false,
                    "is_closed": false,
                    "is_deleted": false,
                    "orderitem_set": [
                        {
                            "id": 1,
                            "item": 8,
                            "item_name": "Juha od rajčice s vrhnjem",
                            "quantity": "3.00",
                            "price": "29.00",
                            "course": 1,
                            "extras": [
                                20
                            ],
                            "note": ""
                        },
                        {
                            "id": 2,
                            "item": 4,
                            "item_name": "Biftek tartar za dvije osobe",
                            "quantity": "1.00",
                            "price": "149.00",
                            "course": 2,
                            "extras": [
                                22
                            ],
                            "note": ""
                        }
                    ]
                }
            ]
       }
       

        const { data } = await planplus.post('https://pp.cirrus.hr/hr/orders/api', order)

        dispatch(editOrder(table, updates))
        history.push(`/home/${order.user}`)
    }
}

export const sendOrder = (table, order, history) => {
    return (dispatch, getState) => {
        dispatch(editOrder(table, order))
        history.push('/home')
    }
}

export const startDeleteOrder = (table, history, user) => {
    return (dispatch) => {
        dispatch(deleteOrder(table))
        history.push(`/home/${user}`)
    }
}