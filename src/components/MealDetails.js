import React from 'react'
import { connect } from 'react-redux'
import { addMeal } from '../actions'
import { useHistory } from 'react-router-dom'

const MealDetails = (props) => {

    const history = useHistory()

    const [ mealType, setMealType ] = React.useState('') 
    const [ extras, setExtras ] = React.useState([])
    const [ minusExtras, setMinusExtras ] = React.useState([])

    const onValueChange = (e) => {
        setMealType(e.target.value)
    }

    const addExtras = (extra) => {
        setExtras(extras.concat(extra))
    }

    const addMinusExtra = (extra) => {
        setMinusExtras(minusExtras.concat(extra))
    }

    const resetAll = () => {
        setMealType('')
        setExtras([])
        setMinusExtras([])
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        
        props.addMeal({
            id: props.meal.id,
            name: props.meal.name,
            price: props.meal.price,
            type: mealType,
            extras: extras,
            minus: minusExtras
        })

        resetAll()
        history.push('/categories')
    }

    return (
        <div>
            <h3>{props.meal.name}</h3>
            <img src={props.meal.image} alt={props.meal.name}/>
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
                    <li data-id="Pomfrit" onClick={(e) => {addExtras(e.currentTarget.dataset.id)}}>Pomfrit</li>
                    <li data-id="Kajmak" onClick={(e) => {addExtras(e.currentTarget.dataset.id)}}>Kajmak</li>
                    <li data-id="Majoneza" onClick={(e) => {addExtras(e.currentTarget.dataset.id)}}>Majoneza</li>
                    <li data-id="Ketchup" onClick={(e) => {addExtras(e.currentTarget.dataset.id)}}>Ketchup</li>
                    <li data-id="Kapula" onClick={(e) => {addExtras(e.currentTarget.dataset.id)}}>Kapula</li>
                    <li data-id="Ajvar" onClick={(e) => {addExtras(e.currentTarget.dataset.id)}}>Ajvar</li>
                </ul>

                <h5>Oduzmi</h5>
                <ul>
                    <li data-id="Sir" onClick={(e) => {addMinusExtra(e.currentTarget.dataset.id)}}>Sir</li>
                    <li data-id="Šunka" onClick={(e) => {addMinusExtra(e.currentTarget.dataset.id)}}>Šunka</li>
                    <li data-id="Gljive" onClick={(e) => {addMinusExtra(e.currentTarget.dataset.id)}}>Gljive</li>
                    <li data-id="Origano" onClick={(e) => {addMinusExtra(e.currentTarget.dataset.id)}}>Origano</li>
                    <li data-id="Pomodora" onClick={(e) => {addMinusExtra(e.currentTarget.dataset.id)}}>Pomodora</li>
                    <li data-id="Panceta" onClick={(e) => {addMinusExtra(e.currentTarget.dataset.id)}}>Panceta</li>
                </ul>

                <h5>Status</h5>
                <p>Naziv jela: {props.meal.name}</p>
                <p>Tip jela: {mealType}</p>
               <p>Extras: {extras.toString()}</p>
               <p>Minus: {minusExtras.toString()}</p>
               <p>Cijena: {props.meal.price}</p>
            
               <p onClick={resetAll}>Resetiraj postavke</p>
            <button>Dodaj u narudžbu</button>
            </form>
        </div>
    )
}

export default connect(null,{addMeal})(MealDetails)