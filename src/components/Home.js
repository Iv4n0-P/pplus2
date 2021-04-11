import React from 'react'
import { updateOrder } from '../actions'
import { deleteOrder } from '../actions/orders'
import { connect } from 'react-redux'

const Home = (props) => {

    const [selectedTable, setSelectedTable] = React.useState(1)
    //cosnt [ disabled, setDisabled ] = React.useState(false)

    const onInputChange = (value) => {
        setSelectedTable(value)

    const tables = props.orders.map((order) => {
            return order.table
    })

    console.log(tables.findIndex((table) => {
            table = selectedTable
    }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.updateOrder({ table: selectedTable })
        props.history.push('/categories')
    }

    const handleEditOrder = (order) => {
        props.updateOrder(order)
        props.history.push('/categories')
    }

    const finishOrder = (order) => {
        console.log(order)
        props.deleteOrder(order.table)
    }

    const renderOrders = () => {
        return props.orders.map((order) => {
            return (
                <div key={order.table}>
                    <p>Stol: {order.table}</p>
                    <p>Cijena: {order.totalPrice} kn</p>
                    <button onClick={() => { handleEditOrder(order) }}>Dodaj jela u narudžbu</button>
                    <button onClick={() => { finishOrder(order) }}>Zaključi narudžbu i izdaj računa</button>
                </div>
            )
        })
    }

    return (
        <div>
            <button>Odjavi se</button>
            <h3>Upiši stol</h3>
            <form onSubmit={handleOnSubmit}>
                <input type="text" value={selectedTable} onChange={(e) => { onInputChange(e.target.value) }} />
                <button>Kreiraj novu narudžbu</button>
            </form>
            <div>
                <h3>Otvoreni stolovi</h3>
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

export default connect(mapStateToProps, { updateOrder, deleteOrder })(Home)