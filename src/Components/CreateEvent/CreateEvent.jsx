import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import TransitionsModal from "../../Components/Modal/Modal";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const categories = ['Форум', 'Конференция', 'Олимпиада', 'Конкурс'];

function CreateEvent({ open, handleClose }) {

    const [newEvent, setNewEvent] = useState({});

    const [valueDateNewEvent, setValueDateNewEvent] = useState([
        dayjs(Date.now()),
        dayjs(Date.now()),
    ]);

    const changeCreateCat = (e) => {
        setNewEvent({ ...newEvent, cat: e.target.value });
    }

    const changeCreateDescription = (e) => {
        setNewEvent({ ...newEvent, description: e.target.value })
    }

    const changeCreateType = (e) => {
        setNewEvent({ ...newEvent, type: e.target.value })
    }

    const handleDateNewEvent = (e) => {
        console.log(e)
    }
    return (
        <TransitionsModal open={open} handleClose={handleClose}>
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
    )
}

export default CreateEvent