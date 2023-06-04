import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './mainSlice'


export const store = configureStore({
  reducer: {
    mainSetings: mainReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch