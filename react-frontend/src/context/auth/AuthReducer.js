import { 
    REGISTER_SUCCESS, 
    LOGIN_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_FAIL, 
    AUTH_ERROR, 
    LOGOUT, 
    USER_LOADED, 
    CLEAR_ERROR 
} from './AuthTypes';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export default AuthReducer;
