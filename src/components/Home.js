import React from 'react'
import { startAddOrder, deleteOrder } from '../actions/orders'
import { connect } from 'react-redux'

const Home = (props) => {

    const user = props.match.params.user

    const [selectedTable, setSelectedTable] = React.useState('1')
    const [disabled, setDisabled] = React.useState(false)

    const onInputChange = (value) => {
        setSelectedTable(value)
    }

    React.useEffect(() => {
        const tables = props.orders.map((order) => {
            return order.table
        })

        if (tables.includes(selectedTable)) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }

    }, [selectedTable])


    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.startAddOrder(props.history, { user, table: selectedTable, meals: [], totalPrice: 0 })
    }

    const handleEditOrder = (table) => {
        props.history.push(`/menu/${table}`)
    }

    const finishOrder = (order) => {
        props.deleteOrder(order.table)
    }

    const renderOrders = () => {
        return props.orders.map((order) => {
            return (
                <div key={order.table} className="otvoreni-stolovi-box">
                    <div className="otvoreni-stolovi-box-col1">
                        <h6>Stol {order.table}</h6>
                        <p>Ukupno: {order.totalPrice} kn</p>
                    </div>
                    <div className="otvoreni-stolovi-box-col2">
                        <button onClick={() => { handleEditOrder(order.table) }}>Dodaj jela</button>
                        <button className="otvoreni-stolovi-box-btn2" onClick={() => { finishOrder(order) }}>Izdaj račun</button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="home-wrap">
            <button className="button-home button-odjava">Odjava</button>
            <h1 className="title">Orders</h1>
            <h3 className="subtitle">Upiši stol</h3>
            <form onSubmit={handleOnSubmit}>
                <input className="home-input" type="text" value={selectedTable} onChange={(e) => { onInputChange(e.target.value) }} />
                <button className="button-home" disabled={disabled}>{disabled ? 'Ovaj stol već ima otvorenu narudžbu' : 'Kreiraj novu narudžbu'}</button>
            </form>
            <div className="otvoreni-stolovi">
                <h3 className="subtitle">Otvoreni stolovi</h3>
                {renderOrders()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders
    }
}

export default connect(mapStateToProps, { startAddOrder, deleteOrder })(Home)