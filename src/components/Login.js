import React from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/menu'

const Login = (props) => {

    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')

    React.useEffect(() => {
        props.getCategories()
    }, [props])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (user === 'admin') {
            props.history.push(`/home/${user}`)
        }
    }

    return (
        <div>
        <h1>Login page</h1>
        <form onSubmit={handleOnSubmit}>
            <input type="text" placeholder="user: admin" value={user} onChange={(e) => {setUser(e.target.value)}}/>
            <input type="text" placeholder="pass: pass" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
            <button>Submit</button>
        </form>
        </div>
    )
}

export default connect(null, {getCategories})(Login)
