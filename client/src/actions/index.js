import axios from 'axios';


// ERROR actions

export const returnErrors = (msg, status, id = null) => {
    return {
        type: 'GET_ERRORS',
        payload: {
            msg,
            status,
            id
        }
    };
};

export const clearErrors = () => {
    return {
        type: 'CLEAR_ERRORS'
    };
};


// AUTH actions

// Check user and load user
export const loadUser = () => (dispatch, getState) => {
    
    // User loading
    dispatch({ type: 'USER_LOADING' });


    axios.get('http://localhost:5000/users/user', tokenConfig(getState))
        .then(res => dispatch({ 
            type: 'USER_LOADED',
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: 'AUTH_ERROR'})
        })
}

export const createUser = (name, email, password) => dispatch => {

    const config = {
        name,
        email,
        password
    };

    axios.post('http://localhost:5000/users/add', config)
        .then(res => {
            clearErrors();
            dispatch({
               type: 'REGISTER_SUCCES',
               payload: res.data
           }) 
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: 'REGISTER_FAIL'})
        })
};

export const logIn = (email, password) => dispatch => {

    const config = {
        email,
        password
    };

    axios.post('http://localhost:5000/users/login', config)
        .then(res => {
            clearErrors();
            dispatch({
                type: 'LOGIN_SUCCES',
                payload: res.data
            })

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: 'LOGIN_FAIL'})
        })
};

export const logOut = () => dispatch => {

    dispatch({ type: 'LOGOUT_SUCCES' });
}

// export const signIn = (userID, username) => {
//     return {
//         type: 'SIGN_IN',
//         payload: {
//             userID,
//             username
//         }
//     }
// };

// export const signOut = () => {
//     return {
//         type: 'SIGN_OUT'
//     }
// };


export const tokenConfig = getState => {
        // Get token
        const token = getState().auth.token;

        // Headers
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        };
    
        // If token, add to headers
        if (token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
}