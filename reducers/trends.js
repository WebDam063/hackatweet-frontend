import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};
export const trendsSlice = createSlice({
    name: 'trends',
    initialState,
    reducers: {
        addAllTrendsToStore: (state, action) => {
            state.value = action.payload
        },
        addTrendsToStore: (state, action) => {
            action.payload.forEach(element => {
                state.value.push(element);
            });
        },
        removeAllTrends: (state) => {
            state.value = []
        }
    },
});

export const { addAllTrendsToStore, addTrendsToStore, removeAllTrends } = trendsSlice.actions;
export default trendsSlice.reducer;
