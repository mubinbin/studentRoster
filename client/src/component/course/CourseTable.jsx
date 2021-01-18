import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "@reach/router";
import Delete from "../module/Delete.jsx";

const columns = [
    { id: 'name', label: 'course Name', minWidth: 100, fontWeight: "bold"},
    { id: 'students', label: 'Total Students', minWidth: 100, fontWeight: "bold"},
    { id: 'actions', label: 'Action', minWidth: 170, fontWeight: "bold" },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: "100vh",
    },
});

export default function CourseTable(props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    return (
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: column.fontWeight }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={course.id}>
                        <TableCell><Link to = {"/courses/" + course.id}>{course.name}</Link></TableCell>
                        <TableCell>{course.students.length}</TableCell>
                        <TableCell>
                            <Delete 
                            callBack = {props.callBack}
                            items = "courses"
                            itemId = {course.id}
                            />
                        </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
    );
}