import React from 'react'
import { connect } from 'react-redux'
import Order from './Order'

const Categories = (props) => {

    const handleOnClick = (id) => {
        props.history.push(`/meals/${id}`)
    }

    const renderCategories = () => {

        return props.categories.map((category) => {
            return (
                <div key={category.id}>
                <p onClick={() => {handleOnClick(category.id)}} style={{cursor: 'pointer'}}>{category.name}</p>
                </div>
            )
        })
    }

    return (
        <div>
        <Order />
            <h3>Odaberi kategoriju</h3>
            {renderCategories()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Categories)