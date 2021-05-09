import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as QueryString from 'query-string'

const Table = (props) => {

    const history = useHistory()
    const params = QueryString.parse(props.location.search)
    const table = params.table
    const user = params.user
    const [orders, setOrders] = React.useState([])
    const [paymentMethods, setPaymentMethods] = React.useState([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(1)
    const [total, setTotal] = React.useState(0)

    const planplus = axios.create({
        baseURL: 'https://pp.doubleclick.hr',
        auth: {
            username: props.user.username,
            password: props.user.password
        }
    })

    React.useEffect(() => {

        const getOrders = async () => {
            
            const { data } = await planplus.get(`/hr/orders/open?table=${table}`)
            setOrders(data.results)
            let result = 0
            data.results.forEach((dataResult) => {
                result = result + Number(dataResult.total)
            })
            setTotal(result)
        }

        const getPaymentMethods = async () => {
            const { data } = await planplus.get('/hr/payment-methods/api/')
            setPaymentMethods(data.results)
        }

        getOrders()
        getPaymentMethods()

    }, [])

    const onValueChange = (id) => {
        setSelectedPaymentMethod(id)
    }

    const handleSendInovice = async () => {
        await planplus.post(`https://pp.doubleclick.hr/hr/orders/invoice?table=${table}&payment_method=${selectedPaymentMethod}`)
        history.push(`/home/${user}`)
    }

    const renderHeader = () => {
        return (
            <div className="payment-methods-wrap">
                

                {paymentMethods.map((method) => {
                    return (
                        <div>
                            <label className="label-table">
                                <input
                                    type="radio"
                                    value={method.id}
                                    checked={selectedPaymentMethod === method.id}
                                    onChange={() => { onValueChange(method.id) }}
                                />
                                <span className="checkmark-table"></span>
                                {method.name}
                            </label>
                        </div>
                    )
                })}
                
            </div>
        )
    }

    const handleViewOrder = (id) => {
        props.history.push(`/details?id=${id}&user=admin`)
    }

    const renderOrders = () => {
        return orders.map((order) => {
            return (
                <div onClick={() => { handleViewOrder(order.id) }} key={order.table} className="otvoreni-stolovi-box">
                    <h6>{order.label}</h6>
                    <p>Ukupno: <span className="ototal">{order.total}</span> kn</p>
                </div>
            )
        })
    }

    return (
        <div>
            <button className="button-home button-odjava margin-bottom" onClick={() => {
                props.history.push(`/home/${props.user.id}`)
            }}>Povratak</button>
            <button className="prebaci-stol margin-bottom" onClick={() => {
                props.history.push(`/tablechange/${table}`)
            }}>{`Prebaci stol ${table}`}</button>
            {renderHeader()}
            <h3 className="table-title">{`Stol ${table}`}</h3>
            <p className="order-total">Ukupno:&nbsp;<span className="ototal">{total} kn</span></p>          
            {orders.length !== 0 ? (
                <div class="d2-table">
                    <div class="d3">
                        <div class="d4">
                            <div class="d5">
                                {renderOrders()}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="margin-topx2">
                    <span class="load">
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                    </span>
                </div>
            )}
            <button className="btn-posalji-table margin-top margin-bottom" onClick={handleSendInovice}>{`Izdaj račun za stol ${table}`}</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(Table)