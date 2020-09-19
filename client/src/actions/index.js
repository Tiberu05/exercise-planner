export const signIn = (userID, username) => {
    return {
        type: 'SIGN_IN',
        payload: {
            userID,
            username
        }
    }
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
};