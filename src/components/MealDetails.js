import React from 'react'
import { connect } from 'react-redux'
import { addMeal } from '../actions/orders'
import { useHistory } from 'react-router-dom'

const MealDetails = (props) => {

    const history = useHistory()

    const [mealType, setMealType] = React.useState('')
    const [extras, setExtras] = React.useState([])
    const [minuses, setMinuses] = React.useState([])

    const onValueChange = (e) => {
        setMealType(e.target.value)
    }

    const addExtras = (extra) => {
        setExtras(extras.concat(extra))
    }

    const addMinuses = (extra) => {
        setMinuses(minuses.concat(extra))
    }

    const resetAll = () => {
        props.setMeal({})
        setMealType('')
        setExtras([])
        setMinuses([])
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        
        props.addMeal({
            id: props.meal.id,
            name: props.meal.name,
            price: props.meal.price,
            type: mealType,
            extra: extras,
            minus: minuses,
            sent: false
        }, props.table)

        resetAll()
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
                    <span class="checkmark"></span>
                    Predjelo
                </label>
                <label className="label">
                    <input
                        type="radio"
                        value="glavno"
                        checked={mealType === 'glavno'}
                        onChange={onValueChange}
                    />
                    <span class="checkmark"></span>
                    Glavno jelo
                </label>
                <label className="label">
                    <input
                        type="radio"
                        value="desert"
                        checked={mealType === 'desert'}
                        onChange={onValueChange}
                    />
                    <span class="checkmark"></span>
                    Desert
                </label>

                <h5>Extras</h5>
                <ul>
                    <li data-id="Pomfrit" className="extra" onClick={(e) => { addExtras(e.currentTarget.dataset.id) }}>Pomfrit</li>
                    <li data-id="Kajmak" className="extra" onClick={(e) => { addExtras(e.currentTarget.dataset.id) }}>Kajmak</li>
                    <li data-id="Majoneza" className="extra" onClick={(e) => { addExtras(e.currentTarget.dataset.id) }}>Majoneza</li>
                    <li data-id="Ketchup" className="extra" onClick={(e) => { addExtras(e.currentTarget.dataset.id) }}>Ketchup</li>
                    <li data-id="Kapula" className="extra" onClick={(e) => { addExtras(e.currentTarget.dataset.id) }}>Kapula</li>
                    <li data-id="Ajvar" className="extra" onClick={(e) => { addExtras(e.currentTarget.dataset.id) }}>Ajvar</li>
                </ul>

                <div className="meal-summary">
                <h5>Status</h5>
                <p>Naziv jela: <span>{props.meal.name}</span></p>
                <p>Tip jela: <span>{mealType}</span></p>
                <p>Extras: <span>{extras.toString()}</span></p>
                <p>Cijena: <span>{props.meal.price}</span></p>
                <button className="btn-posalji margin-top">Dodaj u narudžbu</button>
                </div>
                
            </form>
            <button className="btn-odustani" onClick={resetAll}>Odustani od jela</button>
        </div>
    )
}

export default connect(null, { addMeal })(MealDetails)