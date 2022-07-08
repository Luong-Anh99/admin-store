import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const hash = Cookies.get("auth");
let initAuth = hash ? hash : null;

//Expired
// if (token.exp < Date.now() / 1000) {
//   localStorage.removeItem("auth");
// } else {
//   dispatch(setAuth(auth));
// }

const initialState = {
  auth: initAuth,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action) => {
      state.auth = action.payload;
    },
    remove: (state) => {
      state.auth = null;
    },
  },
});

export const { set: setAuth, remove: removeAuth } = authSlice.actions;

export default authSlice.reducer;
