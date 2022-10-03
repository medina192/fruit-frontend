import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'


export interface User {
  isLogged: boolean,
  name: string,
  uid: string
}

const lightTheme = {
    colors: {
        primary: "#ff0000",
        secondary: "#00ff00",
        font: "#0000ff",
        background: "#ffffff"
    },
    name: "light"
}

const darkTheme = {
    colors: {
        primary: "#ff0000",
        secondary: "#00ff00",
        font: "#0000ff",
        background: "#000000"
    },
    name: "dark"
}

export interface ThemeColors {
    colors: {
        primary: string,
        secondary: string,
        font: string,
        background: string,
    },
    name: string
}


  export const ThemeSlice = createSlice({
    name: 'theme',
    initialState: {
        colors: {
            primary: "#ff0000",
            secondary: "#00ff00",
            font: "#0000ff",
            background: "#ffffff"
        },
        name: "light"
    },
  
    reducers: {
      update: (state, action: PayloadAction<ThemeColors>) => {
        if(action.payload.name === state.name)
            return state
        switch(action.payload.name)
        {
            case "light":
                return lightTheme
            case "dark":
                return darkTheme
            default:
                return lightTheme
        }
      },
  

  
    }
  })








// Action creators are generated for each case reducer function
export const { update} = ThemeSlice.actions

export default ThemeSlice.reducer