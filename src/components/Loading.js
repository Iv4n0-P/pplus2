import React from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/menu'
import { setExtras } from '../actions/extras'

const Loading = (props) => {
    const user = props.match.params.user
    
    React.useEffect(() => {
        props.getCategories()
        props.setExtras()
    }, [])

    React.useEffect(() => {
        if (props.menu.length >= 14 && props.menu[13].meals) {
            props.history.push(`/home/${user}`)
        }

    }, [props])

    return (
        <div className="login-wrap">
        <h1 className="title">Orders</h1>
        <div className="loading-content">
        <h3 className="subtitle">Dohvaćanje i učitavanje menija...</h3>

        <span class="load">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
        </span>

    </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps, { getCategories, setExtras })(Loading)