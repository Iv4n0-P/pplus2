import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'
import extrasReducer from './extrasReducer'

export default combineReducers({
    menu: menuReducer,
    order: orderReducer,
    extras: extrasReducer
})