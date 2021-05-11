import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const TableChange = (props) => {
    const table = props.match.params.table

    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const loginDetailsForSend = {
            "email": user,
            "password": pass
        }

        const planplus = axios.create({
            baseURL: 'https://pp.doubleclick.hr',
            auth: {
                username: props.user.username,
                password: props.user.password
            }
        })

        try {
            const data = await planplus.post('https://pp.doubleclick.hr/hr/users/login/', loginDetailsForSend)
            
          if ('id' in data.data) {
              const data2 = await planplus.put(`https://pp.doubleclick.hr/hr/orders/transfer/?table=${table}&user=${user}&password=${pass}`)
                console.log(data2)
             if (data2.data.success) {
                    setSuccess(true)
                }  
            } 
        } catch {
            setUser('')
            setPass('')
            setError(true)
        }
    }

    const handleOnReturn = () => {
        if (!success) {
            return props.history.goBack()
        } 

        props.history.push(`/home/${props.user.id}`)
    }

    return (
        <div className="login-wrap">
            
            <h3 className="subtitle">Unesite korisničko ime i lozinku konobara na kojeg se prebacuje stol. <span>Za sve nejasnoće obratite se voditelju.</span></h3>
            {!success && <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Korisničko ime" value={user} onChange={(e) => { setUser(e.target.value) }} />
                <input type="text" placeholder="Lozinka" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                {error && <p className="errmsg">Pogrešno korisničko ime ili lozinka</p>}
                <button className="button-login">Prijava</button>
            </form>}
            {success && <p>Stol je uspješno prebačen</p>}
            <button className="button-home button-odjava margin-bottom" onClick={handleOnReturn}>Povratak</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(TableChange)
