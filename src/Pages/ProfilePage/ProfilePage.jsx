import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import EditEvent from "../../Components/EditEvent/EditEvent";
import CreateEvent from "../../Components/CreateEvent/CreateEvent";
import { fetchOrgEvents } from "../../store/slices/orgEvents/actionsCreator";
import { deleteEvent } from "../../store/slices/event/actionCreator";
import { getUserEvents, unsigned } from "../../store/slices/userEvents/actionsCreator";
import Admin from "../../Components/Admin/Admin";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import cl from './ProfilePage.module.css';
import TransitionsModal from "../../Components/Modal/Modal";
import { authSlice } from "../../store/slices/auth/authSlice";

function ProfilePage() {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const createdEvent = useSelector(state => state.events.event);

  const orgEvents = useSelector(state => state.orgEvents.events);
  const isOrgEventsLoading = useSelector(state => state.orgEvents.isLoading);
  const dispatch = useDispatch();

  const userEvents = useSelector(state => state.userEvents.userEvents);
  const isRegister = useSelector(state => state.auth.register);
  const isUserEventsLoading = useSelector(state => state.userEvents.isLoading);
  const [deleted, setDeleted] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenCreateModal] = useState(false);

  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      navigate('/');
    }
    if (user) {
      dispatch(fetchOrgEvents(user.token));
      dispatch(getUserEvents(user.token));
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (createdEvent) {
      dispatch(fetchOrgEvents(user.token));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdEvent, dispatch]);

  useEffect(() => {
    if (deleted) {
      dispatch(getUserEvents(user.token));
      setDeleted(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  const handleCloseReg = () => {
    dispatch(authSlice.actions.setRegister(false));
  }

  const handleCancel = (e) => {
    const confirmDelete = window.confirm('Отписаться от мероприятия?');

    if (confirmDelete) {
      dispatch(unsigned({ id: e.currentTarget.id, token: user.token }));
      setDeleted(true);
    }
  }

  const handleDelete = (e) => {
    const confirmDelete = window.confirm('Отменить мероприятие?');

    if (confirmDelete) {
      const obj = {
        id: e.currentTarget.id,
        token: user.token,
      }
      dispatch(deleteEvent(obj));
    }
  }

  const handleEdit = (e) => {
    const event = orgEvents.find(el => el.event.id === +e.currentTarget.id);
    setEventToEdit(event.event);
    setOpenModalEdit(true);
  }

  const handleCloseEdit = () => {
    setOpenModalEdit(false);
  }

  const openCreateModal = () => {
    setOpenCreateModal(true);
  }
  const handleCloseNewEventModal = () => {
    setOpenCreateModal(false);
  }

  return (
    <Box ml={2} mt={2} mb={2}>
      {user?.user?.role === 'admin' ? <Admin />
        : <>
          <Typography variant="h4" gutterBottom>
            Мои записи на мероприятия
          </Typography>
          {isUserEventsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
            : <>
              {!userEvents.length
                ? <Typography>Записей нет</Typography>
                : <List>
                  {userEvents.map(event => {
                    return (
                      <ListItem disablePadding key={event.id}>
                        <ListItemButton component="a" href={`/events/${event.id}`}>
                          <ListItemText primary={event.title} />
                        </ListItemButton>
                        <Button title='Отменить запись' color="error" id={event.id} onClick={handleCancel}>
                          <CancelIcon />
                        </Button>
                      </ListItem>
                    )
                  })}
                </List>
              }
            </>
          }
          {user?.user?.role === 'organizer' &&
            <>
              <Typography variant="h4" mt={2}>
                Мои мероприятия
              </Typography>
              {isOrgEventsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
                : !orgEvents.length
                  ? <Typography>Мероприятий нет</Typography>
                  : <List>
                    {orgEvents.map(el => {
                      return (
                        <div key={el.event.id}>
                          <ListItem disablePadding>
                            <ListItemButton component="a" href={`/events/${el.event.id}`}>
                              <ListItemText primary={el.event.title} />
                            </ListItemButton>
                            <Button title='Редактировать мероприятие' color="success" id={el.event.id} onClick={handleEdit}>
                              <EditIcon />
                            </Button>
                            <Button title='Отменить мероприятие' color="error" id={el.event.id} onClick={handleDelete}>
                              <CancelIcon />
                            </Button>
                          </ListItem>
                          <div className={cl.accordion}>
                            <Accordion id={el.event.id}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <Typography>Участники</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className={cl.details}>
                                  {!el.eventUsers.length && 'Участников нет'}
                                  {el.eventUsers.map(user => {
                                    return (
                                      <ListItem component="div" disablePadding key={user.id}>
                                        <ListItemText primary={user.name} secondary={user.email} />
                                      </ListItem>
                                    )
                                  })}
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </div>
                      )
                    })}
                  </List>
              }
              <Button variant="contained" onClick={openCreateModal}>Создать мероприятие</Button>
              <EditEvent open={openModalEdit} handleCloseEdit={handleCloseEdit} eventToEdit={eventToEdit} token={user.token} />
              <CreateEvent open={openModalCreate} handleClose={handleCloseNewEventModal} token={user.token} />
            </>
          }
        </>
      }
      <TransitionsModal open={isRegister} handleClose={handleCloseReg} >
        <Typography variant="h5" component="h2">Вы успешно зарегистрировались!</Typography>
      </TransitionsModal>
    </Box>
  )
}

export default ProfilePage