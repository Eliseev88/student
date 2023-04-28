import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import { EnhancedTableToolbar } from './TableToolbar';
import cl from './Table.module.css';
import { EnhancedTableHead } from './TableHead';
import { stableSort, getComparator, sortRowsByDate } from '../../utils/sortingTable';
import { useNavigate } from "react-router-dom";
import Filters from '../Filters/Filters';
import TransitionsModal from '../Modal/Modal';
import { filterTable } from '../../utils/filterTable';
import { fetchEvents } from '../../store/slices/event/actionCreator';
import { CircularProgress } from '@mui/material';

const DEFAULT_ORDER = 'desc';
const DEFAULT_ORDER_BY = 'id';
const DEFAULT_ROWS_PER_PAGE = 5;

export default function EnhancedTable() {
    // Sort and pagination
    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [visibleRows, setVisibleRows] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = useState(0);
    const [rows, setRows] = useState([]);
    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Filters
    const { data: filter } = useSelector((state) => state.filter);

    // Search
    const { data: search } = useSelector(state => state.search);

    const dispatch = useDispatch();
    const { events, isLoading } = useSelector(state => state.events);

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch]);

    useEffect(() => {
        setRows(events)
    }, [events]);

    useEffect(() => {
        if (!search) {
            setRows(events);
            return;
        }
        setRows(events.filter(el => el.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, events]);

    const navigate = useNavigate();

    useEffect(() => {
        let rowsOnMount = stableSort(
            rows,
            getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
        );

        rowsOnMount = rowsOnMount.slice(
            0 * DEFAULT_ROWS_PER_PAGE,
            0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
        );

        setVisibleRows(rowsOnMount);
    }, [rows]);

    const handleRequestSort = useCallback(
        (event, newOrderBy) => {
            const isAsc = orderBy === newOrderBy && order === 'asc';
            const toggledOrder = isAsc ? 'desc' : 'asc';
            setOrder(toggledOrder);
            setOrderBy(newOrderBy);

            if (event.target.id === 'Дата начала') {
                const sortedRows = sortRowsByDate(rows, 'start', order);
                const updatedRows = sortedRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                );

                setVisibleRows(updatedRows);
                return;
            }

            if (event.target.id === 'Дата окончания') {
                const sortedRows = sortRowsByDate(rows, 'finish', order);
                const updatedRows = sortedRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                );

                setVisibleRows(updatedRows);
                return;
            }

            const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
            const updatedRows = sortedRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            );

            setVisibleRows(updatedRows);
        },
        [order, orderBy, page, rowsPerPage, rows],
    );

    const handleClickOnRow = (event, id) => {
        navigate('/events/' + id);
    };

    const handleChangePage = useCallback(
        (event, newPage) => {
            setPage(newPage);

            const sortedRows = stableSort(rows, getComparator(order, orderBy));
            const updatedRows = sortedRows.slice(
                newPage * rowsPerPage,
                newPage * rowsPerPage + rowsPerPage,
            );

            setVisibleRows(updatedRows);

            // Avoid a layout jump when reaching the last page with empty rows.
            const numEmptyRows =
                newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

            const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
            setPaddingHeight(newPaddingHeight);
        },
        [order, orderBy, dense, rowsPerPage, rows],
    );

    const handleChangeRowsPerPage = useCallback(
        (event) => {
            const updatedRowsPerPage = parseInt(event.target.value, 10);
            setRowsPerPage(updatedRowsPerPage);

            setPage(0);

            const sortedRows = stableSort(rows, getComparator(order, orderBy));
            const updatedRows = sortedRows.slice(
                0 * updatedRowsPerPage,
                0 * updatedRowsPerPage + updatedRowsPerPage,
            );

            setVisibleRows(updatedRows);
            setPaddingHeight(0);
        },
        [order, orderBy, rows],
    );

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    function defaultLabelDisplayedRows({ from, to, count }) {
        return `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`;
    }

    useEffect(() => {
        if (filter) {
            filterTable(filter, setRows, events);
        }
        if (!filter) {
            setRows(events);
        }
    }, [filter, events]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar handleOpen={handleOpen} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows
                                ? visibleRows.map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClickOnRow(event, row.id)}
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell align="left">{row.category?.title}</TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="left">{row.start}</TableCell>
                                            <TableCell align="left">{row.finish}</TableCell>
                                            <TableCell align="left">{row.type}</TableCell>
                                            <TableCell align="right" className={cl.rateCell}>
                                                <Rating name="half-rating-read" defaultValue={row.rate} precision={0.5} readOnly />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                                : null}
                            {!rows.length && !isLoading && <TableRow><TableCell colSpan={6}>Мероприятий не найдено</TableCell></TableRow>}
                            {paddingHeight > 0 && (
                                <TableRow
                                    style={{
                                        height: paddingHeight,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <CircularProgress />
                    </Box>}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage='Мероприятий на странице'
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={defaultLabelDisplayedRows}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} className={cl.switch} />}
                label="Компактный вид"
            />
            <TransitionsModal open={open} handleClose={handleClose}>
                <Filters closeModal={handleClose} />
            </TransitionsModal>
        </Box>
    );
}
