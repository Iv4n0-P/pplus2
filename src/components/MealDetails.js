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
        <div>
            <h3>{props.meal.name}</h3>
            <h5>{props.meal.price}</h5>

            <form onSubmit={onFormSubmit}>
                <label>
                    <input
                        type="radio"
                        value="predjelo"
                        checked={mealType === 'predjelo'}
                        onChange={onValueChange}
                    />
                    Predjelo
                </label>
                <label>
                    <input
                        type="radio"
                        value="glavno"
                        checked={mealType === 'glavno'}
                        onChange={onValueChange}
                    />
                    Glavno jelo
                </label>
                <label>
                    <input
                        type="radio"
                        value="desert"
                        checked={mealType === 'desert'}
                        onChange={onValueChange}
                    />
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

                <h5>Oduzmi</h5>
                <ul>
                    <li data-id="Sir" className="extra" onClick={(e) => { addMinuses(e.currentTarget.dataset.id) }}>Sir</li>
                    <li data-id="Šunka" className="extra" onClick={(e) => { addMinuses(e.currentTarget.dataset.id) }}>Šunka</li>
                    <li data-id="Gljive" className="extra" onClick={(e) => { addMinuses(e.currentTarget.dataset.id) }}>Gljive</li>
                    <li data-id="Origano" className="extra" onClick={(e) => { addMinuses(e.currentTarget.dataset.id) }}>Origano</li>
                    <li data-id="Pomodora" className="extra" onClick={(e) => { addMinuses(e.currentTarget.dataset.id) }}>Pomodora</li>
                    <li data-id="Panceta" className="extra" onClick={(e) => { addMinuses(e.currentTarget.dataset.id) }}>Panceta</li>
                </ul>

                <h5>Status</h5>
                <p>Naziv jela: {props.meal.name}</p>
                <p>Tip jela: {mealType}</p>
                <p>Extras: {extras.toString()}</p>
                <p>Minus: {minuses.toString()}</p>
                <p>Cijena: {props.meal.price}</p>
                <button>Dodaj u narudžbu</button>
            </form>
            <button onClick={resetAll}>Odustani od jela</button>
        </div>
    )
}

export default connect(null, { addMeal })(MealDetails)