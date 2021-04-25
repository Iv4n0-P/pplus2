import planplus from "../apis/planplus"
import orderReducer from "../reducers/orderReducer"

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
            total: currTotalPrice + Number(meal.currPrice)
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

export const sendOrder = (history, user, note) => {
    return async (dispatch, getState) => {
        
        const order = getState().order
        
        const orderForSend = {
            "user": user,
            "table": order.table,
            "note": note,
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

export const updateMeal = (index, updates) => {
   return (dispatch, getState) => {
        const order = getState().order
        const newOrderItemSet = order.orderitem_set.map((meal, i) => {
            if (i === Number(index)) {
                return {...meal, ...updates}
            } else { return meal }
        })
        const newUpdates = {
            orderitem_set: newOrderItemSet
        }
        dispatch(updateOrder(newUpdates))
   }
}
