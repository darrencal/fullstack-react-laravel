import axios from 'axios';
import { useReducer } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer';
import { AUTH_ERROR, CLEAR_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from './AuthTypes';

const AuthProvider = ({children}) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const getUser = async () => {
        try {
            const res = await axios.get('user');
            
            // Check if user is still authenticated
            if (localStorage.getItem('token')) {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data.data, // The Laravel API returns the user with a key of "data"
                });
            }
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.msg,
            });
        }
    }

    const login = async (formData) => {
        try {
            const res = await axios.post('login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.data.error) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: res.data.error,
                });
            } else {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });

                setAuthToken(res.data.token);
                getUser();
            }
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.message,
            });
        }
    };

    const register = async (formData) => {
        try {
            const res = await axios.post('register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.message,
            })
        }
    }

    const logout = () => {
        dispatch({ type: LOGOUT });
        setAuthToken();
    }

    const clearError = () => {
        dispatch({ type: CLEAR_ERROR });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                error: state.error,
                login,
                register,
                getUser,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
