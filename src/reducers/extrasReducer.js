export default (state = [], action) => {
    switch (action.type) {
        case 'SET_EXTRAS':
            return [...action.extras]
        default:
            return state
    }
}