import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import TransitionsModal from "../../Components/Modal/Modal";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { convertStringToDate } from "../../utils/filterTable";
import { editEvent } from "../../store/slices/event/actionCreator";
import { fetchOrgEvents } from "../../store/slices/orgEvents/actionsCreator";

const categories = ['Форум', 'Конференция', 'Олимпиада', 'Конкурс'];

function EditEvent({ open, handleCloseEdit, eventToEdit, token }) {

    const [valueDate, setValueDate] = useState([
        dayjs(Date.now()),
        dayjs(Date.now()),
    ]);

    const [eventEdit, setEventToEdit] = useState(eventToEdit);

    const [category, setCategory] = useState('');
    const [type, setType] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (eventToEdit) {
            const startDate = convertStringToDate(eventToEdit.start);
            const finishDate = convertStringToDate(eventToEdit.finish);
            setValueDate([
                dayjs(startDate),
                dayjs(finishDate),
            ]);
            setEventToEdit(eventToEdit);
            setCategory(eventToEdit.category.title);
            setType(eventToEdit.type)
        }
    }, [eventToEdit]);

    const changeEditCat = (e) => {
        setCategory(e.target.value);
    }

    const changeEditDescription = (e) => {
        setEventToEdit({ ...eventEdit, description: e.target.value });
    }

    const changeEditType = (e) => {
        setType(e.target.value);
    }

    const changeEditTitle = (e) => {
        setEventToEdit({ ...eventEdit, title: e.target.value });
    }

    const handleCancel = () => {
        handleCloseEdit();
    }

    const handleSumbit = (e) => {
        e.preventDefault();

        const monthStart = valueDate[0].month() + 1 < 10 ? 0 + String(valueDate[0].month() + 1) : valueDate[0].month() + 1;
        const monthFinish = valueDate[1].month() + 1 < 10 ? 0 + String(valueDate[1].month() + 1) : valueDate[1].month() + 1;
        const dayStart = valueDate[0].date() < 10 ? 0 + String(valueDate[0].date()) : valueDate[0].date();
        const dayFinish = valueDate[1].date() < 10 ? 0 + String(valueDate[1].date()) : valueDate[1].date();
        const start = `${dayStart}-${monthStart}-${valueDate[0].year()}`;
        const finish = `${dayFinish}-${monthFinish}-${valueDate[1].year()}`;

        const obj = {
            event: {
                id: eventToEdit.id,
                category,
                type,
                title: eventEdit.title,
                description: eventEdit.description,
                start,
                finish,
            },
            token,
        }
        dispatch(editEvent(obj));
        dispatch(fetchOrgEvents(token));
        handleCloseEdit();
    }
    const handleDateEvent = (e) => {
        setValueDate([e[0], e[1]]);
    }
    return (
        <TransitionsModal open={open} handleClose={handleCloseEdit}>
            <Typography variant="h6" gutterBottom align='center'>
                Редактирование мероприятия
            </Typography>
            <form onSubmit={handleSumbit}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Категория</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={category}
                        onChange={changeEditCat}
                        required
                        label="Категория"
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
                        defaultValue={eventEdit?.title || ''}
                        variant="filled"
                        required
                        onChange={changeEditTitle}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        id="filled-multiline-static"
                        label="Описание"
                        multiline
                        rows={4}
                        defaultValue={eventEdit?.description}
                        variant="filled"
                        required
                        onChange={changeEditDescription}
                    />
                </div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="changeType">Тип</InputLabel>
                    <Select
                        labelId="changeType"
                        value={type}
                        defaultValue={type}
                        onChange={changeEditType}
                        label="Тип"
                        required
                    >
                        <MenuItem value={'открытая'}>Открытое</MenuItem>
                        <MenuItem value={'закрытая'}>Закрытое</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangePicker']}>
                        <DemoItem label="Выберите даты" component="DateRangePicker">
                            <DateRangePicker
                                format={'DD/MM/YYYY'}
                                localeText={{ start: 'Начало', end: 'Конец' }}
                                value={valueDate}
                                required
                                onChange={handleDateEvent}
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                <Stack spacing={2} direction="row" mt={2}>
                    <Button variant="contained" color="success" type="submit">Применить</Button>
                    <Button variant="contained" color='error' onClick={handleCancel}>Отменить</Button>
                </Stack>
            </form>
        </TransitionsModal>
    )
}

export default EditEvent