import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from 'root/pages/HomePage';
import { LoginPage } from 'root/pages/LoginPage';
import { RegisterPage } from 'root/pages/RegisterPage';
import { ListPage } from 'root/pages/ListPage';
import { ListMap } from 'root/pages/ListMap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import NavBar from '../_components/NavBar/NavBar';
import './App.scss';
function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron main">
            <div className="container">
                <Router history={history}>
                    <NavBar />
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/list" component={ListPage} />
                        <Route path="/maps" component={ListMap} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
                {/* <div className="alert col-md-5 col-lg-1 offset-md-1 center">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                </div> */}
            </div>
        </div>
    );
}

export { App };