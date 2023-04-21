import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import cl from './LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { login } from '../../store/slices/auth/actionCreator';

function LoginForm({ handleClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [emptyField, setEmptyField] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password && !email) {
            setEmptyField(true);
            return;
        }
        const obj = {
            email,
            password
        }
        dispatch(login(obj));
    }

    const onChangeLogin = (e) => {
        if (emptyField) {
            setEmptyField(false);
        }
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        if (emptyField) {
            setEmptyField(false);
        }
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (user) {
            if (rememberMe) {
                localStorage.setItem('token', user.token);
            }
            localStorage.setItem('auth', true);
            handleClose();
            navigate('/profile');
        }

    }, [user, rememberMe, navigate, handleClose]);

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" component="h2">
                Авторизация
            </Typography>
            <div className={cl.box}>
                {error && <Alert sx={{ width: '100%' }} severity="warning">Неверные почта или пароль</Alert>}
                <Typography variant="overline" display="block" gutterBottom color='red'>
                    {emptyField && 'Введите почту и пароль'}
                </Typography>
                <TextField
                    label="Введите почту"
                    variant="standard"
                    size='small'
                    value={email}
                    required
                    onChange={onChangeLogin}
                />
                <TextField
                    label="Введите пароль"
                    variant="standard"
                    type='password'
                    size='small'
                    value={password}
                    required
                    onChange={onChangePassword}
                />
            </div>
            <div className={cl.switch}>
                <Button variant="contained" type='submit' onClick={handleSubmit}>Войти</Button>
                <FormControlLabel control={
                    <Switch defaultChecked value={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                } label="Запомнить меня" />
            </div>
            <Typography variant="body2" gutterBottom>
                Нет аккаунта? <Link className={cl.link} to='/register'>Зарегистрироваться</Link>
            </Typography>
        </form>
    )
}

export default LoginForm;
