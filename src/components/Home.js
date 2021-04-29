import React from 'react'
import { connect } from 'react-redux'
import planplus from '../apis/planplus'
import { startUpdateOrder } from '../actions/order'

const Home = (props) => {

    const user = props.match.params.user

    const [selectedTable, setSelectedTable] = React.useState('1')
    const [tables, setTables] = React.useState([])

    React.useEffect(() => {

        const getTables = async () => {
            const { data } = await planplus.get('https://pp.doubleclick.hr/hr/orders/tables/')
            setTables(data.results)
            console.log(data.results)
        }
        getTables()
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
                <div key={table.table} className="otvoreni-stolovi-box" onClick={() => { props.history.push(`/table/${table.table}`) }}>
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
                <div class="d2-home">
                    <div class="d3">
                        <div class="d4">
                            <div class="d5">
                                {renderOrders()}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="closed-link" onClick={() => { props.history.push(`/closed/${user}`) }}>Zatvorene narudžbe &rarr;</p>
            </div>
        </div>
    )
}

export default connect(null, { startUpdateOrder })(Home)