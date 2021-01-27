import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import "./SelectDormForm.css";

const SelectDormForm = props =>{

    const [allDorms, setAllDorms] = useState([]);
    const [selectedDorm, setSelectedDorm] = useState({});
    const [curStudent, setCurStudent] = useState(props.curStudent);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/dorms")
        .then(res=>{
            if(props.dorm){
                res.data = res.data.filter(dorm => dorm.id !== props.dorm.id);
            }
            setAllDorms(res.data);
        })
        .catch(err=>{
            console.log("Error on getting all dorms. Details: " + err);
        });
        return(()=> {setAllDorms([])})
    },[props.dorm])

    const onChangeHandler = e =>{
        setCurStudent({
            ...curStudent,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e =>{
        e.preventDefault();
        props.callBack(curStudent)
    };

    return(

        <form className="select-dorm-form" onSubmit = {onSubmitHandler}>

            <FormControl style={{minWidth: 200}}>
                <InputLabel>Assign a Dormity</InputLabel>
                <Select
                name="dorm"
                displayEmpty
                onChange={onChangeHandler}
                >
                    {allDorms.map((dorm, i)=>{
                        return(
                            <MenuItem  value={dorm}  key={i}>{dorm.name}</MenuItem >
                        );
                    })}
                </Select>
            </FormControl>
            <small className="sdf-small"><input type="submit" value="ASSIGN"/></small>
        </form>

    );


};

export default SelectDormForm;