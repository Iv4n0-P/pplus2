import planplus from '../apis/planplus'

export const setExtras = () => {
    return async (dispatch) => {
        const { data } = await planplus.get('https://pp.doubleclick.hr/hr/items/order/extras/')
        dispatch({
            type: 'SET_EXTRAS',
            extras: data.results
        })
    }
}