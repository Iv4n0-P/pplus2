import React from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/menu'

const Login = (props) => {

    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        props.getCategories()
    }, [])

    React.useEffect(() => {

        if (props.menu.length === 14 && props.menu[13].meals) {
            setLoading(false)
        }

    }, [props])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (user === 'admin') {
            props.history.push(`/home/${user}`)
        }
    }

    return (
        <div className="login-wrap">
            <h1 className="title">Orders</h1>
            {!loading && <h3 className="subtitle">Unesite korisničko ime i lozinku. <span>Za sve nejasnoće obratite se voditelju.</span></h3>}
            {!loading && <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Korisničko ime" value={user} onChange={(e) => { setUser(e.target.value) }} />
                <input type="text" placeholder="Lozinka" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                <button className="button-login">Prijava</button>
            </form>}
            {loading && <div className="loading-content">
                <h3 className="subtitle">Učitavanje menija...</h3>

                <span class="load">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </span>

            </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps, { getCategories })(Login)
