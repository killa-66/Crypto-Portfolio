import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { CoinData } from '../components/CoinTable/CoinTable'

interface MainState {
  search: string,
  savedCoins: CoinData[]
}

const initialState: MainState = {
  search: '',
  savedCoins: []
}

export const mainSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    putSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    addSavedCoin: (state, action: PayloadAction<CoinData>) => {
      state.savedCoins.push(action.payload);
    },
  },
})

export const { putSearch, addSavedCoin } = mainSlice.actions

export const selectSearch = (state: RootState) => state.mainSetings.search
export const selectSavedCoins = (state: RootState) => state.mainSetings.savedCoins; 

export default mainSlice.reducer