export default (state = [], action) => {
    switch (action.type) {
        case 'SET_MENU':
            return [...action.payload]
        case 'EDIT_MENU':
            return state.map((menuItem) => {
                if (menuItem.id === action.id) {
                    return {...menuItem, ...action.payload}
                } else { 
                    return menuItem
                }
            })
        default: 
        return state
    }
}