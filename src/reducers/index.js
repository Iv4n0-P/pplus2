import { combineReducers } from 'redux'
import ordersReducer from './ordersReducer'
import menuReducer from './menuReducer'

export default combineReducers({
    menu: menuReducer,
    orders: ordersReducer
})