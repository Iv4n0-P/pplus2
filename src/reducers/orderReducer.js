const INIT_STATE = {
    user: '',
    table: null,
    meals: [],
    totalPrice: 0
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_ORDER':
            return {...state, ...action.payload}
        default:
            return state
    }
}