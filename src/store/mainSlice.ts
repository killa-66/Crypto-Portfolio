import { CoinData } from './../components/CoinTable/CoinTable';
import { createSlice, isAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

interface MainState {
  search: string,
  savedCoins: CoinData[],
  selectedToken: CoinData[],
  selectedTokenIds: number[],
  balance: number,
  coin: CoinData,
  portfolio: PortfolioCoin[],
  coinsData: CoinData[],
  pagination: {
    current: number,
    pageSize: number,
  },
  selectedCoin: CoinData | null,
}

interface PortfolioCoin {
  coinName: string,
  purchasePrice: number,
  quantity: number,
  totalCost: number,
}

const initialState: MainState = {
  search: '',
  savedCoins: [],
  selectedToken: [],
  selectedTokenIds: [],
  //selectedtokenIds для дисейбла кнопки
  balance: 0,
  coin: {
    rank: 0,
    symbol: '',
    name: '',
    supply: '',
    maxSupply: '',
    volumeUsd24Hr: '',
    priceUsd: '',
  },
  portfolio: [],
  coinsData: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  selectedCoin: null,
}

export const mainSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    putSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    addSavedCoin: (state, action: PayloadAction<CoinData>) => {
      const coinExists = state.savedCoins.find(coin => coin.name === action.payload.name);
      if (!coinExists) {
        state.savedCoins.push(action.payload);
      }
    },
    selectTokenPortfolio: (state, action: PayloadAction<CoinData>) => {
      state.selectedToken.unshift(action.payload)
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    decreaseBalance: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
    removeCoinFromWatchList: (state, action) => {
      state.savedCoins = state.savedCoins.filter(coin => coin.name !== action.payload);
    },
    addToPortfolio: (state, action: PayloadAction<PortfolioCoin>) => {
      state.portfolio.push(action.payload);
    },
    selectTokenFromId: (state, action: PayloadAction<number>) => {
      state.selectedTokenIds.push(action.payload)
    },
    setCoinsData: (state, action: PayloadAction<CoinData[]>) => {
      state.coinsData = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.current = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
    },
    setSelectedCoin: (state, action: PayloadAction<CoinData | null>) => {
      state.selectedCoin = action.payload;
    },
  },
})

export const { putSearch, addSavedCoin, selectTokenPortfolio, setBalance, decreaseBalance, removeCoinFromWatchList, addToPortfolio,selectTokenFromId, setCoinsData, setCurrentPage, setPageSize, setSelectedCoin } = mainSlice.actions

export const selectSearch = (state: RootState) => state.mainSetings.search
export const selectSavedCoins = (state: RootState) => state.mainSetings.savedCoins; 
export const selectTokenPortfolioForBuy = (state: RootState) => state.mainSetings.selectedToken;
export const setBalanceAccount = (state: RootState) => state.mainSetings.balance;
export const decreaseBalanceAccount = (state: RootState) => state.mainSetings.balance;
export const selectPortfolio = (state: RootState) => state.mainSetings.portfolio;
export const seelectTokenFromIds = (state: RootState) => state.mainSetings.selectedTokenIds;
export const selectCoinsData = (state: RootState) => state.mainSetings.coinsData;
export const selectCurrentPage = (state: RootState) => state.mainSetings.pagination.current
export const selectPageSize = (state: RootState) => state.mainSetings.pagination.pageSize
export const selectSelectedCoin = (state: RootState) => state.mainSetings.selectedCoin;

export default mainSlice.reducer