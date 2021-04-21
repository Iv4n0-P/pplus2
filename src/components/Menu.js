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
                <div className="menu-box" key={menuItem.id} onClick={() => {handleOnClick(menuItem.id)}}>
                <p>{menuItem.name}</p>
                </div>
            )
        })
    }

    return (
        <div className="menu-wrap">
        <Order table={props.match.params.table}/>
        <h3 className="subtitle">Odaberi kategoriju</h3>
           <div className="menu-items-wrap">
           {renderCategories()}
           </div> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(Menu)