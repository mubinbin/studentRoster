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
    { id: 'name', label: 'Dorm Name', minWidth: 80, fontWeight: "bold"},
    { id: 'students', label: 'Total Students', minWidth: 80, fontWeight: "bold"},
    { id: 'actions', label: 'Action', minWidth: 80, fontWeight: "bold" },
];

const useStyles = makeStyles({
    root: {
        width: '80%',
        height: '100%',
        background: 'none',
        margin: 'auto',
        borderRadius: '2rem',
    },
    container: {
        height: "100%",
        background: 'none',
        textAlign:'center',
    },
});

export default function DormTable(props) {
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
        <Paper elevation={5} className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    style={{ 
                        minWidth: column.minWidth,
                        fontWeight: column.fontWeight,
                        background: "none",
                        color: "#07336d",
                        textAlign:"center",
                        padding: "8px",
                    }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dorm, i) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={dorm.id}>
                        <TableCell style={{padding: "10px", textAlign: 'center'}}><Link style={{textDecoration:'none'}} to = {"/dorms/" + dorm.id}>{dorm.name}</Link></TableCell>
                        <TableCell style={{padding: "10px", textAlign: 'center'}}>{dorm.students.length}</TableCell>
                        <TableCell style={{padding: "10px", textAlign: 'center'}}>
                            <Delete 
                            callBack={props.callBack}
                            items="dorms" 
                            itemId={dorm.id}
                            />
                        </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={10}
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