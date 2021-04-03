import React from 'react'
import Login from './Login'
import Home from './Home'
import Categories from './Categories'
import Meals from './Meals'
import Order from './Order'
import history from '../history'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" component={Login} exact />
                        <Route path="/home" component={Home} />
                        <Route path="/categories" component={Categories} />
                        <Route path="/meals/:id" component={Meals} />
                        <Route path="/order" component={Order} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App