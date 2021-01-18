import React from "react";
import Modal from "../module/Modal.jsx";
import DormForm from "../dorm/DormForm.jsx";

const CreateOrEditDorm = props => {


    return(
        <>
        {
            props.curDorm?
            <>
                <Modal
                action = "Edit Dorm"
                modalTitile = "Eidt Dorm" 
                >
                    <DormForm />
                </Modal>
            </>
                :
            <>
                <Modal
                action = "Create New Dorm"
                modalTitile = "Create New Dorm" 
                >
                    <DormForm />
                </Modal>
            </>
        }
        </>
    );
};

export default CreateOrEditDorm;