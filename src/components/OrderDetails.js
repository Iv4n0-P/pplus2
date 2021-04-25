import React from 'react'
import planplus from '../apis/planplus'
import * as QueryString from 'query-string'
import { connect } from 'react-redux'

const OrderDetails = (props) => {
    const params = QueryString.parse(props.location.search)
    const id = Number(params.id)
    const user = params.user
    const [ order, setOrder ] = React.useState({})

    const getCourseName = (course) => {
        if (course === 1) {return 'Predjelo'}
        if (course === 2) {return 'Glavno jelo'}
        if (course === 3) {return 'Desert'}
    }

    React.useEffect(() => {
        const getOrder = async () => {
            const data = await planplus.get(`https://pp.doubleclick.hr/hr/orders/api/${id}`)             
            setOrder(data.data)
        }
        getOrder()
    }, [])

    const finishOrder = (id) => {
        console.log(`Upucuje ID apiju`)
    }

    const renderOrderDetails = () => {
        const year = order.issue_date.slice(0, 4)
        const month = order.issue_date.slice(5, 7)
        const day = order.issue_date.slice(8, 10)
        const time = order.issue_date.slice(11, 16)
        return (
            <div>
            
            <h3 className="details-subtitle"><span>Narudžba:</span> {order.label}</h3>
            <p>ID: <span>{order.id}</span></p>
            <p>Konobar: <span>admin</span></p>
            <p>Stol: <span>{order.table}</span></p>
            <p>Datum: <span>{`${day}.${month}.${year}.`}</span></p>
            <p>Vrijeme: <span>{time} h</span></p>
            <p>Način plaćanja: <span>{order.payment_method ? order.payment_method : 'Nije navedeno'}</span></p>
            {order.orderitem_set && order.orderitem_set.map((meal, index) => {
                
                return (
                    <div key={Math.random() * meal.id} className="details-meal">
                        <p className="meal-title">{meal.item_name} <span className="meal-type">- {getCourseName(meal.course)}</span></p>
                        <p><span>Količina: {Math.floor(meal.quantity)}</span></p>
                        <p className="details-price">{meal.price} kn</p>
                        {meal.extras.length !== 0 && <p><span className="tmp-extras">{meal.extras.map((extra) => {
                            const extraFromState = props.extras.find((extraState) => {return extraState.id === extra})
                            return <p>
                            <span>
                            {`- ${extraFromState.name} (`}
                            </span>
                            <span className={Number(extraFromState.price) !== 0 ? 'extra-price-span' : null}>
                            {`+${extraFromState.price}`}
                            </span>
                            <span>{' kn)'}</span>
                            </p>
                        })}</span></p>}
                        {meal.note && <p>Napomena:<span> {meal.note}</span></p>}
                    </div>
                )
            })}
            {order.note && <p>Napomena: <span>{order.note}</span></p>}
            <div className="order-controls">
                <button className="btn-odustani" onClick={() => {
                    props.history.push(`/home/${user}`)
                }}>Povratak</button>
                <button className="btn-posalji" onClick={() => {finishOrder(order.id)}}>Izdaj račun</button>
            </div>
            <p className="details-total">Ukupno:&nbsp;<span>{order.total} kn</span></p>
            </div>
        )
    }


    return (
        <div className="details-wrap">

        {Object.keys(order).length !== 0 ? renderOrderDetails() : (
            <div>
            <h3 className="subtitle margin-bottom">Učitavanje narudžbe...</h3>
            <span class="load">
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

const mapStateToProps = (state) => {
    return {
        extras: state.extras
    }
}

export default connect(mapStateToProps)(OrderDetails)