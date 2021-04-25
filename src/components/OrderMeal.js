import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateOrder, updateMeal } from '../actions/order'

const OrderMeal = (props) => {

    const history = useHistory()

    const [ quantity, setQuantity ] = React.useState(props.meal.quantity ? props.meal.quantity : 1)

    React.useEffect(() => {
        props.updateMeal(props.index, {
            quantity
        })
    }, [quantity])

    return (
        
                <div key={Math.random() * props.meal.item} className="order-meal" onClick={() => {
                        
                    history.push(`/meal?table=${props.table}&mealIndex=${props.meal.tmp.mealIndex}&menuItemId=${props.meal.tmp.menuItemId}&index=${props.index}`)
                }}>
                    <button className="btn-x" onClick={(e) => {
                        e.stopPropagation()
                        return props.handleDeleteMeal(props.index, props.meal.price)}}>x</button>
                    <button className="btn-plus" onClick={(e) => {
                        e.stopPropagation()    
                        setQuantity(quantity + 1)                        
                        props.updateOrder({
                            total: props.order.total + Number(props.meal.currPrice)
                        })
                    }}>&#43;</button>
                    <p className="meal-title"><span>{props.getCourseName()}</span>{props.meal.item_name}</p>
                    <p><span>Količina: {quantity}</span></p>
                    <p className="order-price">{props.meal.price} <span>kn</span></p>
                    <p><span className="tmp-extras">{props.meal.extras.map((id) => {
                        const extraFromState = props.extras.find((extraState) => {return extraState.id === id})
                        return (
                            <div>
                            <span>
                            {`${extraFromState.name}(`}
                            </span>
                            <span className={Number(extraFromState.price) !== 0 ? 'extra-price-span' : null}>
                            {`+${extraFromState.price}`}
                            </span>
                            <span>{')'}</span>
                            </div>
                        )
                    })}</span></p>
                    <p><span>Napomena: {props.meal.note}</span></p>
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