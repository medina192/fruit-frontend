import { configureStore } from '@reduxjs/toolkit'
import ThemeSlice from './slices/ThemeSlice';
import { useDispatch } from 'react-redux'
import UserSlice from './slices/UserSlice';
import FruitSlice from './slices/FruitSlice';
import CitySlice from './slices/CitySlice';
import ModalSlice from './slices/ModalSlice';



export const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    user: UserSlice,
    fruit: FruitSlice,
    city: CitySlice,
    modal: ModalSlice
    //messages: messagesSlice,
    //move: moveScreenSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()