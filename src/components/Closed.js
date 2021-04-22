import React from 'react'
import planplus from '../apis/planplus'

const Closed = (props) => {
    const [ orders, setOrders ] = React.useState([])
    const [ count, setCount ] = React.useState(0)

    const user = props.match.params.user
    console.log(props)

    React.useEffect(() => {
        const getOrders = async () => {
            const { data } = await planplus.get('https://pp.doubleclick.hr/hr/orders/closed')
            setOrders(data.results)
            setCount(data.count)
        }
        getOrders()
    }, [])

    const handleViewOrder = (id) => {
        props.history.push(`/details?id=${id}&user=${user}`)
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

    if (count === 0) {
        return (
            <div>
                <h3 className="subtitle margin-bottom">Nema zatvorenih narudžbi</h3>
                <button className="btn-odustani" onClick={() => {
                    props.history.push(`/home/${user}`)
                }}>Povratak</button>
            </div>
        )
    }

    return (
        <div>
        {orders.length !== 0 ? <h3 className="subtitle">Zatvorene narudžbe</h3> : (
            <div>
            <h3 className="subtitle margin-bottom">Učitavanje...</h3>
            <span class="load">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </span>
            </div>
        )}
            {renderOrders()}
        </div>
    )
}

export default Closed