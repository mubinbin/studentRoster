import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ContactInfoForm from "./ContactInfoForm";

export default function Modal(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button color="primary" onClick={handleClickOpen}>
            {props.action}
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{props.modalTitle}</DialogTitle>
            <DialogContent>
            
            <ContactInfoForm
            initialState={props.initialState}
            updateContactInfo={props.updateContactInfo}
            handleClose={handleClose}
            btn={props.action==="Add Contact Information"? "Add Contact Information":"Update Contact Information"}
            />
            
            </DialogContent>
        </Dialog>
        </div>
    );
};