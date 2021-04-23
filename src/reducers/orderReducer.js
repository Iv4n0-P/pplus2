export default (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_ORDER':
            return {...state, ...action.updates}
        default: 
        return state
    }
}