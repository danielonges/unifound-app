import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import LostFoundListings from './components/pages/LostFoundListings';

function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route exact path='/lostfoundlistings' component={LostFoundListings} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
                    <Route exact path='/' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
