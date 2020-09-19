const INITIAL_STATE = {
    isSignedIn: null,
    userID: null,
    username: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isSignedIn: true, userID: action.payload.userID, username: action.payload.username };
        case 'SIGN_OUT': 
            return { ...state, isSignedIn: false, userID: null, username: null };
        default:
            return state;
    }
}