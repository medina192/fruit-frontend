import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface User {
    isLogged: boolean,
    name: string,
    email: string
}



export const userSlice = createSlice({
    name: 'user',
    initialState: {
          isLogged: false,
          name: "",
          email: "",
    },
  
    reducers: {
      login: (state, action: PayloadAction<User>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        /*
        if(state.isLogged === action.payload.isLogged)
        {
          return state
        }
        else{
          return action.payload
        }
      */
          return action.payload;
      },
  
      logout: () => {
        return {
          isLogged: false,
          name: "",
          email: "",
        }
      },
  
    },
  
  })
  
  // Action creators are generated for each case reducer function
  export const { login, logout } = userSlice.actions
  
  export default userSlice.reducer