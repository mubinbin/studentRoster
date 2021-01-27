import React, {useState, cloneElement, Children} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import "./Modal.css";
import IconButton from '@material-ui/core/IconButton';

export default function Modal(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // passing function to porps.children
    const children = Children.map(
        props.children, (child) => { return cloneElement(child, {handleClose: () => handleClose()}); }
    )

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const switchCase = (action) =>{
        switch (action) {
            case "Add New Student":
                action = <i className="fas fa-user-plus fa-sm"></i>;
                return action;
            case "Edit Student":
                action = <i class="fas fa-user-edit fa-sm"></i>;
                return action;
            case "Add New Dorm":
                action = <i className="fas fa-home fa-sm"></i>;
                return action;
            case "Edit Dorm":
                action = <i className="fas fa-cogs fa-sm"></i>;
                return action;
            case "Add New Course":
                action = <i className="fas fa-laptop fa-sm"></i>;
                return action;
            case "Edit Course":
                action = <i className="fas fa-laptop-code fa-sm"></i>;
                return action;
        }
    }

    return (
        <>
        {
            props.action.includes("Edit")?
            <IconButton title="Edit" color="primary" onClick={handleClickOpen}>
                {switchCase(props.action)}
            </IconButton>
            :
            <div className="modal-btn">
                <Button onClick={handleClickOpen}>
                    <small>{switchCase(props.action)} {props.action}</small>
                </Button>
            </div>
        }
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{props.modalTitle}</DialogTitle>
            <DialogContent>

            {children}

            <Button onClick={handleClose} variant="contained" color="secondary">Cancle</Button>
            </DialogContent>
        </Dialog>
        </>
    );
};