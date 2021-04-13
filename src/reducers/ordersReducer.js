export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return [...state, action.payload]
        case 'DELETE_ORDER':
            return state.filter((order) => {
                return order.table !== action.table
            })
        case 'EDIT_ORDER':
            return state.map((order) => {
                if (order.table === action.table) {
                    return {...order, ...action.payload}
                } else {
                    return order
                }
            })
        default:
            return state
    }
}