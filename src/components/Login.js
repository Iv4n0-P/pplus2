import React from 'react'
import axios from 'axios'
import { updateUser } from '../actions/user'
import { connect } from 'react-redux'

const Login = (props) => {

    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        
        const loginDetailsForSend = {
            "email": user,
            "password": pass
        }
        const planplus = axios.create({
            baseURL: 'https://pp.doubleclick.hr',
            auth: {
                username: user,
                password: pass
            }
        })

        try {
            const data = await planplus.post('/hr/users/login/', loginDetailsForSend)
            if ('id' in data.data) {
                props.updateUser({
                    id: data.data.id,
                    username: user,
                    password: pass, 
                    first_name: data.data.first_name,
                    last_name: data.data.last_name
                })
                props.history.push(`/loading/${data.data.id}`)
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
            <h3 className="subtitle">Unesite korisničko ime i lozinku. <span>Za sve nejasnoće obratite se voditelju.</span></h3>
           <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Korisničko ime" value={user} onChange={(e) => { setUser(e.target.value) }} />
                <input type="text" placeholder="Lozinka" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                {error && <p className="errmsg">Pogrešno korisničko ime ili lozinka</p>}
                <button className="button-login">Prijava</button>
            </form>
        </div>
    )
}

export default connect(null, { updateUser })(Login)
