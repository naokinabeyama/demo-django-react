import { useReducer } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { START_FETCH, FETCH_SUCCESS, ERROR_CATCHED, INPUT_EDIT, TOGGLE_MODE } from './ActionTypes';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    span: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "teal",
    },
    spanError: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "fuchsia",
        marginTop: 10,
    },
}));

const initialState = {
    isLoading: false,
    isLoginView: true,
    error: '',
    credentialsLog: {
        username: '',
        password: '',
    },
    credentialsReg: {
        email: '',
        password: '',
    },
};

const loginReducer = (state, action) => {
    switch (action.type) {
        case START_FETCH: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case ERROR_CATCHED: {
            return {
                ...state,
                error: 'メールアドレス又はパスワードが違います。',
                isLoading: false,
            };
        }
        case INPUT_EDIT: {
            return {
                ...state,
                [action.inputName]: action.payload,
                error: '',
            };
        }
        case TOGGLE_MODE: {
            return {
                ...state,
                isLoginView: !state.isLoginView,
            };
        }
        default:
            return state;
    };
};


const Login = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(loginReducer, initialState);
    
    return (
        <div>Login</div>
    )
}

export default Login
