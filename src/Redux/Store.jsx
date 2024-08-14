import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";

const Store = configureStore({
  reducer: {
    store: Slice,
  },
});

export default Store;