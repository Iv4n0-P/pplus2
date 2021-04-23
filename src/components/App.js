import React from 'react'
import Login from './Login'
import Home from './Home'
import Menu from './Menu'
import Meals from './Meals'
import Order from './Order'
import OrderDetails from './OrderDetails'
import Closed from './Closed'
import Table from './Table'
import MealDetails from './MealDetails'
import history from '../history'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
    return (
        <div className="bg">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" component={Login} exact />
                        <Route path="/home/:user" component={Home} />
                        <Route path="/menu/:table" component={Menu} />
                        <Route path="/meals" component={Meals} />
                        <Route path="/order" component={Order} />
                        <Route path="/closed/:user" component={Closed} />
                        <Route path="/details" component={OrderDetails} />
                        <Route path="/meal" component={MealDetails} />
                        <Route path="/table/:table" component={Table} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App