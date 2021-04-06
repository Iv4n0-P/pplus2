import planplus from '../apis/planplus'
//import history from '../history'

export const getMealCategories = () => {
    return async (dispatch, getState) => {
        const mealCategories = getState().mealCategories

        const { data } = await planplus.get('hr/categories/menu')

        dispatch({
            type: 'FETCH_CATEGORIES',
            payload: data.results
        })

        getState().categories.forEach(async (category) => {

            let id = category.id
            
            const { data } = await planplus.get(`hr/items/menu?category=${id}`)
        
            let currMeals = {
            [id]: data.results
            }                      

            dispatch(getMeals(currMeals))
        })        
    }
}

export const getMeals = (currMeals) => {
    return {
        type: 'GET_MEALS',
        payload: currMeals
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