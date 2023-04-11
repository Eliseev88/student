import { Box, Button, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { ROWS } from "../../consts/main";
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import TransitionsModal from "../../Components/Modal/Modal";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { convertStringToDate } from "../../utils/filterTable";

const categories = ['Форум', 'Конференция', 'Олимпиада', 'Конкурс'];

function ProfilePage() {

  const navigate = useNavigate();

  const auth = useSelector(state => state.auth.data);

  const [userEvents, setUserEvents] = useState(ROWS.filter(el => el.userId === 1));
  const [orgEvents, setOrgEvents] = useState(ROWS.filter(el => el.orgId === 1));

  const [open, setOpen] = useState(false);
  const [openModalCreate, setOpenCreateModal] = useState(false);

  const [eventToEdit, setEventToEdit] = useState(null);
  const [newEvent, setNewEvent] = useState({});
 
  const [valueDate, setValueDate] = useState([
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);

  const [valueDateNewEvent, setValueDateNewEvent] = useState([
    dayjs(Date.now()),
    dayjs(Date.now()),
  ]);


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
    const startDate = convertStringToDate(event.start);
    const finishDate = convertStringToDate(event.finish);
    setValueDate([
      dayjs(startDate),
      dayjs(finishDate),
    ])
    setOpen(true);
  }

  const handleCloseEdit = () => {
    setOpen(false);
  }

  const changeEditCat = (e) => {
    setEventToEdit({ ...eventToEdit, cat: e.target.value });
  }

  const changeEditDescription = (e) => {
    setEventToEdit({ ...eventToEdit, description: e.target.value });
  }

  const changeEditType = (e) => {
    setEventToEdit({ ...eventToEdit, type: e.target.value });
  }

  const openCreateModal = () => {
    setOpenCreateModal(true);
  }
  const handleCreateModal = () => {
    setOpenCreateModal(false);
  }

  const changeCreateCat = (e) => {
    setNewEvent({...newEvent, cat: e.target.value});
  }

  const changeCreateDescription = (e) => {
    setNewEvent({...newEvent, description: e.target.value})
  }

  const changeCreateType = (e) => {
    setNewEvent({...newEvent, type: e.target.value})
  }

  const handleDateNewEvent = (e) => {
    console.log(e)
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
      <TransitionsModal open={open} handleClose={handleCloseEdit}>
        <Typography variant="h6" gutterBottom align='center'>
          Редактирование мероприятия
        </Typography>
        <form>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Категория</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={eventToEdit?.cat}
              onChange={changeEditCat}
              label="Категория"
            >
              {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
          <div>
            <TextField
              fullWidth
              id="filled-multiline-static"
              label="Название"
              multiline
              rows={4}
              defaultValue={eventToEdit?.description}
              variant="filled"
              onChange={changeEditDescription}
            />
          </div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="changeType">Тип</InputLabel>
            <Select
              labelId="changeType"
              value={eventToEdit?.type}
              onChange={changeEditType}
              label="Тип"
            >
              <MenuItem value={'закрытая'}>Открытое</MenuItem>
              <MenuItem value={'открытая'}>Закрытое</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DemoItem label="Выберите даты" component="DateRangePicker">
                <DateRangePicker
                  format={'DD/MM/YYYY'}
                  localeText={{ start: 'Начало', end: 'Конец' }}
                  value={valueDate}
                  onChange={(newValue) => setValueDate(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <Stack spacing={2} direction="row" mt={2}>
            <Button variant="contained" color="success" type="submit">Применить</Button>
            <Button variant="contained" color='error'>Отменить</Button>
          </Stack>
        </form>
      </TransitionsModal>

      <TransitionsModal open={openModalCreate} handleClose={handleCreateModal}>
        <Typography variant="h6" gutterBottom align='center'>
          Новое мероприятие
        </Typography>
        <form action="">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="createSelect">Категория</InputLabel>
            <Select
              labelId="createSelect"
              value={newEvent?.cat || ''}
              onChange={changeCreateCat}
              label="Категория"
            >
              {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
          <div>
            <TextField
              fullWidth
              label="Название"
              multiline
              rows={4}
              defaultValue={newEvent?.description || ''}
              variant="filled"
              onChange={changeCreateDescription}
            />
          </div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="changeTypeCreate">Тип</InputLabel>
            <Select
              labelId="changeTypeCreate"
              value={newEvent?.type || ''}
              onChange={changeCreateType}
              label="Тип"
            >
              <MenuItem value={'закрытая'}>Открытое</MenuItem>
              <MenuItem value={'открытая'}>Закрытое</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DemoItem label="Выберите даты" component="DateRangePicker">
                <DateRangePicker
                  format={'DD/MM/YYYY'}
                  localeText={{ start: 'Начало', end: 'Конец' }}
                  value={valueDateNewEvent}
                  onChange={handleDateNewEvent}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <Stack spacing={2} direction="row" mt={2}>
            <Button variant="contained" color="success" type="submit">Создать</Button>
            <Button variant="contained" color='error'>Отменить</Button>
          </Stack>
        </form>
      </TransitionsModal>
    </Box>
  )
}

export default ProfilePage