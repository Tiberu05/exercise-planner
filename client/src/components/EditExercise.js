import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import history from '../history';

const EditExercise = props => {

    const [exercise, setExercise] = useState({});
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log(props.match.params.id);
        axios.get(`http://localhost:5000/exercises/find/${props.match.params.id}`)
            .then(result => {
                console.log(result);
                setExercise(result.data);  
            })
            .catch(err => console.log(err));
    }, []);


    const onSubmit = e => {
        e.preventDefault();

        console.log(exercise);

        const newExercise = {
            email: exercise.email,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
            checked: false
        };

        axios.post(`http://localhost:5000/exercises/update/${props.match.params.id}`, newExercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));


        history.push('/exercises');

    }

    const createForm = () => {
        if (exercise) {
            return (
                <form className='exercise-form' onSubmit={onSubmit}>

                    <div className="form-group">
                        <label for='description'>Description</label>
                        <input className='form-control' type='text' name='description' autoComplete='off' value={exercise.description} onChange={e => setExercise({ ...exercise, description: e.target.value })} />                
                    </div>

                    
                    <div className='form-group'>
                        <label for='duration'>Duration</label>
                        <input className='form-control' type='text' name='duration' autoComplete='off' value={exercise.duration} onChange={e => setExercise({ ...exercise, duration: e.target.value })} />
                    </div>

                    <div className='form-group'>
                        <div>Choose date</div>
                        <DatePicker
                            className='date-picker'
                            onChange={date => setExercise({ ...exercise, date })}
                            selected={date}
                        />
                    </div>

                    <br />
                    <button className='btn btn-secondary' type='submit'>Submit</button>
                </form>
            )

        }
    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Edit exercise</h2>
            {createForm()}
        </div>
    )
};

export default EditExercise;