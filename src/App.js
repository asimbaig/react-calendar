import React, {useEffect} from "react";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Calendar from "./Components/Calendar";
import DateDetails from "./Components/DateDetails";
import Layout from './Components/Layout/Layout';
import Logout from './Components/Logout/Logout';
import { authCheckState } from "../src/store/actions/index";
import asyncComponent from '../src/Components/asyncComponent/asyncComponent';
import StopWatch from "./Components/StopWatch";
import CountDown from "./Components/CountDown";
import ChangeEmail from "./Components/Auth/ChangeEmail";
import ChangePassword from "./Components/Auth/ChangePassword";


const asyncAuth = asyncComponent(() => {
  return import('./Components/Auth/Auth');
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);
  
  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/stopwatch" component={StopWatch} />
      <Route path="/countdown" component={CountDown} />
      <Route path="/changeemail" component={ChangeEmail} />
      <Route path="/changepassword" component={ChangePassword} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={Calendar} />
      <Redirect to="/" />
    </Switch>
  );
  if ( props.isAuthenticated ) {
    routes = (
      <Switch>
        <Route path="/stopwatch" component={StopWatch} />
        <Route path="/countdown" component={CountDown} />
        <Route path="/changeemail" component={ChangeEmail} />
        <Route path="/changepassword" component={ChangePassword} />
        <Route path="/logout" component={Logout} />
        <Route path="/details" component={DateDetails} />
        <Route path="/" exact component={Calendar} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
  <div className="App">
    <Layout>
    {routes}
    </Layout>
  </div>);
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
