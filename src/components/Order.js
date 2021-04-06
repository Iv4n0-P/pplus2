import React from 'react'
import { connect } from 'react-redux'
import { deleteMeal, updateOrder } from '../actions'
import { startUpdateOrders, deleteOrder } from '../actions/orders'
import { useHistory } from 'react-router-dom'

const Order = (props) => {

    const history = useHistory()
 
    const handleDeleteMeal = (indexOfMealToDelete, mealPrice) => {
        props.deleteMeal(indexOfMealToDelete, mealPrice)
    }

    const handleOrderReset = (table) => {
        props.deleteOrder(table)
        props.updateOrder({
            table: null,
            meals: [],
            totalPrice: 0
        })

        history.push('/home')
    }

    const handleUpdateOrders = () => {
        props.startUpdateOrders(props.order, history)
        handleOrderReset()
       
    }

    return (
        <div>
            <h3>Order details</h3>
            <p>Konobar: {props.order.user}</p>
            <p>Table: {props.order.table}</p>
            <p>Jela:</p>
            {props.order.meals.length !== 0 && props.order.meals.map((meal, index) => {

                return (
                    <div key={meal.id}>
                        <button onClick={() => handleDeleteMeal(index, meal.price)}>x</button>
                        <p>{meal.name} - {meal.type}</p>
                        <p>{meal.price}</p>
                        <p>{meal.extras.toString()}</p>
                        <p>{meal.minus.toString()}</p>
                    </div>
                )
            })}
            <p>Ukupna cijena: {props.order.totalPrice} kn</p>
            <button onClick={() => {handleOrderReset(props.order.table)}}>Obriši narudžbu i povratak</button>
            <button disabled={props.order.totalPrice === 0} onClick={handleUpdateOrders}>Sačuvaj narudžbu</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        order: state.order
    }
}

export default connect(mapStateToProps, { deleteMeal, updateOrder, startUpdateOrders, deleteOrder })(Order)