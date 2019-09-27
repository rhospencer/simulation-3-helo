// INITIAL STATE
const initialState = {
    username: '',
    id: null,
    profile_pic: ''
}

// ACTION CONSTANTS
const UPDATE_USER = 'UPDATE_USER'

// ACTION BUILDERS
export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    }
}


// REDUCER FUNCTION
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return {...state, username: action.payload, id: action.payload, profile_pic: action.payload}
        default:
            return state
    }
}

export default reducer