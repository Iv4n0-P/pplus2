import React from 'react'
import MealDetails from './MealDetails'
import { connect } from 'react-redux'
import Order from './Order'

const Meals = (props) => {
    const [ meal, setMeal ] = React.useState({})

    const getMealDetails = (meal) => {
       setMeal(meal)
    }

    const renderMeals = () => {

        return props.meals[props.match.params.id].map((meal) => {
            return (
                <div key={meal.id}>
                    <p style={{cursor: 'pointer'}} onClick={() => {getMealDetails(meal)}}>{meal.name}</p>
                </div>
            )
        })
    }

    return (
        <div>
        <Order />
            <h1>Meals Component</h1>
            {renderMeals()}
            <MealDetails meal={meal}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        meals: state.meals
    }
}

export default connect(mapStateToProps)(Meals)