import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customer">
              Customer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/rental">
              Rental
            </NavLink>
          </li>
        </ul>

        {!user && (
          <React.Fragment>
            <ul className="navbar-nav  ">
              <li className="nav-item ">
                <NavLink className="nav-link " to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link " to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <ul className="navbar-nav  ">
              <li className="nav-item ">
                <NavLink className="nav-link " to="/profile">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link " to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
