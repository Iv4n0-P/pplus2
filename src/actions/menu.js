import axios from 'axios'

export const getCategories = () => {
    return async (dispatch, getState) => {
        const planplus = axios.create({
            baseURL: 'https://pp.doubleclick.hr',
            auth: {
                username: getState().user.username,
                password: getState().user.password
            }
        })
        const { data } = await planplus.get('/hr/categories/order')
     
        dispatch({
            type: 'SET_MENU',
            payload: data.results
        })

        const menu = getState().menu

        menu.forEach(async (menuItem) => {

            const { data } = await planplus.get(`/hr/items/order?category=${menuItem.id}`)
                      
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