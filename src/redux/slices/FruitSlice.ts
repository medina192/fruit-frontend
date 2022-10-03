import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface Fruit {
    name: string,
    _id: string,
    price: number,
    score: number,
    imgUrl: string,
    stock: number
}

export interface Fruits {
    fruits: Fruit[],
    fruitSelected: Fruit
}



export const fruitSlice = createSlice({
    name: 'fruit',
    initialState: {
        fruits: [{ name: "", _id: "", price: 0, score: 0, imgUrl: "", stock: 0 }],
        fruitSelected: { name: "", _id: "", price: 0, score: 0, imgUrl: "", stock: 0 }
    },
  
    reducers: {
      setFruits: (state, action: PayloadAction<Fruits>) => {
          return action.payload;
      },
  
      setFruitSelected: (state, action: PayloadAction<Fruits>) => {
        return action.payload
      },
  
    },
  
  })
  
  // Action creators are generated for each case reducer function
  export const { setFruits, setFruitSelected } = fruitSlice.actions
  
  export default fruitSlice.reducer