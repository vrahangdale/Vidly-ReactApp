import React from "react";
import Movies from "./components/Movies";
import NavBar from "./components/common/navBar";
import Customer from "./components/Customer";
import Rental from "./components/Rental";
import MovieForm from "./components/MovieForm";
import NotFound from "./components/common/NotFound";
import LoginForm from "./components/loginForm";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movie/:id" component={MovieForm} />
          <Route path="/customer" component={Customer} />
          <Route path="/rental" component={Rental} />
          <Route path="/movies" component={Movies} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
