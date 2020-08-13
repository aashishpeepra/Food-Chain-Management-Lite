import * as actionTypes from "./actions";

const initialState = {
    loggedIn: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN__SUCCESS:
            return {
                ...state,
                loggedIn: true,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                loggedIn: false,
            }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;