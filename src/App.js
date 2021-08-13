import './App.css';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
// Views
import Home from './components/Home'
import Nav from './components/Layout/Nav'
import Memories from './components/Memories'
import Signup from './components/Signup'
import Login from './components/Login'

// Private Route and Auth
import PrivateRoute from './components/PrivateRoute'
import AuthRoute from './components/AuthRoute'

// Global state
import UserState from './context/Users/UserState'

function App() {
  return (
    <>
      <UserState>
      <Router>
        <Nav />
        <Switch>
          {/* PRIVATE ROUTES */}
          <PrivateRoute exact path="/memories" component={Memories} />
          {/* AUTH ROUTES */}
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          {/* PUBLIC ROUTES */}
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
      </UserState>
    </>
  );
}

export default App;
