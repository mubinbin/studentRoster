import React, {useEffect, useState} from "react";

const CheckBox = props => {
    
    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        setIsChecked(props.checkedAll);
        props.setIsLoaded(true);
    }, [props.checkedAll, props.isLoaded]);

    const onChangeHandler = (e) =>{
        setIsChecked(!isChecked);
        props.callBack(e.target.checked, e.target.value)
    };

    return(
        <>
        {
            props.isLoaded &&
            <>
            <input 
            type="checkbox"
            value={props.item.id}
            checked={isChecked}
            onChange={onChangeHandler}
            />
            {
                props.student?
                <span> {props.item.firstName} {props.item.lastName}</span>
                :
                <span> {props.item.name}</span>
            }
            </>
        }
        </>
    );
};

export default CheckBox;