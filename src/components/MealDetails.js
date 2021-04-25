import React from 'react'
import { connect } from 'react-redux'
import { addMeal, updateMeal, updateOrder } from '../actions/order'
import { useHistory } from 'react-router-dom'
import * as QueryString from 'query-string'

const MealDetails = (props) => {
    const params = QueryString.parse(props.location.search)
   

    const history = useHistory()

    const mealToEdit = props.order.orderitem_set.find((meal, i) => {
        return i === Number(params.index)
    })

    const getCourseName = (course) => {
        if (course === 1) {return 'predjelo'}
        if (course === 2) {return 'glavno'}
        if (course === 3) {return 'desert'}
    }

    let extrasToEdit = []

    if (mealToEdit) {
        mealToEdit.extras.forEach((extraId) => {
            let tempExtrasArray = props.extras.filter((propsextra) => {return propsextra.id === extraId})
            extrasToEdit = [...extrasToEdit, ...tempExtrasArray]
        })
    }  

    const [mealType, setMealType] = React.useState(getCourseName(mealToEdit ? mealToEdit.course : ''))
    const [extras, setExtras] = React.useState(mealToEdit ? extrasToEdit : [])
    const [mealTotalPrice, setMealTotalPrice] = React.useState(mealToEdit ? mealToEdit.currPrice : props.meal.price)
    const [note, setNote] = React.useState(mealToEdit ? mealToEdit.note : '')

    const onValueChange = (e) => {
        setMealType(e.target.value)
    }

    const addExtras = (extra) => {
        setExtras(extras.concat(extra))
    }

    const resetAll = () => {
        history.goBack()
    }

    const handleDeleteExtra = (id) => {
        const indexOfExtraToDelete = extras.findIndex((extra) => extra.id === id)
        const extraToDelete = extras.find((extra) => extra.id === id)
        
        setExtras(extras.filter((extra,i) => {
            return i !== indexOfExtraToDelete
        }))

        const total = mealTotalPrice
        const price = extraToDelete.price
        const finalPrice = total - price
        setMealTotalPrice(finalPrice)
    } 

    const onFormSubmit = (e) => {
        e.preventDefault()
        
        const getCourseNum = () => {
            if (mealType === 'predjelo') {return 1}    
            if (mealType === 'glavno') {return 2}
            if (mealType === 'desert') {return 3}
        }

        if (!mealToEdit) {
            props.addMeal({
                item: props.meal.id,
                item_name: props.meal.name,
                currPrice: Number(mealTotalPrice),
                price: props.meal.price,
                course: getCourseNum(),
                extras: extras.map((extra) => {return extra.id}),
                quantity: 1,
                note,
                tmp: {
                    mealIndex: params.mealIndex,
                    menuItemId: params.menuItemId
                }
            }, props.table)
        } else if (mealToEdit) {
            const oldTotalPrice = Number(mealToEdit.currPrice)
            const newTotalPrice = Number(mealTotalPrice)
            props.updateOrder({
                total: (props.order.total - oldTotalPrice * mealToEdit.quantity) + newTotalPrice * mealToEdit.quantity
            })

            props.updateMeal(params.index, {
            currPrice: Number(mealTotalPrice),
            course: getCourseNum(),
            extras: extras.map((extra) => {return extra.id}),
            note,
            tmp: {
                mealIndex: params.mealIndex,
                menuItemId: params.menuItemId
            }
        })
        }
        
         

        history.push(`/menu/${props.table}`)
    }

    return (
        <div className="meal-wrap">
            <h3 className="meal-title">{props.meal.name}</h3>
            <h5>{props.meal.price} kn</h5>

            <form onSubmit={onFormSubmit}>
                <label className="label">
                    <input
                        type="radio"
                        value="predjelo"
                        checked={mealType === 'predjelo'}
                        onChange={onValueChange}
                    />
                    <span className="checkmark"></span>
                    Predjelo
                </label>
                <label className="label">
                    <input
                        type="radio"
                        value="glavno"
                        checked={mealType === 'glavno'}
                        onChange={onValueChange}
                    />
                    <span className="checkmark"></span>
                    Glavno jelo
                </label>
                <label className="label">
                    <input
                        type="radio"
                        value="desert"
                        checked={mealType === 'desert'}
                        onChange={onValueChange}
                    />
                    <span className="checkmark"></span>
                    Desert
                </label>

                <h5>Extras</h5>
                <div className="extras">
                    {props.extras.map((extra) => {
                        return <p key={extra.id} onClick={() => {
                            addExtras(extra)
                            const currPrice = Number(mealTotalPrice) + Number(extra.price)
                            setMealTotalPrice(currPrice)
                        }} className="extra-btn">{extra.name}</p>
                    })}
                </div>
              <div className="meal-summary">

                    <p><span>{extras.map((extra) => {
                        return  (
                            <div>
                            <p>
                            <span>
                            {`${extra.name}(`}
                            </span>
                            <span className={Number(extra.price) !== 0 ? 'extra-price-span' : null}>
                            {`+${extra.price}`}
                            </span>
                            <span>{')'}</span>
                            <span onClick={() => {handleDeleteExtra(extra.id)}} className="x">&times;</span>
                            </p>
                            
                            </div>
                        )
                    })}</span></p>
                    <h5><span className="price-span">{mealTotalPrice}</span> <span>kn</span></h5>
                </div>

                <textarea className="textarea" placeholder="Unesite poruku (opcionalno)" value={note} onChange={(e) => {setNote(e.target.value)}}></textarea>


                <button className="btn-posalji margin-top margin-bottom">{mealToEdit ? 'Sačuvaj izmjene' : 'Dodaj u narudžbu'}</button>
            </form>
            <button className="btn-odustani" onClick={resetAll}>Odustani</button>
        </div>
    )
}



const mapStateToProps = (state, ownProps) => {
    const params = QueryString.parse(ownProps.location.search)
    const menuItemOfMeal = state.menu.find((menuItem) => { return menuItem.id === Number(params.menuItemId) })
    const meal = menuItemOfMeal.meals[Number(params.mealIndex)]
    return {
        extras: state.extras,
        meal,
        order: state.order
    }
}

export default connect(mapStateToProps, { updateMeal, addMeal, updateOrder })(MealDetails)