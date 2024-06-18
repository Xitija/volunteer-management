import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addEventAsync, updateEventAsync } from "./eventSlice";

const EventForm = () => {
    let {state} = useLocation();

    const event = state ? state : null;

    const [name, setName] = useState(event ? event.name : '');
    const [date, setDate] = useState(event ? event.date: '');
    const [eventLocation, setEventLocation] = useState(event ? event.location : '')
    const [description, setDescription] = useState(event ? event.description : '')
    const [type, setType] = useState(event ? event.type:'');
    const [requiredVolunteers, setRequiredVolunteers] = useState(event ? event.requiredVolunteers : []);

    const initialVolunteerState = {
        roleName : "",
        roleRequirements: "",
        requiredNumber: 0
    }
    const [volunteer, setVolunteer] = useState(initialVolunteerState)

    const dispatch = useDispatch();

    const addVolunteer = () => {
        console.log(volunteer,"voll")
        setRequiredVolunteers((state) => ([...state, {...volunteer, requiredNumber : parseInt(volunteer.requiredNumber)}]))
        setVolunteer(initialVolunteerState)
        console.log(requiredVolunteers,"requiredVolunteers")
    }

    const removeVolunteer = (volunteer) => {
        console.log(volunteer,"volunter rem")
        const remainingVolunteers = requiredVolunteers.filter(({roleName}) => roleName !== volunteer.roleName)
        setRequiredVolunteers(remainingVolunteers);
    }

    const handleSubmit = () => {

        const newEvent = {
            name,
            date,
            location: eventLocation,
            description,
            type,
            requiredVolunteers
        }

        if(event) {
            dispatch(
                updateEventAsync({ id : event._id, updatedEvent : newEvent})
            )
        } else {
            dispatch(addEventAsync(newEvent))
        }
    }

    return (
        <div>
            <h2>{ event ? 'Edit Event' : 'Add Event' }</h2>
            <input type = "text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type = "date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type = "text" placeholder="Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)}/>
            <input type = "text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type = "text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)}/>
            <div>
                <b>Required volunteers</b><br/>
                {
                    requiredVolunteers?.map((volunteer, index) => (
                        <li key={index}>
                            Role Name: {volunteer.roleName}<br/>
                            Role Requirements: {volunteer.roleRequirements}<br/>
                            Required Number: {volunteer.requiredNumber}
                            <button onClick={() => removeVolunteer(volunteer)}>Remove</button>
                        </li>
                    ))
                }
                <input type="text" placeholder="Role name" value={volunteer.roleName} onChange={(e) => setVolunteer((state) => ({...state, roleName: e.target.value}))}/>
                <input type="text" placeholder="Role Requirements" value={volunteer.roleRequirements} onChange={(e) => setVolunteer((state) => ({...state, roleRequirements: e.target.value}))}/>
                <input type="number" placeholder="Required number" value={volunteer.requiredNumber} onChange={(e) => setVolunteer((state) => ({...state, requiredNumber: e.target.value}))}/>
                <button onClick={addVolunteer}>Add Volunteer Role Information</button>
            </div>
            <button onClick={handleSubmit}>{ event ? 'Edit Event' : 'Add Event' }</button>
        </div>
    )
}

export default EventForm;