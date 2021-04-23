import planplus from "../apis/planplus"

export const startUpdateOrder = (history, updates) => {
    return (dispatch) => {
        dispatch(updateOrder(updates))
        history.push(`/menu/${updates.table}`)
    }
}

export const updateOrder = (updates) => {
    return {
        type: 'UPDATE_ORDER',
        updates
    }
}

export const addMeal = (meal, table) => {
    return (dispatch, getState) => {

        const order = getState().order
        const newMeals = order.meals.concat(meal)
        const currTotalPrice = order.totalPrice
        
        const updates = {
            meals: newMeals,
            totalPrice: currTotalPrice + Number(meal.price)
        }
        
        dispatch(updateOrder(updates))
    }
}

export const deleteMeal = (indexOfMealToDelete, mealPrice) => {

    return (dispatch, getState) => {

        const order = getState().order
        const currMeals = order.meals
        const currTotalPrice = order.totalPrice
        const newMeals = currMeals.filter((meal, currMealIndex) => {
            return currMealIndex !== indexOfMealToDelete
        })

        const updates = {
            meals: newMeals,
            totalPrice: currTotalPrice - Number(mealPrice)
        }

        dispatch(updateOrder(updates))
    }
}

export const sendOrder = (history, user) => {
    return async (dispatch, getState) => {
        
        const order = getState().order
        
        const orderForSend = {
            "table": order.table,
            "orderitem_set": [
            {
            "item": 8,
            "quantity": 1,
            "price": 29.00,
            "course": 1,
            "extras": [20]
            },
            {
            "item": 4,
            "quantity": 2.00,
            "price": 149.00,
            "course": 2,
            "extras": [22, 20]}]
            }
            
            const data = await planplus.post('https://pp.doubleclick.hr/hr/orders/api/', orderForSend)

            if (data.status === 201) {
                history.push(`/home/${order.user}`)
                dispatch(updateOrder({
                    table: null,
                    meals: [],
                    totalPrice: null
                }))
            }
    }
}

export const startDeleteOrder = (table, history, user) => {
    return (dispatch) => {
        dispatch(updateOrder({
            table: null,
            meals: [],
            totalPrice: null
        }))
        history.push(`/home/${user}`)
    }
}