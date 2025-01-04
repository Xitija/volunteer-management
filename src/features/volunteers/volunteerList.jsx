import { Link } from "react-router-dom";
const VolunteerList = ({volunteers}) => {
    return (
        <div>
            <h2>Volunteer List</h2>
            <ul>
                {
                    volunteers.map((volunteer) => (
                        <li key={volunteer._id}>
                            <Link to={`/volunteers/${volunteer._id}`}>
                                <p>{volunteer.name}</p>
                                Email: {volunteer.contactInfo.email}
                                Phone: {volunteer.contactInfo.phoneNumber} 
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default VolunteerList;
