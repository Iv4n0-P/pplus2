import React from 'react'
import { startAddOrder, deleteOrder } from '../actions/orders'
import { connect } from 'react-redux'
import planplus from '../apis/planplus'

const Home = (props) => {

    const user = props.match.params.user

    const [ selectedTable, setSelectedTable ] = React.useState('1')
    const [ orders, setOrders ] = React.useState([])
 
    const onInputChange = (value) => {
        setSelectedTable(value)
    }

    React.useEffect(() => {
        const getOrders = async () => {
            const { data } = await planplus.get('https://pp.doubleclick.hr/hr/orders/api/')
            setOrders(data.results)
        }

        getOrders()        
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.startAddOrder(props.history, { user, table: selectedTable, meals: [], totalPrice: 0 })
    }

    const handleViewOrder = async (id) => {
        props.history.push(`/details?id=${id}&user=${user}`)
    }

    const finishOrder = (id) => {
        console.log(`Upucuje ID apiju`)
    }

    const renderOrders = () => {

        return orders.map((order) => {
            return (
                <div key={order.table} className="otvoreni-stolovi-box">
                    <div className="otvoreni-stolovi-box-col1">
                        <h6 className="table" onClick={() => {props.history.push(`/table/${order.table}`)}}>Stol {order.table} &rsaquo;</h6>
                        <p>Ukupno: {order.total} kn</p>
                    </div>
                    <div className="otvoreni-stolovi-box-col2">
                        <button onClick={() => { handleViewOrder(order.id) }}>Opširnije</button>
                        <button className="otvoreni-stolovi-box-btn2" onClick={() => { finishOrder(order.id) }}>Izdaj račun</button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="home-wrap">
            <button className="button-home button-odjava margin-bottom">Odjava</button>
           
            <h3 className="subtitle">Upiši stol</h3>
            <form onSubmit={handleOnSubmit}>
                <input className="home-input" type="text" value={selectedTable} onChange={(e) => { onInputChange(e.target.value) }} />
                <button className="button-home">Kreiraj novu narudžbu</button>
            </form>
            <div className="otvoreni-stolovi">
            {orders.length !== 0 ? (
                <div>
                <h3 className="subtitle">Otvorene narudžbe</h3>
                <p>Pritisnite na stol za pogledat sve narudžbe tog stola.</p>
                </div>
            ) : (
                <div>
                <h3 className="subtitle margin-bottom">Učitavanje narudžbi...</h3>
                <span class="load">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </span>
                </div>
            )}
                {renderOrders()}
            <p className="closed-link" onClick={() => {props.history.push(`/closed/${user}`)}}>Zatvorene narudžbe &rarr;</p>
            </div>
        </div>
    )
}

export default connect(null, { startAddOrder, deleteOrder })(Home)