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

    return (dispatch, getState) => {

        const order = getState().orders.find((order) => { return order.table === table })

        //switchaj sent properti za svako jelo u meals arrayu
        const updatedMeals = order.meals.map((meal) => {
            return { ...meal, sent: true }
        })

        //update single order   
        const updates = { ...order, meals: updatedMeals }

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