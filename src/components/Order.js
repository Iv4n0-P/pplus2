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

            {props.order.orderitem_set.length !== 0 && props.order.orderitem_set.map((meal, index) => {

                const getCourseName = () => {
                    if (meal.course === 1) {return 'Predjelo'}
                    if (meal.course === 2) {return 'Glavno jelo'}
                    if (meal.course === 3) {return 'Desert'}
                }

                return (
                    <div key={Math.random() * meal.item} className="order-meal">
                        <button disabled={meal.sent} onClick={() => handleDeleteMeal(index, meal.price)}>x</button>
                        <p className="meal-title"><span>{getCourseName()}</span>{meal.item_name}</p>
                        <p><span>Količina: {meal.quantity}</span></p>
                        <p className="order-price">{meal.price} <span>kn</span></p>
                        <p><span className="tmp-extras">{meal.extras.map((extra) => {
                            const extraFromState = props.extras.find((extraState) => {return extraState.id === extra})
                            return `${extraFromState.name}, `
                        })}</span></p>
                        <p><span>Napomena: {meal.note}</span></p>
                        </div>
                )
            })}
            
            <div className="order-controls">
                <button className="btn-odustani" onClick={handleOrderReset}>Odustani</button>
                <button className="btn-posalji" disabled={props.order.totalPrice === 0} onClick={() => {handleSendOrder(history)}}>Pošalji narudžbu</button>
            </div>
            <p className="order-total"><span className="order-dots"></span> Ukupno:&nbsp;<span>{props.order.total} kn</span></p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        extras: state.extras
    }
}

export default connect(mapStateToProps, { sendOrder, deleteMeal, startDeleteOrder })(Order)