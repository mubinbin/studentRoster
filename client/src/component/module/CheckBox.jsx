import React, {useEffect, useState} from "react";

const CheckBox = props => {
    
    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        setIsChecked(props.checkedAll);
    }, [props.checkedAll]);

    const onChangeHandler = (e) =>{
        setIsChecked(!isChecked);
        props.callBack(e.target.checked, e.target.value)
    };

    return(
        <>
            <input 
            type="checkbox"
            value={props.item.id}
            checked={isChecked}
            onChange={onChangeHandler}
            />
            <span> {props.item.name}</span>
        </>
    );
};

export default CheckBox;