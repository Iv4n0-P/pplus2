import React from 'react'
import { startAddOrder, deleteOrder } from '../actions/orders'
import { connect } from 'react-redux'

const Home = (props) => {

    const user = props.match.params.user

    const [ selectedTable, setSelectedTable ] = React.useState('1')
    const [ disabled, setDisabled ] = React.useState(false)

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
        props.startAddOrder(props.history, {user, table: selectedTable, meals: [], totalPrice: 0})
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
                <div key={order.table}>
                    <p>Stol: {order.table}</p>
                    <p>Cijena: {order.totalPrice} kn</p>
                    <button onClick={() => { handleEditOrder(order.table) }}>Dodaj jela u narudžbu</button>
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
                <input type="text" value={selectedTable} onChange={(e) => {onInputChange(e.target.value)}} />
                <button disabled={disabled}>{disabled ? 'Ovaj stol već ima otvorenu narudžbu' : 'Kreiraj novu narudžbu'}</button>
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

export default connect(mapStateToProps, { startAddOrder, deleteOrder })(Home)