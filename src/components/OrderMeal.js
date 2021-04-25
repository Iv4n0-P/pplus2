import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateOrder, updateMeal } from '../actions/order'

const OrderMeal = (props) => {

    const history = useHistory()

    const defaultQuantity = props.meal.quantity ? props.meal.quantity : 1
    const [ quantity, setQuantity ] = React.useState(Number(defaultQuantity))

    return (

        <div key={Math.random() * props.meal.item} className="order-meal" onClick={() => {

            history.push(`/meal?table=${props.table}&mealIndex=${props.meal.tmp.mealIndex}&menuItemId=${props.meal.tmp.menuItemId}&index=${props.index}`)
        }}>
            <button className="btn-x" onClick={(e) => {
                e.stopPropagation()
                const priceToReduce = props.meal.currPrice * props.meal.quantity
                return props.handleDeleteMeal(props.index, priceToReduce)
            }}>x</button>
            <button className="btn-plus" onClick={(e) => {
                e.stopPropagation()
                setQuantity(quantity + 1)
                props.updateMeal(props.index, {
                    quantity: quantity + 1
                })
                props.updateOrder({
                    total: props.order.total + Number(props.meal.currPrice)
                })
            }}>+</button>
            <button disabled={quantity === 1} className="btn-minus" onClick={(e) => {
                e.stopPropagation()
                setQuantity(quantity - 1)
                props.updateMeal(props.index, {
                    quantity: quantity - 1
                })
                props.updateOrder({
                    total: props.order.total - Number(props.meal.currPrice)
                })

            }}>-</button>
            <p className="meal-title"><span>{props.getCourseName()}</span>{props.meal.item_name}</p>
            <p><span>Količina: {quantity}</span></p>
            <p className="order-price">
                {props.meal.price} <span>kn</span>
                {props.meal.tmp.extrasTotal !== 0 && <span> (</span>}
                {props.meal.tmp.extrasTotal !== 0 && `+${props.meal.tmp.extrasTotal}`}
                {props.meal.tmp.extrasTotal !== 0 && <span> kn dodaci)</span>}
            </p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        extras: state.extras,
        order: state.order
    }
}

export default connect(mapStateToProps, { updateOrder, updateMeal })(OrderMeal)