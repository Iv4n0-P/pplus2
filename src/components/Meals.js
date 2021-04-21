import React from 'react'
import MealDetails from './MealDetails'
import { connect } from 'react-redux'
import Order from './Order'
import * as QueryString from 'query-string'

const Meals = (props) => {

    const params = QueryString.parse(props.location.search)
    const id = Number(params.id)
    const menuItem = props.menu.find((menuItem) => {return menuItem.id === id})

    const [ meal, setMeal ] = React.useState({})

    const getMealDetails = (meal) => {
       setMeal(meal)
    }

    const renderMeals = () => {
        

        return menuItem.meals.map((meal) => {
            return (
                <div onClick={() => {getMealDetails(meal)}} className="meals-box" key={meal.id}>
                    <p style={{cursor: 'pointer'}}>{meal.name}</p>
                </div>
            )
        })   
    }

    return (
        <div>
        <Order table={params.table}/>
            <button className="button-home button-odjava" onClick={() => { props.history.goBack()}}>Povratak u meni</button>
            <h3 className="meal-name">{menuItem.name}</h3>
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