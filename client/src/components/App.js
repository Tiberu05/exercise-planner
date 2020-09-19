import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';


import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import './App.css';

import HomePage from './HomePage';
import Navbar from './Navbar';
import CreateExercise from './CreateExercise';
import CreateUser from './CreateUser';
import EditExercise from './EditExercise';
import ExerciseList from './ExerciseList';
import LoginForm from './LoginForm';

const App = props => {

    

    return(
        <Router history={history}>
            
                <header>
                    <Navbar />
                </header>
                <div className='container container-main'>
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/exercises' exact component={ExerciseList} />
                        <Route path='/exercises/edit/:id' exact component={EditExercise} />
                        <Route path='/create' exact component={CreateExercise} />
                        <Route path='/register' exact component={CreateUser} />
                        <Route path='/login' exact component={LoginForm} />
                    </Switch>
                </div>
        </Router>
    );
};

export default App;