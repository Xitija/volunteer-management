import { configureStore } from "@reduxjs/toolkit";
import { volunteerSlice } from "../features/volunteers/volunteerSlice";
import { eventSlice } from "../features/events/eventSlice";

export default configureStore({
    reducer: {
        volunteers: volunteerSlice.reducer,
        events: eventSlice.reducer
    }
})
