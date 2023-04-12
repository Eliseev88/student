import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TransitionsModal from "../../Components/Modal/Modal";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { convertStringToDate } from "../../utils/filterTable";

const categories = ['Форум', 'Конференция', 'Олимпиада', 'Конкурс'];

function EditEvent({ open, handleCloseEdit, eventToEdit }) {

    const [valueDate, setValueDate] = useState([
        dayjs(Date.now()),
        dayjs(Date.now()),
    ]);

    const [eventEdit, setEventToEdit] = useState({});

    useEffect(() => {
        if (eventToEdit) {
            const startDate = convertStringToDate(eventToEdit.start);
            const finishDate = convertStringToDate(eventToEdit.finish);
            setValueDate([
                dayjs(startDate),
                dayjs(finishDate),
            ]);
            setEventToEdit(eventToEdit);
        }
    }, [eventToEdit]);

    const changeEditCat = (e) => {
        setEventToEdit({ ...eventEdit, cat: e.target.value });
    }

    const changeEditDescription = (e) => {
        setEventToEdit({ ...eventEdit, description: e.target.value });
    }

    const changeEditType = (e) => {
        setEventToEdit({ ...eventEdit, type: e.target.value });
    }

    return (
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
                        value={eventEdit?.cat || ''}
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
                        defaultValue={eventEdit?.description}
                        variant="filled"
                        onChange={changeEditDescription}
                    />
                </div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="changeType">Тип</InputLabel>
                    <Select
                        labelId="changeType"
                        value={eventEdit?.type || ''}
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
    )
}

export default EditEvent