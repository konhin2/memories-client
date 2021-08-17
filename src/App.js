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
import EachMemory from './components/Memories/Memory'
import NotFound from './components/NotFound'

// Private Route and Auth
import PrivateRoute from './components/PrivateRoute'
import AuthRoute from './components/AuthRoute'

// Global state
import UserState from './context/Users/UserState'
import PostState from './context/Posts/PostState'
import NasaState from './context/NASA/NasaState'

function App() {
  return (
    <>
      <UserState>
      <PostState>
      <NasaState>
      <Router>
        <Nav />
        <Switch>
          {/* PRIVATE ROUTES */}
          <PrivateRoute exact path="/memories" component={Memories} />
          <PrivateRoute exact path="/memories/:id" component={EachMemory} />
          {/* AUTH ROUTES */}
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          {/* PUBLIC ROUTES */}
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      </NasaState>
      </PostState>
      </UserState>
    </>
  );
}

export default App;
