import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

type User = {
    id: string;
    name: string;
    email: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = { user: null, loading: false, error: null };

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
            headers: {
                'authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error('Error fetching user data.');

        return await response.json();
    }
)

export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default userSlice.reducer;