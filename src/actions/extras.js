import axios from 'axios'



export const setExtras = () => {
    return async (dispatch, getState) => {
        const planplus = axios.create({
            baseURL: 'https://pp.doubleclick.hr',
            auth: {
                username: getState().user.username,
                password: getState().user.password
            }
        })
        
        
        const { data } = await planplus.get('/hr/items/order/extras/')
        dispatch({
            type: 'SET_EXTRAS',
            extras: data.results
        })
    }
}