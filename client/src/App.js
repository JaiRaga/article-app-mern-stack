import { useEffect, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

// Redux
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import { getAllArticles } from './redux/actions/article';

// utils
import setAuthToken from './utils/setAuthToken';
// pages
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
// components
import Navbar from './components/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllArticles());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <PrivateRoute exact path='/' component={Feed} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/Login' component={Login} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
