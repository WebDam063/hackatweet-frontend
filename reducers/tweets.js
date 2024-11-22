import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};
export const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        addAllTweetsToStore: (state, action) => {
            action.payload.forEach(obj => {
                if (!state.value.some(item => item._id === obj._id)) {
                    state.value.push(obj);
                }
            })
        },
        addTweetToStore: (state, action) => {
            state.value.push(action.payload);
        },
        removeTweetFromStore: (state, action) => {
            state.value = state.value.filter((element) => element._id !== action.payload);
        },
        removeAllTweets: (state) => {
            state.value = []
        }
    },
});

export const { addTweetToStore, addAllTweetsToStore, removeAllTweets, removeTweetFromStore } = tweetsSlice.actions;
export default tweetsSlice.reducer;
