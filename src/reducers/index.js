import { combineReducers } from 'redux'
import categoriesReducer from './categoriesReducer'
import orderReducer from './orderReducer'
import mealsReducer from './mealsReducer'

export default combineReducers({
    categories: categoriesReducer,
    order: orderReducer,
    meals: mealsReducer
})