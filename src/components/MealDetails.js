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
        if (course === 1) { return 'predjelo' }
        if (course === 2) { return 'glavno' }
        if (course === 3) { return 'desert' }
    }

    let extrasToEdit = []

    if (mealToEdit) {
        mealToEdit.extras.forEach((extraId) => {
            let tempExtrasArray = props.extras.filter((propsextra) => { return propsextra.id === extraId })
            extrasToEdit = [...extrasToEdit, ...tempExtrasArray]
        })
    }

    const [mealType, setMealType] = React.useState(getCourseName(mealToEdit ? mealToEdit.course : 1))
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

        setExtras(extras.filter((extra, i) => {
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
            if (mealType === 'predjelo') { return 1 }
            if (mealType === 'glavno') { return 2 }
            if (mealType === 'desert') { return 3 }
        }

        if (!mealToEdit) {
            props.addMeal({
                item: props.meal.id,
                item_name: props.meal.name,
                currPrice: Number(mealTotalPrice),
                price: props.meal.price,
                course: getCourseNum(),
                extras: extras.map((extra) => { return extra.id }),
                note,
                quantity: 1,
                tmp: {
                    mealIndex: params.mealIndex,
                    menuItemId: params.menuItemId,
                    extrasTotal: mealToEdit ? mealTotalPrice - mealToEdit.price : mealTotalPrice - props.meal.price
                }
            }, props.table)
        } else if (mealToEdit) {
            const oldTotalPrice = Number(mealToEdit.currPrice)
            const newTotalPrice = Number(mealTotalPrice)
            const totalMinusOldTotalPrice = props.order.total - (oldTotalPrice * mealToEdit.quantity)
            const newTotalPriceTimesQuantity = newTotalPrice * mealToEdit.quantity
            const extrasForUpdate = extras.map((extra) => {
                return extra.id
            })

            props.updateOrder({
                total: totalMinusOldTotalPrice + newTotalPriceTimesQuantity
            })

            props.updateMeal(params.index, {
                currPrice: Number(mealTotalPrice),
                course: getCourseNum(),
                extras: extrasForUpdate,
                note,
                tmp: {
                    mealIndex: params.mealIndex,
                    menuItemId: params.menuItemId,
                    extrasTotal: mealToEdit ? mealTotalPrice - mealToEdit.price : mealTotalPrice - props.meal.price
                },
                quantity: mealToEdit.quantity
            })
        }



        history.push(`/menu/${props.table}`)
    }

    return (
        <div className="meal-wrap">
        
            <h3 className="meal-title">{props.meal.name}</h3>
            <h5><span>Osnovna cijena: </span>{props.meal.price} kn</h5>

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

                <h5 className="margin-bottom">Extras</h5>

                <div>
                    {props.extras.map((extra) => {
                        const addedExtraIds = extras.map((extra) => extra.id) || []
                        const testResult = addedExtraIds.find((id) => id === extra.id)
                        return (
                            <div>
                                <label class="containerExtras">
                                    <span>
                                        {`${extra.name}(`}
                                    </span>
                                    <span className={Number(extra.price) !== 0 ? 'extra-price-span' : null}>
                                        {`+${extra.price}`}
                                    </span>
                                    <span>{' kn)'}</span>
                                    <input type="checkbox" checked={testResult} onChange={() => {
                                        if (!testResult) {
                                            addExtras(extra)
                                            const currPrice = Number(mealTotalPrice) + Number(extra.price)
                                            setMealTotalPrice(currPrice)
                                        } else {
                                            handleDeleteExtra(extra.id)
                                        }
                                    }} />
                                    <span class="checkmarkExtra"></span>
                                </label>
                            </div>
                        )
                    })}
                </div>


                <div className="meal-summary">
                    <h5>Cijena sa dodacima: <span className="price-span">{mealTotalPrice}</span> <span>kn</span></h5>
                </div>

                <textarea className="textarea" placeholder="Unesite poruku (opcionalno)" value={note} onChange={(e) => { setNote(e.target.value) }}></textarea>

                
                 <button className="btn-posalji margin-top margin-bottom">{mealToEdit ? 'Sačuvaj jelo' : 'Dodaj u narudžbu'}</button>
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