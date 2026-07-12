import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,

    darkMode: localStorage.getItem("darkMode") === "true",
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;

      localStorage.setItem("darkMode", state.darkMode);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    
  },
});

export const { toggleTheme, setUserData } = userSlice.actions;
export default userSlice.reducer;