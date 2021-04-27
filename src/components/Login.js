import React from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/menu'
import { setExtras } from '../actions/extras'
import planplus from '../apis/planplus'

const Login = (props) => {

    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        props.getCategories()
        props.setExtras()
    }, [])

    React.useEffect(() => {

        if (props.menu.length === 14 && props.menu[13].meals) {
            setLoading(false)
        }

    }, [props])

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        
        const loginDetailsForSend = {
            "email": user,
            "password": pass
        }

        try {
            const data = await planplus.post('https://pp.doubleclick.hr/hr/users/login/', loginDetailsForSend)
            if ('id' in data.data) {
                props.history.push(`/home/${data.data.id}`)
            }
        } catch {
            setUser('')
            setPass('')
            setError(true)
        }        
    }

    return (
        <div className="login-wrap">
            <h1 className="title">Orders</h1>
            {!loading && <h3 className="subtitle">Unesite korisničko ime i lozinku. <span>Za sve nejasnoće obratite se voditelju.</span></h3>}
            {!loading && <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Korisničko ime" value={user} onChange={(e) => { setUser(e.target.value) }} />
                <input type="text" placeholder="Lozinka" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                {error && <p className="errmsg">Pogrešno korisničko ime ili lozinka</p>}
                <button className="button-login">Prijava</button>
            </form>}
            {loading && <div className="loading-content">
                <h3 className="subtitle">Dohvaćanje i učitavanje menija...</h3>

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

export default connect(mapStateToProps, { getCategories, setExtras })(Login)
