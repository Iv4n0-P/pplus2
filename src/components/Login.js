import React from 'react'
import { connect } from 'react-redux'
import { updateOrder, getMealCategories } from '../actions'

const Login = (props) => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    React.useEffect(() => {
        props.getMealCategories()
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (username === 'admin') {
            props.updateOrder({user: username})
            props.history.push('/home')
        }
    }

    return (
        <div>
        <h1>Login page</h1>
        <form onSubmit={handleOnSubmit}>
            <input type="text" placeholder="username: admin" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <input type="text" placeholder="password: pass" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <button>Submit</button>
        </form>
        </div>
    )
}

export default connect(null, {updateOrder, getMealCategories})(Login)
