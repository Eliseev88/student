import { useDispatch, useSelector } from 'react-redux'
import { 
    setFilterCat, 
    setFilterDate, 
    setFilterType, 
    setFilterRate, 
    resetFormFilters, 
} from '../../store/slices/filterFormSlice';
import { setFilters, resetFilters } from '../../store/slices/filterSlice';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import cl from './Filters.module.css';
import "dayjs/locale/ru";

dayjs.locale('ru');

function Filters({ closeModal }) {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filterForm);

    const categoriesUniq = ['Форум', 'Конференция', 'Олимпиада', 'Конкурс']

    const onDateChange = (newValue) => {
        dispatch(setFilterDate(new Date(newValue.toString()).getTime()));
    }

    const onChangeType = (event) => {
        dispatch(setFilterType(event.target.value));
    };

    const onChangeCategory = (event) => {
        dispatch(setFilterCat(event.target.value));
    }

    const onChangeRate = (event) => {
        dispatch(setFilterRate(event.target.value))
    }

    const clearFilter = () => {
        dispatch(resetFilters());
        dispatch(resetFormFilters());
    }

    const applyFilters = () => {
        dispatch(setFilters(filters));
        closeModal();
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Фильтры
            </Typography>
            <FormControl fullWidth className={cl.filter}>
                <InputLabel id="type">Тип</InputLabel>
                <Select
                    labelId="type"
                    value={filters?.type || ''}
                    label="Тип"
                    onChange={onChangeType}
                >
                    <MenuItem value={'открытая'}>Открытое</MenuItem>
                    <MenuItem value={'закрытая'}>Закрытое</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth className={cl.filter}>
                <InputLabel id="cat">Наименование</InputLabel>
                <Select
                    labelId="cat"
                    value={filters?.cat || ''}
                    label="Наименование"
                    onChange={onChangeCategory}
                >
                    {categoriesUniq.map(el => (
                        <MenuItem key={el} value={el}>{el}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth className={cl.filter}>
                <InputLabel id="rate">Рейтинг</InputLabel>
                <Select
                    labelId="rate"
                    value={filters?.rate || ''}
                    label="Рейтинг"
                    onChange={onChangeRate}
                >
                    <MenuItem value={1}>от 1 звезды</MenuItem>
                    <MenuItem value={2}>от 2 звезд</MenuItem>
                    <MenuItem value={3}>от 3 звезд</MenuItem>
                    <MenuItem value={4}>от 4 звезд</MenuItem>
                    <MenuItem value={5}>5 звезд</MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DemoItem label="Выберите дату">
                        <DatePicker onChange={onDateChange} value={dayjs(filters.date)} />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
            <Stack spacing={2} direction="row" mt={2}>
                <Button variant="contained" onClick={applyFilters}>Применить</Button>
                <Button variant="outlined" onClick={clearFilter}>Очистить</Button>
            </Stack>
        </Box>
    )
}

export default Filters