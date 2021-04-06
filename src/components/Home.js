import React from 'react'
import { updateOrder } from '../actions'
import { connect } from 'react-redux'

const Home = (props) => {

    const [ selectedTable, setSelectedTable ]  = React.useState(0)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.updateOrder({table: selectedTable})
        props.history.push('/categories')
    }

    const handleEditOrder = (order) => {
        props.updateOrder(order)
        props.history.push('/categories')
    }

    const renderOrders = () => {
        return props.orders.map((order) => {
            return (
                <div>
                    <p>Stol: {order.table}</p>
                    <p>Cijena: {order.totalPrice} kn</p>
                    <button>Izdavanje računa</button>
                    <button onClick={() => {handleEditOrder(order)}}>Izmjeni narudžbu</button>
                    <button>Pošalji narudžbu kuharu</button>
                </div>
            ) 
        })
    }

    return (
        <div>
        <button>Odjavi se</button>
            <h3>Odaberi stol</h3>
            <form onSubmit={handleOnSubmit}>
            <select name="tables" id="tables" onChange={(e) => {setSelectedTable(e.target.value)}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <button>Nastavi</button>
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

export default connect(mapStateToProps, {updateOrder})(Home)