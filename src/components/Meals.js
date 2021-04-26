import React from 'react'
import MealDetails from './MealDetails'
import { connect } from 'react-redux'
import Order from './Order'
import * as QueryString from 'query-string'

const Meals = (props) => {

    const params = QueryString.parse(props.location.search)
    const id = Number(params.id)
    const menuItem = props.menu.find((menuItem) => {return menuItem.id === id})


    const renderMeals = () => {
        return menuItem.meals.map((meal, index) => {
            return (
                <div className="menu-box" onClick={() => { props.history.push(`/meal?table=${params.table}&mealIndex=${index}&menuItemId=${menuItem.id}`)}} key={meal.id}>
                    <p style={{cursor: 'pointer'}}>{meal.name}</p>
                </div>
            )
        })   
    }

    return (
        <div>
        <Order table={params.table}/>
            <button className="button-home button-odjava" onClick={() => { props.history.goBack()}}>Povratak</button>
            <h3 className="meal-name">{menuItem.name}</h3>
            {renderMeals()}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(Meals)