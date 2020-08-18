import * as actionTypes from "./actions";

const initialState = {
    loggedIn: false,
    uid:"",
    email:""
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN__SUCCESS:
            console.log(action.obj)
            return {
                ...state,
                loggedIn: true,
                uid:action.obj.uid,
                email:action.obj.email
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                uid:"",
                email:""
            }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;