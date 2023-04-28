import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import cl from './Admin.module.css';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/slices/users/actionsCreator';
import { usersSlice } from '../../store/slices/users/usersSlice';

function CreateNewUser() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passError, setPassError] = useState(false);

    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.users);

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
        dispatch(createUser(registerObj));
    }

    useEffect(() => {
        if (user) {
            dispatch(usersSlice.actions.addUser(user));
        }
    }, [user])

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
            {user ? <Typography variant="h5" component="h2">Пользователь успешно создан!</Typography>
                : <>
                    <Typography variant="h5" component="h2">
                        Новый пользователь
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
                            onChange={handlePassChange}
                        />
                        <TextField
                            label="Повторите пароль"
                            variant="standard"
                            type='password'
                            size='small'
                            required
                            value={repeatPassword}
                            onChange={handlePassRepeatChange}
                        />
                    </div>
                    <div className={cl.switch}>
                        <Button variant="contained" type='submit' onClick={handleSubmit}>Создать</Button>
                    </div>
                </>
            }
        </form>

    );
}

export default CreateNewUser;
