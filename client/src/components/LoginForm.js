import Axios from 'axios';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import history from '../history';

import axios from 'axios';

const LoginForm = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const wrongCredentials = () => {
        if (error) {
            return (
                <div>
                    <p className='exercise-form-container red-color-text'>Your credentials are incorrect</p>
                </div>
            )
        }

    };


    const onSubmit = e => {
        e.preventDefault();

        const data = {
            username,
            password
        }

        axios.post('http://localhost:5000/users/login', data)
            .then(result => {
                if (!result.data.okCredentials) {
                    setError(true);
                } else if (result.data.okCredentials) {
                    setError(false);
                    props.signIn(result.data.id, result.data.username);

                    history.push('/');
                }
                
            })
            .catch(err => console.log(err));



    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Login</h2>
            <form className='exercise-form' onSubmit={onSubmit} >

                <div class='form-group'>
                    <label for='username'>Username</label>
                    <input className='form-control' type='text' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
                </div>

                <div class='form-group'>
                    <label for='password'>Password</label>
                    <input className='form-control' type='password' name='password' autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <br />
                <button className='btn btn-secondary' type='submit'>Login</button>
            </form>
            {wrongCredentials()}
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        userID: state.auth.userID,
        username: state.auth.username
    }
}

export default connect(mapStateToProps, { signIn, signOut })(LoginForm);