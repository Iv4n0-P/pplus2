import React from 'react'
import planplus from '../apis/planplus'

const Table = (props) => {

    const table = props.match.params.table
    const [ orders, setOrders ] = React.useState([])
    const [ closed, setClosed ] = React.useState([])

    React.useEffect(() => {

        const getOrders = async () => {
            const { data } = await planplus.get(`https://pp.doubleclick.hr/hr/orders/open?table=${table}`)
            setOrders(data.results)
            console.log(orders)
        }

        const getClosed = async () => {
            const { data } = await planplus.get(`https://pp.doubleclick.hr/hr/orders/closed?table=${table}`)
            setClosed(data.results)
            console.log(closed)
        }

        getOrders()
        getClosed()
    }, [])

    const handleViewOrder = (id) => {
        props.history.push(`/details?id=${id}&user=admin`)
    }

    const renderOrders = () => {
        return orders.map((order) => {
            return (
                <div key={order.table} className="otvoreni-stolovi-box">
                    <div className="otvoreni-stolovi-box-col1">
                        <h6>Stol {order.table}</h6>
                        <p>Ukupno: {order.total} kn</p>
                    </div>
                    <div className="otvoreni-stolovi-box-col2">
                        <button onClick={() => { handleViewOrder(order.id) }}>Opširnije</button>
                    </div>
                </div>
            )
        })
    }

    const renderClosed = () => {
        return closed.map((order) => {
            return (
                <div key={order.table} className="otvoreni-stolovi-box">
                    <div className="otvoreni-stolovi-box-col1">
                        <h6>Stol {order.table}</h6>
                        <p>Ukupno: {order.total} kn</p>
                    </div>
                    <div className="otvoreni-stolovi-box-col2">
                        <button onClick={() => { handleViewOrder(order.id) }}>Opširnije</button>
                    </div>
                </div>
            )
        })
    }
 
    return (
        <div>
        <button className="button-home button-odjava margin-bottom" onClick={() => {
            props.history.goBack()
        }}>Povratak</button>
        <h3>{`Stol ${table}`}</h3>
        <h3 className="subtitle margin-top">Otvorene narudžbe</h3>
        {orders.length !== 0 ? renderOrders() : (
            <div>
            <span class="load margin-top">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </span>
            </div>
        )}
        <h3 className="subtitle margin-top">Zatvorene narudžbe</h3>
        {closed.length === 0 ? <p className="no-orders">Nema zatvorenih narudžbi</p> : renderClosed()}
        </div>
    )
}

export default Table