import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { logOut } from '../actions';

import history from '../history';


const Navbar = props => {

    const handleSignOut = () => {
        props.logOut();

        history.push('/');
    }


    const renderLoggedState = () => {
        if (props.isSignedIn) {
            return  <li className="nav-item" onClick={() => handleSignOut()}><NavLink className="nav-link" exact to="/logout" activeClassName="active">Logout</NavLink></li>
        } else {
            return <li className="nav-item"><NavLink className="nav-link" exact to="/login" activeClassName="active">Login</NavLink></li>
        }
    };

    const renderRegisterLink = () => {
        if (props.isSignedIn) {
            return null;
        } else {
            return <li className="nav-item"><NavLink className="nav-link" exact to="/register" activeClassName="active">Register</NavLink></li>
        }
    };

    const renderCreateExerciseLink = () => {
        if (!props.isSignedIn) {
            return null;
        } else {
            return <li className="nav-item"><NavLink className="nav-link" exact to="/create" activeClassName="active">Create Exercise Log</NavLink></li>
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className='container'>
                <NavLink className="navbar-brand badge badge-secondary text-wrap" style={{ width: "5rem", height: "2.7em"}} to="#">Exercise Planner</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/" activeClassName="active">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/exercises" activeClassName="active">Exercises</NavLink>
                        </li>
                        {renderCreateExerciseLink()}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {renderRegisterLink()}
                        {renderLoggedState()}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { logOut })(Navbar);