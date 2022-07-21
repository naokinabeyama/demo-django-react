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
        backgroundColor: "#CCCCCC",
        color: "black",
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
        color: "gray",
        cursor: "pointer",
    },
    spanError: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "fuchsia",
        marginTop: 10,
    },
    title: {
        color: "#444444",
    },
}));

const initialState = {
    isLoading: false,
    isLoginView: true,
    error: '',
    // ログイン時
    credentialsLog: {
        username: '',
        password: '',
    },
    // 新規作成時
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

// popsにtokenが渡される
const Login = (props) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(loginReducer, initialState);
    
    const inputChangedLog = () => event => {
        // initialStateのcredentialsLog
        const cred = state.credentialsLog;
        // formで入力されたusername(email)とpasswordが入力(又は変更される度に)渡ってくる
        cred[event.target.name] = event.target.value;
        // credentialsLogの内容だけ書き換えることができる
        dispatch({
            type: INPUT_EDIT,
            inputName: 'state.credentialsLog',
            payload: cred,
        });
    };

    const inputChangedReg = () => event => {
        // initialStateのcredentialsReg
        const cred = state.credentialsReg;
        // formで入力されたusername(email)とpasswordが入力(又は変更される度に)渡ってくる
        cred[event.target.name] = event.target.value;
        // credentialsRegの内容だけ書き換えることができる
        dispatch({
            type: INPUT_EDIT,
            inputName: 'state.credentialsReg',
            payload: cred,
        });
    };

    const login = async (event) => {
        // defaultの場合submitボタンが押されるとページがリフレッシュされる為リフレッシュされないようにする
        event.preventDefault();
        if (state.isLoginView) {
            try {
                dispatch({ type: START_FETCH })
                const res = await axios.post('http://127.0.0.1:8000/authen/', state.credentialsLog, {
                    headers: { 'Content-Type': 'application/json' }
                });
                props.cookies.set('current-token', res.data.token);
                res.data.token ? window.location.href = '/profiles' : window.location.href = '/';
                dispatch({ type: FETCH_SUCCESS });
            } catch {
                dispatch({ type: ERROR_CATCHED });
            };
        } else {
            try {
                dispatch({ type: START_FETCH });
                await axios.post('http://127.0.0.1:8000/api/user/create/', state.credentialsReg, {
                    headers: { 'Content-Type': 'application/json' }
                })
                dispatch({ type: FETCH_SUCCESS })
                dispatch({ type: TOGGLE_MODE })
            } catch {
                dispatch({ type: ERROR_CATCHED })
            };
        };
    };

    // Login画面とRegister画面を変える
    const toggleView = () => {
        dispatch({type: TOGGLE_MODE})
    }

    return (
        <Container maxWidth="xs">
            <form onSubmit={login}>
                <div className={classes.paper}>
                {state.isLoading && <CircularProgress />}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h4" className={classes.title}>
                    {state.isLoginView ? "Login" : "Register"}
                </Typography>

                {state.isLoginView ? (
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="username"
                    value={state.credentialsLog.username}
                    onChange={inputChangedLog()}
                    autoFocus
                    />
                ) : (
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    value={state.credentialsReg.email}
                    onChange={inputChangedReg()}
                    autoFocus
                    />
                )}

                {state.isLoginView ? (
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={state.credentialsLog.password}
                    onChange={inputChangedLog()}
                    />
                ) : (
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={state.credentialsReg.password}
                    onChange={inputChangedReg()}
                    />
                )}
                <span className={classes.spanError}>{state.error}</span>

                {state.isLoginView ? (
                    !state.credentialsLog.password || !state.credentialsLog.username ? (
                    <Button
                        className={classes.submit}
                        type="submit"
                        fullWidth
                        disabled
                        variant="contained"
                    >
                        Login
                    </Button>
                    ) : (
                    <Button
                        className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Login
                    </Button>
                    )
                ) : !state.credentialsReg.password || !state.credentialsReg.email ? (
                    <Button
                    className={classes.submit}
                    type="submit"
                    fullWidth
                    disabled
                    variant="contained"
                    >
                    Register
                    </Button>
                ) : (
                    <Button
                    className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    >
                    Register
                    </Button>
                )}

                <span onClick={() => toggleView()} className={classes.span}>
                    {state.isLoginView ? 'Create Account ?' : 'Back to Login ?'}
                </span>
                </div>
            </form>
        </Container>
    )
}

export default withCookies(Login)
