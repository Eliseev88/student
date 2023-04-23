import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TransitionsModal from "../../Components/Modal/Modal";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { createEvent } from "../../store/slices/event/actionCreator";

const categories = ['Форум', 'Конференция', 'Олимпиада', 'Конкурс'];

function CreateEvent({ open, handleClose, token }) {

    const [newEvent, setNewEvent] = useState({});

    const dispatch = useDispatch();

    const [valueDateNewEvent, setValueDateNewEvent] = useState([
        dayjs(Date.now()),
        dayjs(Date.now()),
    ]);

    const changeCreateCat = (e) => {
        setNewEvent({ ...newEvent, cat: e.target.value });
    }

    const changeCreateTitle = (e) => {
        setNewEvent({ ...newEvent, title: e.target.value });
    }

    const changeCreateDescription = (e) => {
        setNewEvent({ ...newEvent, description: e.target.value })
    }

    const changeCreateType = (e) => {
        setNewEvent({ ...newEvent, type: e.target.value })
    }

    const handleDateNewEvent = (e) => {
        setValueDateNewEvent([e[0], e[1]]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const monthStart = valueDateNewEvent[0].month() + 1 < 10 ? 0 + String(valueDateNewEvent[0].month() + 1) : valueDateNewEvent[0].month() + 1;
        const monthFinish = valueDateNewEvent[1].month() + 1 < 10 ? 0 + String(valueDateNewEvent[1].month() + 1) : valueDateNewEvent[1].month() + 1;
        const dayStart = valueDateNewEvent[0].date() < 10 ? 0 + String(valueDateNewEvent[0].date()) : valueDateNewEvent[0].date();
        const dayFinish = valueDateNewEvent[1].date() < 10 ? 0 + String(valueDateNewEvent[1].date()) : valueDateNewEvent[1].date();
        const start = `${dayStart}-${monthStart}-${valueDateNewEvent[0].year()}`;
        const finish = `${dayFinish}-${monthFinish}-${valueDateNewEvent[1].year()}`;
        
        const obj = {
            event: {
                category: newEvent.cat,
                type: newEvent.type,
                title: newEvent.title,
                description: newEvent.description,
                start,
                finish,
            },
            token,
        }
        dispatch(createEvent(obj));
        handleClose();
    }

    const handleCancel = () => {
        handleClose();
    }
    return (
        <TransitionsModal open={open} handleClose={handleClose}>
            <Typography variant="h6" gutterBottom align='center'>
                Новое мероприятие
            </Typography>
            <form action="" onSubmit={handleSubmit}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="createSelect">Категория</InputLabel>
                    <Select
                        labelId="createSelect"
                        value={newEvent?.cat || ''}
                        onChange={changeCreateCat}
                        label="Категория"
                        required
                    >
                        {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                    </Select>
                </FormControl>
                <div style={{ marginBottom: '5px'}}>
                    <TextField
                        fullWidth
                        label="Название"
                        multiline
                        rows={2}
                        defaultValue={newEvent?.title || ''}
                        variant="filled"
                        required
                        onChange={changeCreateTitle}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Описание"
                        multiline
                        rows={4}
                        defaultValue={newEvent?.description || ''}
                        variant="filled"
                        required
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
                        required
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
                    <Button variant="contained" color='error' onClick={handleCancel}>Отменить</Button>
                </Stack>
            </form>
        </TransitionsModal>
    )
}

export default CreateEvent