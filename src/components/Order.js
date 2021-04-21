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
    }

    return (
        <div className="order-wrap">
            <h3 className="order-subtitle">Narudžba</h3>
            <p>Konobar: <span>{props.order.user}</span></p>
            <p>Stol: <span>{props.order.table}</span></p>

            {props.order.meals.length !== 0 && props.order.meals.map((meal, index) => {

                return (
                    <div key={Math.random() * meal.id} className="order-meal">
                        <button disabled={meal.sent} onClick={() => handleDeleteMeal(index, meal.price)}>x</button>
                        <p className="meal-title"><span>{meal.type}</span>{meal.name}</p>
                        <p className="order-price">{meal.price}</p>
                        <p><span className="tmp-extras">{meal.extra.toString()}</span></p>
                    </div>
                )
            })}
            <div className="order-controls">
                <button className="btn-odustani" onClick={handleOrderReset}>Odustani</button>
                <button className="btn-posalji" disabled={props.order.totalPrice === 0 || props.order.meals.findIndex(meal => meal.sent === false) === -1} onClick={handleUpdateOrders}>Pošalji narudžbu</button>
            </div>
            <p className="order-total"><span className="order-dots"></span> Ukupno:&nbsp;<span>{props.order.totalPrice} kn</span></p>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        order: state.orders.find((order) => { return order.table === ownProps.table })
    }
}

export default connect(mapStateToProps, { deleteMeal, startAddOrder, updateSentMeals, startDeleteOrder })(Order)