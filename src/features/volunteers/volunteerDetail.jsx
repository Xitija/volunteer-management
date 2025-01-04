import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";

import { deleteVolunteerAsync } from "./volunteerSlice";

const VolunteerDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const volunteer = useSelector((state) => state.volunteers.volunteers.find((volunteer) => volunteer._id === id));
    
    if(!volunteer) {
        return <div>Volunteer not found</div>
    }

    const handleDelete = (id) => {
        dispatch(deleteVolunteerAsync(id))
    }

    return (
        <div>
            <h2>Volunteer Detail</h2>
            <p>Name: {volunteer.name}</p>
            <p>Skills: {`${volunteer.skills}`}</p>
            Availability: {volunteer.availability}<br/>
            Areas of interest: {`${volunteer.areasOfInterest}`}<br/>
            Contact Info: <br/>
            Email: {volunteer.contactInfo.email}<br/>
            Phone No: {volunteer.contactInfo.phoneNumber}
            <div>
                <b>Assigned Events</b><br/>
                <ol>
                {
                    volunteer?.assignedEvents?.map(({event,role}) => (
                        event && (
                            <li key={event._id}>
                              <b><u>Name: {event.name}</u></b><br/>
                                Date: {event.date}<br/>
                                Location: {event.location}<br/>
                                Description: {event.description}<br/>
                                Type: {event.type}<br/>
                                <b><u>Role: {role}</u></b><br/>
                                
                                <div>
                                    <b>Required volunteers</b><br/>
                                    <ul>
                                    {
                                        event?.requiredVolunteers?.map((volunteer, index) => (
                                            <li key={index}>
                                                Role Name: {volunteer.roleName}<br/>
                                                Role Requirements: {volunteer.roleRequirements}<br/>
                                                Required Number: {volunteer.requiredNumber}
                                            </li>
                                        ))
                                    }
                                    </ul>
                                </div>
                            </li>
                        )
                    ))
                }
                </ol>
            </div>
            <Link to={`/volunteers/edit/${volunteer._id}`} state={volunteer}>
            Edit Details
            </Link>
            <button onClick={() => handleDelete(volunteer._id)}>Delete</button>
        </div>
    )
}

export default VolunteerDetail;
