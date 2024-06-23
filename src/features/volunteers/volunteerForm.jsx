import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchEvents } from "../events/eventSlice";
import { addVolunteerAsync, updateVolunteerAsync } from "./volunteerSlice";

const VolunteerForm = () => {
    let { state } = useLocation();
    const events = useSelector((state) => state.events.events);
    const status = useSelector((state) => state.events.status);
    const volunteer = state ? state : null;
    const getCurrentAssignedEvents = () => {
        return volunteer.assignedEvents.map(({event,role}) => ({ event: event._id ,role}))
    }
    const [name, setName] = useState(volunteer ? volunteer.name :'')
    const [contactInfo, setContactInfo] = useState({
        email: volunteer ? volunteer.contactInfo.email :"",
        phoneNumber: volunteer ? volunteer.contactInfo.phoneNumber :"",
    });
    const [skills, setSkills] = useState(volunteer ? volunteer.skills :[]);
    const [availability, setAvailability] = useState(volunteer ? volunteer.availability : "");
    const [areasOfInterest, setAreasOfInterest] = useState(volunteer ? volunteer.areasOfInterest :[]);
    const [assignedEvents, setAssignedEvents] = useState(volunteer ? getCurrentAssignedEvents() : []);
    const dispatch = useDispatch();
   
    const getArrayVal = (value) => {
        return value.split(',');
    }

    const selectEvent = (eventUi,selectedEvent,roleName) => {
        // eventUi.preventDefault();
        const eventIndex = assignedEvents.findIndex(({event}) => event === selectedEvent._id)
        
        const eventFound = assignedEvents[eventIndex];
    
        if(!eventFound) {
            const event = {
                event: selectedEvent._id,
                role: roleName
            }
            setAssignedEvents((state) => [...state, event])
        } else {
            if (eventFound.role === roleName) {
                const remainingEvents = assignedEvents.filter(({event}) => event !== eventFound.event );
                setAssignedEvents(remainingEvents)
            } else {
                const updateEventRole = assignedEvents.map((event) => event.event === eventFound.event ?  {...event , role: roleName} : event);
                setAssignedEvents(updateEventRole);
            }
        }
    }

    const clearEvents = () => {
        setAssignedEvents([]);
    }

    const handleSubmit = () => {
        const newVolunteer = {
            name,
            contactInfo,
            skills,
            availability,
            areasOfInterest,
            assignedEvents
        }

        if(volunteer) {
            dispatch(
                updateVolunteerAsync({ id: volunteer._id, updatedVolunteer: newVolunteer})
            )
        } else {
            dispatch(addVolunteerAsync(newVolunteer))
        }
    }

    useEffect(() => {
        if(status === 'idle' ){
            dispatch(fetchEvents())
        }
    },[status, dispatch])

    return (
        <div>
            <h2>{ volunteer ? 'Edit Volunteer' : 'Add Volunteer' }</h2>
            <label className="accessiblity" htmlFor={name}>Name</label>
            <input type = "text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <br/>
            <label className="accessiblity">Email</label>
            <input type = "email" placeholder="Email" value={contactInfo.email} onChange={(e) => setContactInfo((state) => ({...state, email: e.target.value }))}/>
            <br/>
            <label className="accessiblity" htmlFor="phoneNumber">Phone Number</label>
            <input type = "number" placeholder="Phone number" value={contactInfo.phoneNumber} onChange={(e) => setContactInfo((state) => ({...state, phoneNumber: e.target.value }))}/>
            <br/>
            <label className="accessiblity" htmlFor="skills">Skills</label>
            <input type="text" placeholder="Enter comma seperated Skills" value={`${skills}`} onChange={(e) => setSkills(e.target.value.split(','))}/>
            <br/>
            <label className="accessiblity" htmlFor="areasOfInterest">Areas of Interest</label>
            <input type="text" placeholder="Enter comma seperated Areas of Interest" value={`${areasOfInterest}`} onChange={(e) => setAreasOfInterest(getArrayVal(e.target.value))}/>
            <br/>
            <label className="accessiblity" htmlFor="availability">Availability</label>
            <input type = "text" placeholder="Name" value={availability} onChange={(e) => setAvailability(e.target.value)}/>
            <div className="filters-category">
            <p>Select events you want to volunteer for</p>
            {events.map((e) => (
            <ul key={e._id}>
                {/* <input
                className=""
                type="checkbox"
                id={e.name}
                name={e.name}
                value={e.name}
                
                />
                <label className="accessiblity" htmlFor={e.name}>
                {e.name}
                </label> */}
                    <p>{e.name}</p>
                    {
                        e.requiredVolunteers.map((role) => (
                            <>
                                <input
                                    className=""
                                    id={role._id}
                                    type="radio"
                                    name={e.name}
                                    checked={assignedEvents.some((r) => r.role === role.roleName)}
                                    onChange={(event) => selectEvent(event, e, role.roleName)}
                                />
                                <label htmlFor={e.name}>{role.roleName}</label>
                            </>
                        ))
                    }
            </ul>
            ))}
            <button onClick={clearEvents}>Clear Events</button>
            </div>

            <button onClick={handleSubmit}>{ volunteer ? 'Edit Volunteer' : 'Add Volunteer' }</button>
        </div>
    )
}

export default VolunteerForm;
