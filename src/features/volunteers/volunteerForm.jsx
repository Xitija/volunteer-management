import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addVolunteerAsync, updateVolunteerAsync } from "./volunteerSlice";

const VolunteerForm = () => {
    let {state} = useLocation();

    const volunteer = state ? state : null;

    const [name, setName] = useState(volunteer ? volunteer.name :'')

    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newVolunteer = {}

        if(volunteer) {
            dispatch(
                updateVolunteerAsync({ id: volunteer._id, updatedVolunteer: newVolunteer})
            )
        } else {
            dispatch(addVolunteerAsync(newVolunteer))
        }

    }

    return (
        <div>
            <h2>{ volunteer ? 'Edit Volunteer' : 'Add Volunteer' }</h2>
        </div>
    )
}

export default VolunteerForm;
