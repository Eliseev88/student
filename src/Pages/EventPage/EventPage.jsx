import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import cl from './EventPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TransitionsModal from "../../Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../../store/slices/event/actionCreator";
import { Alert, CircularProgress } from "@mui/material";
import { getUserEvents, signed } from "../../store/slices/userEvents/actionsCreator";

function EventPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { event, isLoading } = useSelector(state => state.events);
    const [allertText, setAllertText] = useState('Вы не можете записаться на это мероприятие!');
    const user = useSelector(state => state.auth.user);
    const userEvents = useSelector(state => state.userEvents.userEvents);

    const [text, setText] = useState();
    const [isDisabled, setIsDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getEventById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (!userEvents.length && user) {
            dispatch(getUserEvents(user.token));
        }
    }, [userEvents, user]);

    useEffect(() => {
        if (!user) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
        if (event && user) {
            if (event.type === 'закрытая' && user.user.role === 'guest') {
                setIsDisabled(true);
            }
            if (userEvents.find(el => el.id === event.id)) {
                setIsDisabled(true);
                setAllertText('Вы уже записаны на это мероприятие');
            }
        }
    }, [event, user, userEvents])

    const onBook = () => {
        setText('Вы записались на мероприятие');
        setOpen(true);
        dispatch(signed({id: event.id, token: user?.token}));
    }

    const onEstimate = (e, newValue) => {
        setText('Спасибо за вашу оценку!');
        setOpen(true);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    height: '100%',
                },
            }}
        >
            {isLoading
                ? <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '200px !important' }}>
                    <CircularProgress />
                </Box>
                : <Paper variant="outlined">
                    <Typography variant="h3" gutterBottom mt={2} align={'center'}>
                        {event?.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom align={'center'}>
                        {event?.description}
                    </Typography>
                    <Typography variant="overline" display="block" gutterBottom align={'center'}>
                        Время проведения: <span className={cl.details}>{event?.start} - {event?.finish}</span>
                    </Typography>
                    <Typography variant="overline" display="block" gutterBottom align={'center'}>
                        Тип мероприятия: <span className={cl.details}>{event?.type}</span>
                    </Typography>
                    <Typography variant="overline" display="block" gutterBottom align={'center'}>
                        Организатор: <span className={cl.details}>{event?.users?.name}</span>
                    </Typography>
                    <Typography variant="overline" display="block" gutterBottom align={'center'}>
                        Контакты: <span className={cl.details}>{event?.users?.email}</span>
                    </Typography>
                    {isDisabled && <Alert
                        sx={{ width: '100%', marginBottom: '5px', display: 'flex', justifyContent: 'center' }}
                        severity="warning"
                    >
                        {allertText}
                    </Alert>
                    }
                    <Button
                        variant="contained"
                        className={cl.btn}
                        onClick={onBook}
                        id={event?.id}
                        disabled={isDisabled}
                    >
                        Записаться
                    </Button>
                    <div className={cl.footer}>
                        <Typography variant="overline" display="block" gutterBottom align={'center'}>
                            Оцените мероприятие
                        </Typography>
                        <Rating name="half-rating" defaultValue={event?.rate} precision={0.5} onChange={onEstimate} />
                    </div>
                    <Button variant="clear" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Назад</Button>
                    <TransitionsModal open={open} handleClose={handleClose}>
                        <div className={cl.text}>{text}</div>
                    </TransitionsModal>
                </Paper>
            }
        </Box>
    )
}

export default EventPage;
