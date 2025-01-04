import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EventList from "../features/events/eventList";
import { fetchEvents } from "../features/events/eventSlice";

const EventView = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.events);
    const status = useSelector((state) => state.events.status);
    const error = useSelector((state) => state.events.error);

    useEffect(() => {
        if(status === 'idle' ){
            dispatch(fetchEvents())
        }
    },[status,dispatch])

    return (
        <div>
            <h1>Event View</h1>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <EventList events={events} />

            <h3>
                <Link to={`/events/add`}>Add Event</Link>
            </h3>
            {error && (
                <div>
                    <h2>Server Not Active 😨</h2>
                    <h3>
                        <a
                        href="https://drive.google.com/file/d/18HhVn-pQ-YhYV7Xfo9SJ2OwXIi650T4A/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Click here to view video
                        </a>
                    </h3>
                </div>
            )}
        </div>
    )
}

export default EventView;