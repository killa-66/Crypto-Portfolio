import { Link } from "react-router-dom"
import cls from "./styles.module.css"
import {Button, Input} from "antd"
import { useEffect, useRef, useState } from "react"
import { api } from "../../Api/Api"
import { putSearch } from "../../store/mainSlice"
import { useDispatch as useAppDispatch} from "react-redux"

const Navbar = () => {
  const dispatch = useAppDispatch()
  const inputRef: any = useRef()
  const [searchCoin, setSearchCoin] = useState("")

  const handleSearchChange = (e: any) => {
    setSearchCoin(e.target.value);
  }
  
  const handleSearch = async () => {
    dispatch(putSearch(searchCoin))
    try {
      const response = await api.searchCoin(searchCoin);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(searchCoin)
    if(!searchCoin) {
      console.log('here')
      dispatch(putSearch(''))
    }

  }, [searchCoin])

  return (
    <div className={cls.navbar}>
      <Link to="/">Main</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/watchlist">Watchlist</Link>
      <Input 
        placeholder='Find coin'
        ref={inputRef}
        value={searchCoin}
        onChange={handleSearchChange}
      ></Input>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default Navbar

function useDispatch() {
  throw new Error("Function not implemented.")
}
