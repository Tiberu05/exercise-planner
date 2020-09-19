import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateUser = props => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmit = e => {
        e.preventDefault();

        const user = {
            username,
            email,
            password
        };

        axios.post('http://localhost:5000/users/add', user)
            .then(result => console.log(result.data))
            .catch(err => console.log(err));



        window.location = '/';
    }


    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Register</h2>
            <form className='exercise-form' onSubmit={onSubmit}>

                <div className='form-group'>
                    <label for='username'>Username</label>
                    <input className="form-control" type='text' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label for='email'>Email</label>
                    <input className="form-control" type='email' name='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                
                <div className='form-group'>
                    <label for='password'>Password</label>
                    <input className="form-control" type='password' name='password' autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                
                <br />
                <button className='btn btn-secondary' type='submit'>Register</button>
            </form>
        </div>
    )
};

export default CreateUser;