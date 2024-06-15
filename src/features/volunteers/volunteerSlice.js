import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchEvents } from "../events/eventSlice";

const HOST_URL = "https://7e345cef-9359-46ee-90e1-e7b44648062c-00-1rbfgjdbpmix7.kirk.replit.dev/";

export const fetchVolunteers = createAsyncThunk('volunteers/fetchVolunteers', async () => {
    const response = await axios.get(HOST_URL + "/volunteers");
    return response.data;
})

export const addVolunteerAsync = createAsyncThunk('volunteers/addVolunteerAsync', async (newVolunteer) => {
    const response = await axios.post(HOST_URL + "/volunteers", newVolunteer);
    return response.data;
})

export const updateVolunteerAsync = createAsyncThunk('volunteers/updateVolunteerAsync', async ({ id, updatedVolunteer }) => {
    const response = await axios.put(HOST_URL + `/volunteers/${id}`, updatedVolunteer);
    return response.data;
})

export const deleteVolunteerAsync = createAsyncThunk('volunteers/deleteVolunteerAsync', async (id) => {
    const response = await axios.delete(HOST_URL + `/volunteers/${id}`);
    return response.data;
})

const initialState = {
    volunteers: [],
    status: 'idle',
    error: null
}

export const volunteerSlice = createSlice({
    name: 'volunteers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVolunteers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVolunteers.fulfilled, (state, action) => {
                state.status = 'success';
                state.events = action.payload
            })
            .addCase(fetchVolunteers.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(addVolunteerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addVolunteerAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.volunteers.push(action.payload);
            })
            .addCase(addVolunteerAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(updateVolunteerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateVolunteerAsync.fulfilled, (state, action) => {
                state.status = 'success';
                const updatedVolunteer = action.payload;
                const index = state.volunteers.findIndex((v) => v._id === updatedVolunteer._id)
                if (index !== -1) {
                    state.volunteers[index] = updatedVolunteer;
                }
            })
            .addCase(updateVolunteerAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(deleteVolunteerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteVolunteerAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.volunteers = state.volunteers.filter((volunteer) => volunteer._id !== action.payload._id) 
            })
            .addCase(deleteVolunteerAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
    }
})

export default volunteerSlice.reducer;
