import React from 'react'
import { connect } from 'react-redux'
import Order from './Order'

const Menu = (props) => {

    const handleOnClick = (id) => {
        props.history.push(`/meals?id=${id}&table=${props.match.params.table}`)
    }

    const renderCategories = () => {
        
        return props.menu.map((menuItem) => {
            return (
                <div key={menuItem.id}>
                <p onClick={() => {handleOnClick(menuItem.id)}} style={{cursor: 'pointer'}}>{menuItem.name}</p>
                </div>
            )
        })
    }

    return (
        <div>
        <Order table={props.match.params.table}/>
            <h3>Odaberi kategoriju</h3>
            {renderCategories()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(Menu)