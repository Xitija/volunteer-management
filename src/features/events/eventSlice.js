import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST_URL = "https://7e345cef-9359-46ee-90e1-e7b44648062c-00-1rbfgjdbpmix7.kirk.replit.dev";

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response = await axios.get(HOST_URL + "/events");
    return response.data;
})

export const addEventAsync = createAsyncThunk('events/addEventAsync', async (newEvent) => {
    const response = await axios.post(HOST_URL + "/events", newEvent);
    return response.data;
})

export const updateEventAsync = createAsyncThunk('events/updateEventAsync', async ({ id, updatedEvent }) => {
    const response = await axios.put(HOST_URL + `/events/${id}`, updatedEvent);
    return response.data;
})

export const deleteEventAsync = createAsyncThunk('events/deleteEventAsync', async (id) => {
    const response = await axios.delete(HOST_URL + `/events/${id}`);
    return {...response.data, id };
})

const initialState = {
    events: [],
    status: 'idle',
    error: null
}

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'success';
                state.events = action.payload
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(addEventAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addEventAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.events.push(action.payload);
            })
            .addCase(addEventAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(updateEventAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEventAsync.fulfilled, (state, action) => {
                state.status = 'success';
                const updatedEvent = action.payload;
                const index = state.events.findIndex((e) => e._id === updatedEvent._id)
                if (index !== -1) {
                    state.events[index] = updatedEvent;
                }
            })
            .addCase(updateEventAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(deleteEventAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEventAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.events = state.events.filter((event) => event._id !== action.payload.id)
            })
            .addCase(deleteEventAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
    }
})

export default eventSlice.reducer;
