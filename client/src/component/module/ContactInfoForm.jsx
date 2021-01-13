import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';



const ContactInfoForm = props => {

    const [updatedContactInfo, setUpdatedContactInfo] = useState(props.initialState)

    const onChangeHandler = (e) => {

        setUpdatedContactInfo({
            ...updatedContactInfo,
            [e.target.name]: e.target.value
        });

    };

    const onSubmitHandler = (e) => {

        e.preventDefault();
        props.callBack(updatedContactInfo);
        props.handleClose();

    };

    return(

        <form onSubmit={ onSubmitHandler }>

            <TextField
            autoFocus
            margin="dense"
            name="homeAddress"
            label="Home Address"
            type="text"
            fullWidth
            value={updatedContactInfo.homeAddress}
            onChange={onChangeHandler}
            />
            <br/>

            <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="text"
            fullWidth
            value={updatedContactInfo.email}
            onChange={onChangeHandler}
            />
            <br/>

            <TextField
            autoFocus
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={updatedContactInfo.phone}
            onChange={onChangeHandler}
            />
            <br/>

            <div style={{padding:"15px 15px 15px 0"}}>
                <Button type="submit" variant="contained" color="primary">{props.btn}</Button>
                <span className="col-sm-2"> </span>
                <Button onClick={props.handleClose} variant="contained" color="secondary">Cancle</Button>
            </div>
        </form>
    )

};

export default ContactInfoForm;