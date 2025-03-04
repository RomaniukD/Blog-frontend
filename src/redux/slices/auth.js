import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me');
    return data;
});

const initialState = {
    data: null,
    status: "loading",
};

const handleState = (state, { type, payload }) => {
    state.status = type;
    state.data = payload || null;
};

const createReducers = (actions) => Object.fromEntries(
    ['pending', 'fulfilled', 'rejected'].map((status) => [
        actions[status], (state, action) => handleState(state, { 
            type: status === 'fulfilled' ? 'loaded' : status, 
            payload: action?.payload 
        })
    ])
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        ...createReducers(fetchAuth),
        ...createReducers(fetchAuthMe),
        ...createReducers(fetchRegister),
    }
})

export const selectIsAuth = state => Boolean(state.auth.data); 

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;