import { createSlice } from "@reduxjs/toolkit";

function findIndex(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return i;
    }
  }
  return null;
}

const Slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    saveAll: (state, action) => {
      return action.payload;
    },
    plus: (state, action) => {
      let { id } = action.payload;
      let index = findIndex(state, id);
      if (index != null) {
        state[index].quantity = (state[index].quantity || 0) + 1;
      }
    },
    minus: (state, action) => {
      let { id } = action.payload;
      let index = findIndex(state, id);
      if (index != null) {
        state[index].quantity = (state[index].quantity || 0) - 1;
      }
    },
    remove: (state, action) => {
      let { id } = action.payload;
      return state.filter((ele) => ele.id != id);
    },
  },
});

export const { saveAll, plus, minus, remove } = Slice.actions;
export default Slice.reducer;