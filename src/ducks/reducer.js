// INITIAL STATE
const initialState = {
    username: '',
    // id: null,
    profile_pic: ''
}

// ACTION CONSTANTS
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

// ACTION BUILDERS
export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}


// REDUCER FUNCTION
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return {...state, username: action.payload, profile_pic: action.payload}
        case LOGOUT:
            return initialState
        default:
            return state
    }
}

export default reducer