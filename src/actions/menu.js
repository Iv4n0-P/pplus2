import planplus from '../apis/planplus'

export const getCategories = () => {
    return async (dispatch, getState) => {

        const { data } = await planplus.get('hr/categories/order')
        
        dispatch({
            type: 'SET_MENU',
            payload: data.results
        })

        const menu = getState().menu

        menu.forEach(async (menuItem) => {

            const { data } = await planplus.get(`hr/items/order?category=${menuItem.id}`)
                      
            dispatch({
                type: 'EDIT_MENU',
                id: menuItem.id,
                payload: {
                    meals: data.results
                }
            })
        })
    }
}