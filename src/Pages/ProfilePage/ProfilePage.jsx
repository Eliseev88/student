import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { ROWS } from "../../consts/main";
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import EditEvent from "../../Components/EditEvent/EditEvent";
import CreateEvent from "../../Components/CreateEvent/CreateEvent";

function ProfilePage() {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth.data);

  const [userEvents, setUserEvents] = useState(ROWS.filter(el => el.userId === 1));
  const [orgEvents, setOrgEvents] = useState(ROWS.filter(el => el.orgId === 1));

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenCreateModal] = useState(false);

  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleCancel = (e) => {
    const confirmDelete = window.confirm('Отписаться от мероприятия?');

    if (confirmDelete) {
      setUserEvents(userEvents.filter(event => event.id !== +e.currentTarget.id));
    }
  }

  const handleDelete = (e) => {
    const confirmDelete = window.confirm('Отменить мероприятие?');

    if (confirmDelete) {
      setOrgEvents(orgEvents.filter(event => event.id !== +e.currentTarget.id));
    }
  }

  const handleEdit = (e) => {
    const event = orgEvents.find(el => el.id === +e.currentTarget.id);
    setEventToEdit(event);
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
    <Box ml={2} mt={2}>
      <Typography variant="h4" gutterBottom>
        Мои записи на мероприятия
      </Typography>
      {!userEvents.length
        ? <Typography>Записей нет</Typography>
        : <List>
          {userEvents.map(event => {
            return (
              <ListItem disablePadding key={event.id}>
                <ListItemButton component="a" href={`/events/${event.id}`}>
                  <ListItemText primary={event.description} />
                </ListItemButton>
                <Button title='Отменить запись' color="error" id={event.id} onClick={handleCancel}>
                  <CancelIcon />
                </Button>
              </ListItem>
            )
          })}
        </List>
      }
      <Typography variant="h4" gutterBottom>
        Мои мероприятия
      </Typography>
      {!orgEvents.length
        ? <Typography>Мероприятий нет</Typography>
        : <List>
          {orgEvents.map(event => {
            return (
              <ListItem disablePadding key={event.id}>
                <ListItemButton component="a" href={`/events/${event.id}`}>
                  <ListItemText primary={event.description} />
                </ListItemButton>
                <Button title='Редактировать мероприятие' color="success" id={event.id} onClick={handleEdit}>
                  <EditIcon />
                </Button>
                <Button title='Отменить мероприятие' color="error" id={event.id} onClick={handleDelete}>
                  <CancelIcon />
                </Button>
              </ListItem>
            )
          })}
        </List>
      }
      <Button variant="contained" onClick={openCreateModal}>Создать мероприятие</Button>
      <EditEvent open={openModalEdit} handleCloseEdit={handleCloseEdit} eventToEdit={eventToEdit} />
      <CreateEvent open={openModalCreate} handleClose={handleCloseNewEventModal} />
    </Box>
  )
}

export default ProfilePage