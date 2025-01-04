import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import EventView from './components/EventView';
import VolunteerView from './components/VolunteerView';
import VolunteerForm from './features/volunteers/volunteerForm';
import EventForm from './features/events/eventForm';
import EventDetail from './features/events/eventDetail';
import VolunteerDetail from './features/volunteers/volunteerDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          Event Volunteer Management
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Events</Link>
            </li>
            <li>
              <Link to='/volunteers'>Volunteers</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/volunteers' element={<VolunteerView />}/>
          <Route path='/' element={<EventView />} />
          <Route path='/events/:id' element={<EventDetail/>}/>
          <Route path='/volunteers/:id' element={<VolunteerDetail/>}/>
          <Route path='/volunteers/add' element={<VolunteerForm/>} />
          <Route path='/volunteers/edit/:id' element={<VolunteerForm/>}/>
          <Route path='/events/add' element={<EventForm/>} />
          <Route path='/events/edit/:id' element={<EventForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
