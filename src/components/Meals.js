import React from 'react'
import MealDetails from './MealDetails'
import { connect } from 'react-redux'
import Order from './Order'
import * as QueryString from 'query-string'

const Meals = (props) => {

    const params = QueryString.parse(props.location.search)

    const [ meal, setMeal ] = React.useState({})

    const getMealDetails = (meal) => {
       setMeal(meal)
    }

    const renderMeals = () => {

        return props.menu[params.id].meals.map((meal) => {
            return (
                <div key={meal.id}>
                    <p style={{cursor: 'pointer'}} onClick={() => {getMealDetails(meal)}}>{meal.name}</p>
                </div>
            )
        })
    }

    return (
        <div>
        <Order table={params.table}/>
            <h1>Meals Component</h1>
            {renderMeals()}
            {Object.keys(meal).length !== 0 && <MealDetails setMeal={setMeal} table={params.table} meal={meal}/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(Meals)