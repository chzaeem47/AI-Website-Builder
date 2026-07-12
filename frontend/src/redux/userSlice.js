import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    darkMode: false, 
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setUserData, toggleTheme } = userSlice.actions;
export default userSlice.reducer;