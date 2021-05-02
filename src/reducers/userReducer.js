export default (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {...state, ...action.updates}
        default:
            return state
    }
}