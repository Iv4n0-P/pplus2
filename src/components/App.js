import React from 'react'
import Login from './Login'
import Home from './Home'
import Menu from './Menu'
import Meals from './Meals'
import Order from './Order'
import OrderDetails from './OrderDetails'
import Table from './Table'
import Loading from './Loading'
import MealDetails from './MealDetails'
import TableChange from './TableChange'
import history from '../history'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
    return (
        <div className="bg">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" component={Login} exact />
                        <Route path="/loading/:user" component={Loading} />
                        <Route path="/tablechange/:table" component={TableChange} />
                        <Route path="/home/:user" component={Home} />
                        <Route path="/menu/:table" component={Menu} />
                        <Route path="/meals" component={Meals} />
                        <Route path="/order" component={Order} />
                        <Route path="/details" component={OrderDetails} />
                        <Route path="/meal" component={MealDetails} />
                        <Route path="/table" component={Table} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App