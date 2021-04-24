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
        const newMeals = order.orderitem_set.concat(meal)
        const currTotalPrice = order.total
        
        const updates = {
            orderitem_set: newMeals,
            total: currTotalPrice + Number(meal.price)
        }
        
        dispatch(updateOrder(updates))
    }
}

export const deleteMeal = (indexOfMealToDelete, mealPrice) => {

    return (dispatch, getState) => {

        const order = getState().order
        const currMeals = order.orderitem_set
        const currTotalPrice = order.total
        const newMeals = currMeals.filter((meal, currMealIndex) => {
            return currMealIndex !== indexOfMealToDelete
        })

        const updates = {
            orderitem_set: newMeals,
            total: currTotalPrice - Number(mealPrice)
        }

        dispatch(updateOrder(updates))
    }
}

export const sendOrder = (history, user) => {
    return async (dispatch, getState) => {
        
        const order = getState().order
        
        const orderForSend = {
            "user": user,
            "table": order.table,
            "orderitem_set": order.orderitem_set
            }
            
            const data = await planplus.post('https://pp.doubleclick.hr/hr/orders/api/', orderForSend)

            if (data.status === 201) {
                history.push(`/home/${order.user}`)
                dispatch(updateOrder({
                    table: null,
                    orderitem_set: [],
                    total: null
                }))
            }
    }
}

export const startDeleteOrder = (table, history, user) => {
    return (dispatch) => {
        dispatch(updateOrder({
            table: null,
            orderitem_set: [],
            total: null
        }))
        history.push(`/home/${user}`)
    }
}