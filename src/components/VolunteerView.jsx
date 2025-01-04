import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VolunteerList from "../features/volunteers/volunteerList";
import { fetchVolunteers } from "../features/volunteers/volunteerSlice";


const VolunteerView = () => {
    const dispatch = useDispatch();
    const volunteers = useSelector((state) => state.volunteers.volunteers);
    const status = useSelector((state) => state.volunteers.status);
    const error = useSelector((state) => state.events.error);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchVolunteers())
        }
    }, [status,dispatch])

    return(
        <div>
            <h1>Volunteer View</h1>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <VolunteerList volunteers={volunteers}/>

            <h3>
                <Link to={`/volunteers/add`}>Add Volunteer</Link>
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

export default VolunteerView;
