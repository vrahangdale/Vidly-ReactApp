import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./services/authService";
import Movies from "./components/Movies";
import NavBar from "./components/common/navBar";
import Customer from "./components/Customer";
import Rental from "./components/Rental";
import MovieForm from "./components/MovieForm";
import NotFound from "./components/common/NotFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./components/common/profile";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/common/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
            <ProtectedRoute path="/movie/:id" component={MovieForm} />
            <Route path="/customer" component={Customer} />
            <Route path="/rental" component={Rental} />
            <Route
              path="/movies"
              render={props => <Movies user={user} {...props} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
