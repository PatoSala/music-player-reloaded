import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const queueSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    addToQueue: (state, song) => {
        state.value = [...state.value, song];
    },
    removeFirstFromQueue: (state) => {
        let filterArray = state.value.filter(song => state.value.indexOf(song) > 0);
        console.log('before: ', state.value.length, 'after: ', filterArray.length);
        state.value = filterArray;
    },
    clearQueue: (state) => {
        state.value = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToQueue, removeFirstFromQueue, clearQueue } = queueSlice.actions

export default queueSlice.reducer