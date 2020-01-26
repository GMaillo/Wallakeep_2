import React from "react";
import { Provider } from 'react-redux'; 
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdvertDetail from '../AdvertDetail';
import Navbar from '../Navbar';
import EditAdvert from '../EditAdvert';
import Login from '../Login';
import Profile from '../Profile';
import NotFoundPage from '../NotFoundPage';
import Home from '../Home';
import ErrorBoundary from "../ErrorBoundary";
import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.isUserLogged = this.isUserLogged.bind(this);
  }

  isUserLogged() { return this.props.isLogged; }

  render() {
    const { store } = this.props;

    return (  
      <div>
        <ErrorBoundary> 
          <Provider store={store}>
            <Router>
                {
                  !this.isUserLogged()
                  &&
                  <React.Fragment>
                    <Route component={Login} />
                  </React.Fragment>
                }
                {
                  this.isUserLogged()
                  &&
                  <React.Fragment>              
                    <Navbar/>
                    <div id="main">
                      <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/create-advert" component={EditAdvert} /> {}
                        <Route path="/edit-advert" component={EditAdvert} /> {}
                        <Route path="/advert/:id" component={AdvertDetail} />
                        <Route exact path="/" component={Home} />
                        <Route component={NotFoundPage} />
                      </Switch>
                    </div>
                </React.Fragment>
                }
            </Router>
          </Provider>
        </ErrorBoundary>
      </div>
    );
  }
}