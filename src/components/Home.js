import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { startUpdateOrder } from '../actions/order'

const Home = (props) => {

    const user = props.match.params.user

    const [selectedTable, setSelectedTable] = React.useState('1')
    const [tables, setTables] = React.useState([])

    const planplus = axios.create({
        baseURL: 'https://pp.doubleclick.hr',
        auth: {
            username: props.user.username,
            password: props.user.password
        }
    })

    React.useEffect(() => {
        const getTables = async () => {
            const { data } = await planplus.get('https://pp.doubleclick.hr/hr/orders/tables/')
            setTables(data.results)
        }
        
        const timer = setInterval(() => {
            getTables()
        }, 3000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const onInputChange = (value) => {
        setSelectedTable(value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.startUpdateOrder(props.history, { user, table: selectedTable, orderitem_set: [], total: 0 })
    }

    const handleViewOrder = async (id) => {
        props.history.push(`/details?id=${id}&user=${user}`)
    }

    const renderOrders = () => {

        return tables.map((table) => {
            return (
                <div key={table.table} className="otvoreni-stolovi-box" onClick={() => { props.history.push(`/table?table=${table.table}&user=${user}`) }}>
                    <h6 className="table">Stol {table.table} &rsaquo;</h6>
                </div>
            )
        })
    }

    return (
        <div className="home-wrap">
            <button className="button-home button-odjava margin-bottom" onClick={() => { props.history.push('/') }}>Odjava</button>

            <h3 className="subtitle">Upiši stol</h3>
            <form onSubmit={handleOnSubmit}>
                <input className="home-input" type="text" value={selectedTable} onChange={(e) => { onInputChange(e.target.value) }} />
                <button className="button-home">Kreiraj novu narudžbu</button>
            </form>
            <div className="otvoreni-stolovi">
                {tables.length !== 0 ? (
                    <div>
                        <h3 className="subtitle">Stolovi sa otvorenim narudžbama</h3>
                    </div>
                ) : (
                    <div>
                        <h3 className="subtitle margin-bottom">Dohvaćanje otvorenih stolova...</h3>
                        <span class="load">
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                        </span>
                    </div>
                )}
                <div className="d2-home">
                    <div className="d3">
                        <div className="d4">
                            <div className="d5">
                                {renderOrders()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { startUpdateOrder })(Home)