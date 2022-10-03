import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface City {
    name: string,
    _id: string
}

export interface Cities {
    cities: City[],
    citySelected: City
}



export const citySlice = createSlice({
    name: 'city',
    initialState: {
        cities: [ { name: "", _id: ""} ],
        citySelected: { name: "", _id: ""}
    },
  
    reducers: {
      setCities: (state, action: PayloadAction<Cities>) => {
          return action.payload;
      },
  
      setCitySelected: (state, action: PayloadAction<Cities>) => {
        return action.payload
      },
  
    },
  
  })
  
  // Action creators are generated for each case reducer function
  export const { setCities, setCitySelected } = citySlice.actions
  
  export default citySlice.reducer