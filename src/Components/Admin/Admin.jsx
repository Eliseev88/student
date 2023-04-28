import React, { useEffect, useState } from "react";
import { DataGrid, ruRU } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, updateRole } from "../../store/slices/users/actionsCreator";
import { Button, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU as coreRuRU, } from '@mui/material/locale';
import cl from './Admin.module.css';
import TransitionsModal from "../Modal/Modal";
import CreateNewUser from "./CreateNewUser";
import { usersSlice } from "../../store/slices/users/usersSlice";

function SelectRole(props) {
    const dispatch = useDispatch();
    const [value, setValue] = useState(props.row.role);

    const handleChange = (e) => {
        setValue(e.target.value);
        dispatch(updateRole({ id: props.row.userId, role: e.target.value }));
    }
    return (
        <strong>
            <FormControl sx={{ width: 150 }}>
                <Select
                    value={value}
                    onChange={handleChange}
                    defaultValue={props.row.role}
                >
                    <MenuItem value={'guest'}>Гость</MenuItem>
                    <MenuItem value={'student'}>Студент</MenuItem>
                    <MenuItem value={'organizer'}>Организатор</MenuItem>
                </Select>
            </FormControl>
        </strong>
    );
}


function Admin() {

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        ruRU,
        coreRuRU,
    );

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    const [rows, setRows] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users.length) {
            const obj = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i]['role'] === 'admin') continue;
                obj.push({
                    id: i + 1,
                    name: users[i]['name'],
                    email: users[i]['email'],
                    role: users[i]['role'],
                    userId: users[i]['id'],
                })
            }
            setRows(obj);
        }
    }, [users])

    const columns = [
        { field: 'id', headerName: '№', width: 100 },
        { field: 'name', headerName: 'Имя пользователя', width: 300 },
        { field: 'email', headerName: 'Электронная почта', width: 300 },
        {
            field: 'role',
            headerName: 'Тип учетной записи',
            width: 300,
            renderCell: SelectRole,
        },
    ];

    function defaultLabelDisplayedRows({ from, to, count }) {
        return `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`;
    }

    const handleModalOpen = () => {
        setIsOpen(!isOpen);
        dispatch(usersSlice.actions.setUser(null));
    }

    return (
        <div style={{ height: 'calc(100vh - 152px)', width: '100%', marginBottom: '10px' }}>
            <Typography variant="h4" gutterBottom>
                Список пользователей
            </Typography>
            <Button
                variant="contained"
                size="small"
                className={cl.createBtn}
                onClick={handleModalOpen}
            >
                Создать пользователя
            </Button>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    labelDisplayedRows={defaultLabelDisplayedRows}
                />
            </ThemeProvider>
            <TransitionsModal open={isOpen} handleClose={handleModalOpen}>
                <CreateNewUser />
            </TransitionsModal>
        </div>
    );
}

export default Admin