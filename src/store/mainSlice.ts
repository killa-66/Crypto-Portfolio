import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

interface MainState {
  search: string
}

const initialState: MainState = {
  search: '',
}

export const mainSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    putSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { putSearch } = mainSlice.actions

export const selectSearch = (state: RootState) => state.mainSetings.search

export default mainSlice.reducer