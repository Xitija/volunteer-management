import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { deleteEventAsync } from "./eventSlice";

const EventDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const event = useSelector((state) => state.events.events.find((event) => event._id === id));

    if (!event) {
        return <div>Event not found</div>
    }

    const handleDelete = (id) => {
        dispatch(deleteEventAsync(id))
    }

    return (
        <div>
            <h2>Event Detail</h2>
            <p>Name: {event.name}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            <p>Type: {event.type}</p>
            <div>
                Required volunteers<br/>
                {
                    event?.requiredVolunteers?.map((volunteer, index) => (
                        <li key={index}>
                            Role Name: {volunteer.roleName}<br/>
                            Role Requirements: {volunteer.roleRequirements}<br/>
                            Required Number: {volunteer.requiredNumber}
                        </li>
                    ))
                }
            </div>
            <div>
                Registered Volunteers<br/>
                {
                    event?.registerVolunteers?.map((volunteer) => (
                        volunteer && (
                            <li>
                                Name: {volunteer.name}
                                Skills : {JSON.stringify(volunteer.skills)}
                                Availability: {volunteer.availability}
                                Areas of interest: {`${volunteer.areasOfInterest}`}
                                Contact Info: 
                                Email: {volunteer.contactInfo.email}
                                Phone No: {volunteer.contactInfo.phoneNumber}
                            </li>
                        )
                    ))
                }
            </div>
            <Link to={`/events/edit/${event._id}`} state={event}>
            Edit Details
            </Link>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
        </div>
    )
}

export default EventDetail;