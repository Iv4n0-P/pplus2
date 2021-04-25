import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteMeal } from '../actions/order'
import { sendOrder, startDeleteOrder } from '../actions/order'
import OrderMeal from './OrderMeal'

const Order = (props) => {

    const history = useHistory()

    const [ note, setNote ] = React.useState('')

    const handleDeleteMeal = (indexOfMealToDelete, mealPrice) => {
        props.deleteMeal(indexOfMealToDelete, mealPrice)
    }

    const handleOrderReset = () => {
        props.startDeleteOrder(props.order.table, history, props.order.user)
        history.push(`/home/${props.order.user}`)
    }

    const handleSendOrder = (history, user) => {
        props.sendOrder(history, user, note)
    }

    

    return (
        <div className="order-wrap">
            <h3 className="order-subtitle">Narudžba</h3>
            <p>Konobar: <span>{props.order.user}</span></p>
            <p>Stol: <span>{props.order.table}</span></p>
            <p>Jela: <span>Pritisnite na jelo za uređivanje</span></p>

            {props.order.orderitem_set.length !== 0 && props.order.orderitem_set.map((meal, index) => {

                const getCourseName = () => {
                    if (meal.course === 1) {return 'Predjelo'}
                    if (meal.course === 2) {return 'Glavno jelo'}
                    if (meal.course === 3) {return 'Desert'}
                }

                return <OrderMeal index={index} meal={meal} table={props.order.table} handleDeleteMeal={handleDeleteMeal} getCourseName={getCourseName}/>
            })}
            <textarea className="textarea margin-top" placeholder="Unesite napomenu (opcionalno)" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
            <div className="order-controls">
                <button className="btn-odustani" onClick={handleOrderReset}>Odustani</button>
                <button className="btn-posalji" disabled={props.order.total === 0} onClick={() => {handleSendOrder(history)}}>{props.order.total === 0 ? 'Dodajte jela prije slanja' : 'Pošalji narudžbu'}</button>
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