import { Link } from "react-router-dom";
const EventList = ({events}) => {
    return (
        <div>
            <h2>Event List</h2>
            <ul>
                {
                    events.map((event) => (
                        <li key={event._id}>
                            <Link to={`/events/${event._id}`}>
                                <p>{event.name}</p>
                                Date: {event.date} - Location: {event.location}
                                <br/>
                                Type: {event.type}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default EventList;
