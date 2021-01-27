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
import "./StudentTable.css";

const columns = [
    { id: 'name', label: 'Student Name', minWidth: 80, fontWeight: "bold" },
    { id: 'age', label: 'Age', minWidth: 80, fontWeight: "bold" },
    { id: 'actions', label: 'Assigned a Dromity?', minWidth: 80, fontWeight: "bold" },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        background: 'none',
        borderRadius: '2rem',
    },
    container: {
        height: "100%",
        background: 'none',
        textAlign:'center',
    }
});

export default function StudentTable(props) {
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
                {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>
                        <TableCell style={{padding: "10px", textAlign: 'center'}}><Link style={{textDecoration:'none'}} to = {"/students/" + student.id}>{student.firstName} {student.lastName}</Link></TableCell>
                        <TableCell style={{padding: "10px", textAlign: 'center'}}>{student.age}</TableCell>
                        <TableCell style={{padding: "10px", textAlign: 'center'}}>
                            {
                                student.dorm === null? 
                                <p className="assign-dorm-no">NO</p>
                                :
                                <p className="assign-dorm-yes">YES</p>
                            }
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