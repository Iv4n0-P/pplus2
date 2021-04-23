import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteMeal } from '../actions/order'
import { sendOrder, startDeleteOrder } from '../actions/order'

const Order = (props) => {

    const history = useHistory()

    const handleDeleteMeal = (indexOfMealToDelete, mealPrice) => {
        props.deleteMeal(indexOfMealToDelete, mealPrice)
    }

    const handleOrderReset = () => {
        props.startDeleteOrder(props.order.table, history, props.order.user)
        history.push(`/home/${props.order.user}`)
    }

    const handleSendOrder = (history, user) => {
        props.sendOrder(history, user)
    }

    

    return (
        <div className="order-wrap">
            <h3 className="order-subtitle">Narudžba</h3>
            <p>Konobar: <span>{props.order.user}</span></p>
            <p>Stol: <span>{props.order.table}</span></p>

            {props.order.meals.length !== 0 && props.order.meals.map((meal, index) => {

                const getCourseName = () => {
                    if (meal.course === 1) {return 'Predjelo'}
                    if (meal.course === 2) {return 'Glavno jelo'}
                    if (meal.course === 3) {return 'Desert'}
                }

                return (
                    <div key={Math.random() * meal.item} className="order-meal">
                        <button disabled={meal.sent} onClick={() => handleDeleteMeal(index, meal.price)}>x</button>
                        <p className="meal-title"><span>{getCourseName()}</span>{meal.item_name}</p>
                        <p className="order-price">{meal.price}</p>
                        <p><span className="tmp-extras">{meal.extra.toString()}</span></p>
                    </div>
                )
            })}
            <div className="order-controls">
                <button className="btn-odustani" onClick={handleOrderReset}>Odustani</button>
                <button className="btn-posalji" disabled={props.order.totalPrice === 0} onClick={() => {handleSendOrder(history, props.order.useHistory)}}>Pošalji narudžbu</button>
            </div>
            <p className="order-total"><span className="order-dots"></span> Ukupno:&nbsp;<span>{props.order.totalPrice} kn</span></p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        order: state.order
    }
}

export default connect(mapStateToProps, { sendOrder, deleteMeal, startDeleteOrder })(Order)