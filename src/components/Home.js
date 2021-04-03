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
            <button>Submit</button>
            </form>
        </div>
    )
}

export default connect(null, {updateOrder})(Home)