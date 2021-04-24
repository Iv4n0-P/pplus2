import React from 'react'
import { connect } from 'react-redux'
import { addMeal } from '../actions/order'
import { useHistory } from 'react-router-dom'
import * as QueryString from 'query-string'

const MealDetails = (props) => {

    const history = useHistory()

    const [mealType, setMealType] = React.useState('')
    const [extras, setExtras] = React.useState([])
    const [quantity, setQuantity] = React.useState(1)
    const [mealTotalPrice, setMealTotalPrice] = React.useState(props.meal.price)
    const [note, setNote] = React.useState('')

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

        const total = mealTotalPrice * quantity
        const price = extraToDelete.price * quantity
        const finalPrice = total - price
        setMealTotalPrice(finalPrice / quantity)
    } 

    const onFormSubmit = (e) => {
        e.preventDefault()
        
        const getCourseNum = () => {
            if (mealType === 'predjelo') {return 1}    
            if (mealType === 'glavno') {return 2}
            if (mealType === 'desert') {return 3}
        }

        props.addMeal({
            item: props.meal.id,
            item_name: props.meal.name,
            price: mealTotalPrice * quantity,
            course: getCourseNum(),
            extras: extras.map((extra) => {return extra.id}),
            quantity,
            note
        }, props.table)

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

                    <p>Dodaci: <span>{extras.map((extra) => {
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
                    <h5><span className="price-span">{mealTotalPrice * quantity}</span> <span>kn</span></h5>
                    <div className="kolicina-wrap">
                        <div className="kolicina-col1">
                            <p>Količina: <span>{quantity}</span></p>
                        </div>
                        <div className="kolicina-col2">
                            <p onClick={() => {
                                setQuantity(quantity + 1)

                            }}>+</p>
                            <p onClick={() => {
                                if (quantity !== 1) { return setQuantity(quantity - 1) }
                                setQuantity(quantity)

                            }}>-</p>
                        </div>
                    </div>

                </div>

                <textarea className="textarea" placeholder="Unesite poruku (opcionalno)" value={note} onChange={(e) => {setNote(e.target.value)}}></textarea>


                <button className="btn-posalji margin-top margin-bottom">Dodaj u narudžbu</button>
            </form>
            <button className="btn-odustani" onClick={resetAll}>Odustani od jela</button>
        </div>
    )
}



const mapStateToProps = (state, ownProps) => {
    const params = QueryString.parse(ownProps.location.search)
    const menuItemOfMeal = state.menu.find((menuItem) => { return menuItem.id === Number(params.menuItemId) })
    const meal = menuItemOfMeal.meals[Number(params.mealIndex)]
    return {
        extras: state.extras,
        meal
    }
}

export default connect(mapStateToProps, { addMeal })(MealDetails)