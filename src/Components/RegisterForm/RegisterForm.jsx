import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import cl from './RegisterForm.module.css';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slices/auth/actionCreator';

function RegisterForm() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passError, setPassError] = useState(false);
    const [succesRegister, setSuccesRegister] = useState(false);

    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setPassError(true);
            return;
        }
        const registerObj = {
            name,
            email,
            password,
            password_confirmation: repeatPassword,
        }
        dispatch(registerUser(registerObj));
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('auth', true);
            setSuccesRegister(true);
        }
    }, [user, dispatch]);

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePassRepeatChange = (e) => {
        setRepeatPassword(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            {succesRegister ? <Typography variant="h5" component="h2">Вы успешно зарегистрировались!</Typography>
                : <>
                    <Typography variant="h5" component="h2">
                        Регистрация
                    </Typography>
                    <div className={cl.box}>
                        {error && <Alert sx={{ width: '100%' }} severity="warning">Пользователь с таким адресом уже зарегистрирован</Alert>}
                        {passError && <Alert sx={{ width: '100%' }} severity="warning">Пароли не совпадают!</Alert>}
                        <TextField
                            label="Введите email"
                            variant="standard"
                            size='small'
                            required
                            type='email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            label="Введите имя"
                            variant="standard"
                            size='small'
                            required
                            value={name}
                            onChange={handleNameChange}
                        />
                        <TextField
                            label="Введите пароль"
                            variant="standard"
                            type='password'
                            size='small'
                            required
                            value={password}
                            onFocus={() => setPassError(false)}
                            onChange={handlePassChange}
                        />
                        <TextField
                            label="Повторите пароль"
                            variant="standard"
                            type='password'
                            size='small'
                            required
                            value={repeatPassword}
                            onFocus={() => setPassError(false)}
                            onChange={handlePassRepeatChange}
                        />
                    </div>
                    <div className={cl.switch}>
                        <Button variant="contained" type='submit' onClick={handleSubmit}>Зарегистрироваться</Button>
                    </div>
                    <Typography variant="body2" gutterBottom>
                        Есть аккаунт? <Link className={cl.link} to='/login'>Войти</Link>
                    </Typography>
                </>
            }
        </form>

    );
}

export default RegisterForm;
