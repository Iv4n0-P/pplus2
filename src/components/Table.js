import React from 'react'
import planplus from '../apis/planplus'
import { useHistory } from 'react-router-dom'

const Table = (props) => {

    const history = useHistory()

    const table = props.match.params.table
    const [orders, setOrders] = React.useState([])
    const [paymentMethods, setPaymentMethods] = React.useState([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(1)

    React.useEffect(() => {

        const getOrders = async () => {
            const { data } = await planplus.get(`https://pp.doubleclick.hr/hr/orders/open?table=${table}`)
            setOrders(data.results)
        }

        const getPaymentMethods = async () => {
            const { data } = await planplus.get('https://pp.doubleclick.hr/hr/payment-methods/api/')
            console.log(data.results)
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
        history.goBack()
    }

    const renderHeader = () => {
        return (
            <div className="payment-methods-wrap">
                <h3 className="subtitle margin-bottom">Odaberi način plaćanja</h3>
                
                {paymentMethods.map((method) => {
                    return (
                        <div>
                            <label className="label-table">
                                <input
                                    type="radio"
                                    value={method.id}
                                    checked={selectedPaymentMethod === method.id}
                                    onChange={() => {onValueChange(method.id)}}
                                />
                                <span className="checkmark-table"></span>
                        {method.name}
                    </label>
                        </div>
                    )
                })}
                <button className="btn-posalji-table margin-top margin-bottom" onClick={handleSendInovice}>{`Izdaj račun za stol ${table}`}</button>
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
                        <p>Ukupno: {order.total} kn</p>
                </div>
            )
        })
    }

    return (
        <div>
            <button className="button-home button-odjava margin-bottom" onClick={() => {
                props.history.goBack()
            }}>Povratak</button>
            {renderHeader()}
            <h3 className="margin-bottom table-title">{`Stol ${table}`}</h3>
            {orders.length !== 0 ? renderOrders() : (
                <div>
                    <span class="load margin-top">
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                    </span>
                </div>
            )}
        </div>
    )
}

export default Table