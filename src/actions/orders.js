export const deleteOrder = (table) => {
    return {
        type: 'REMOVE_ORDER',
        payload: table
    }
}

export const startUpdateOrders = (order, history) => {
    return (dispatch, getState) => {
        
        const orders = getState().orders
        
        const tables = orders.map((savedOrder) => {
            return savedOrder.table
        })
        
        if (tables.indexOf(order.table) === -1) {
            dispatch(updateOrders(order, history))
        } else {
            dispatch(deleteOrder(order.table))
            dispatch(updateOrders(order, history))
            history.push('/home')
        }        
    }
}

export const updateOrders = (order, history) => {
    return {
        type: 'UPDATE_ORDERS',
        payload: order
    }
    
}