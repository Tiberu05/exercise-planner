import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import history from '../history';

import axios from 'axios';

const CreateExercise = props => {

    //const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);


    const onSubmit = e => {

        e.preventDefault();

        const exercise = {
            email: props.email,
            description,
            duration,
            date
        };

        console.log(localStorage.getItem('token'))

        axios.post('http://localhost:5000/exercises/add', exercise, { headers: {'x-auth-token': localStorage.getItem('token')}})
            .then(result => console.log(result.data))
            .catch(err => console.log(err));


        setTimeout(() => {
            history.push('/exercises');
        }, 300);

    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Add exercise</h2>
            <form className='exercise-form' onSubmit={onSubmit}>


                {/* <div className='form-group'>
                    <label for='username'>Username</label>
                    <input className='form-control' type='text' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
                </div> */}

                <div className='form-group'>
                    <label for='description'>Description</label>
                    <input className='form-control' type='text' name='description' autoComplete='off' value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label for='duration'>Duration</label>
                    <input className='form-control' type='text' name='duration' autoComplete='off' value={duration} onChange={e => setDuration(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label for='date'>Choose date:  </label>
                    <DatePicker
                        className='form-control date-input'
                        onChange={newDate => setDate(newDate)}
                        selected={date}
                        name='date'
                    />
                </div>
                <br />
                <button className='btn btn-secondary' type='submit'>Submit</button>
            </form>
        </div>
    )
};

const mapStateToProps = state => {
    return { email: state.auth.user.email };
}

export default connect(mapStateToProps, {} )(CreateExercise);