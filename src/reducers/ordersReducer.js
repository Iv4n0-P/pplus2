export default (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_ORDERS':
            return [...state, action.payload]
        case 'REMOVE_ORDER':
            return state.filter((order) => {return order.table !== action.payload})
        default: 
        return state
    }
}