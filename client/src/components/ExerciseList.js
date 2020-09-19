import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

import history from '../history';
import { post } from 'jquery';


const ExerciseList = props => {

    const [exercises, setExercises] = useState([]);

    const {reload, setReload} = useState('');

    useEffect(() => {

        axios.get(`http://localhost:5000/exercises/${props.username}`)
            .then(results => {
                setExercises(results.data);
            })
            .catch(err => console.log(err));
    }, [exercises])


    const deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(result => console.log(result.data))
            .catch(err => console.log(err));


        history.push('/exercises');

    }

    const renderButtons = user => {
        if (user.username === props.username) {
            return (
                <td>
                    <Link to={`exercises/edit/${user._id}`}>
                        <button className='btn btn-outline-primary btn-sm' href={`exercises/edit/${user._id}`}>Edit</button>
                    </Link>
                    <button className='btn btn-outline-danger btn-sm' onClick={() => deleteExercise(user._id)}>Delete</button>
                </td>
            )
        } else {
            return null;
        }
        
    };

    const toggleChecked = el => {
        console.log(el);

        const toggleBetween = el.checked ? false : true;

        console.log(toggleBetween);

        axios.post(`http://localhost:5000/exercises/update/${el._id}`, { ...el, checked: toggleBetween })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }


    const renderChecked = el => {
        if (!el.checked) {
            return <i onClick={() => toggleChecked(el)} class="thumbs up outline icon"></i>
        } else {
            return <i onClick={() => toggleChecked(el)} class="thumbs up icon green"></i>
        }
    }



    const renderExercises = () => {
        if (exercises.length > 0) {

            const render = exercises.map(el => {

                const classToggle = el.checked ? 'checked' : '';
                return (
                    <tr className={`${classToggle}`} key={el._id}>
                        <td>{el.username.slice(0, 1).toUpperCase() + el.username.slice(1, el.username.length).toLowerCase()}</td>
                        <td>{el.description.slice(0, 1).toUpperCase() + el.description.slice(1, el.description.length).toLowerCase()}</td>
                        <td>{el.duration}</td>
                        <td>{el.date.substring(0, 10)}</td>
                        <td>{renderChecked(el)}</td>
                        {renderButtons(el)}
                    </tr>
                )
            })

            return render;
        } else {
            return null;
        }
        
    };

    const renderText = () => {
        if (!props.isSignedIn) {
            return (
                <div class="d-flex justify-content-center">
                    <h3><a href='/login'>Login</a> or <a href='/register'>Register</a> to add exercises</h3>
                </div>
            )
        } else if (props.isSignedIn && exercises.length === 0) {
            return (
                <div class="d-flex justify-content-center">
                    <h3>You don't have any exercises added</h3>
                </div>
            ) 
        }
    };

    const renderCreateButton = () => {
        if (props.isSignedIn) {
            return (
                <Link to='/create'>
                    <button class='btn btn-secondary'>Add new exercise</button>
                </Link>
            )
        }

    }




    return (
        // <div className='exercises-container'>{renderExercises()}</div>
        <div className='exercises-list'>
            <h2>Planned Exercises</h2>
            <table className='table'>
                <thead className='table-active'>
                    <tr>
                        <td>Added by</td>
                        <td>Description</td>
                        <td>Duration</td>
                        <td>Date</td>
                        <td>Checked</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {renderExercises()}
                </tbody>
            </table>
            {renderText()}
            {renderCreateButton()}
        </div>
    )
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn, username: state.auth.username };
}

export default connect(mapStateToProps, {} )(ExerciseList);