import React from 'react'
import { connect } from 'react-redux'
import { startAddOrder, deleteMeal, updateSentMeals, startDeleteOrder } from '../actions/orders'
import { useHistory } from 'react-router-dom'

const Order = (props) => {

    const history = useHistory()  
 
    const handleDeleteMeal = (indexOfMealToDelete, mealPrice) => {
        props.deleteMeal(props.table, indexOfMealToDelete, mealPrice)
    }

    const handleOrderReset = () => {
        
        const sentMeals = props.order.meals.filter((meal) => {
            return meal.sent === true
        })

        if (sentMeals.length === 0) {
            props.startDeleteOrder(props.order.table, history, props.order.user)
        }

        history.push(`/home/${props.order.user}`)
    }

    const handleUpdateOrders = () => {
        props.updateSentMeals(props.table, history)
        console.log(props.order)
    }

    return (
        <div>
        <h3>Order details</h3>
        <p>Konobar: {props.order.user}</p>
        <p>Table: {props.order.table}</p>
        <p>Jela:</p>
        {props.order.meals.length !== 0 && props.order.meals.map((meal, index) => {

            return (
                <div key={Math.random() * meal.id}>
                    <button disabled={meal.sent} onClick={() => handleDeleteMeal(index, meal.price)}>x</button>
                    <p>{meal.name} - {meal.type}</p>
                    <p>{meal.price}</p>
                    <p>{meal.extra.toString()}</p>
                    <p>{meal.minus.toString()}</p>
                </div>
            )
        })}
        <p>Ukupna cijena: {props.order.totalPrice} kn</p>
        <button onClick={handleOrderReset}>Odustani</button>
        <button disabled={props.order.totalPrice === 0 || props.order.meals.findIndex(meal => meal.sent === false) === -1} onClick={handleUpdateOrders}>Pošalji narudžbu</button>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
        return {
            order: state.orders.find((order) => {return order.table === ownProps.table})
        }    
}

export default connect(mapStateToProps, { deleteMeal, startAddOrder, updateSentMeals, startDeleteOrder })(Order)