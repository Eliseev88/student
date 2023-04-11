import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import TransitionsModal from '../../Components/Modal/Modal';
import cl from './Header.module.css';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../../store/slices/searchSlice';
import { setAuth } from '../../store/slices/authSlice';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function ButtonAppBar() {
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState('/login')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const search = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const { pathname } = useLocation();

    if (localStorage.getItem('auth')) {
        dispatch(setAuth(true));
    }

    const auth = useSelector(state => state.auth.data);

    useEffect(() => {
        if (pathname === '/login' || pathname === '/register') {
            setOpen(true);
        }
        if (pathname === '/register') {
            setLocation('/register');
        } else {
            setLocation('/login');
        }
    }, [pathname]);

    const handleSearchChange = (e) => {
        dispatch(setSearch((e.target.value)));
    }

    const handleExit = () => {
        dispatch(setAuth(false));
        localStorage.removeItem('auth');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink to={'/'} className={cl.link}>
                            Агрегатор мероприятий универстита
                        </NavLink>
                    </Typography>
                    <Search className={cl.search}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Поиск…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={search.data}
                            onChange={handleSearchChange}
                        />
                    </Search>
                    {auth
                        ? <Link to='/profile' className={cl.link} title='Профиль'>Иван Иванов</Link>
                        : <Button color="inherit" onClick={handleOpen}>
                            Войти
                        </Button>
                    }
                    {auth && <Button color="inherit" onClick={handleExit} title='Выйти'><ExitToAppIcon /></Button>}
                    <TransitionsModal open={open} handleClose={handleClose}>
                        {location === '/register' ? <RegisterForm handleClose={handleClose} /> : <LoginForm handleClose={handleClose} />}
                    </TransitionsModal>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
