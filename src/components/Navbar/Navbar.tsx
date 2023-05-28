import { Link } from "react-router-dom"
import cls from "./styles.module.css"
import {Button, Input} from "antd"
import { useRef, useState } from "react"
import { api } from "../../Api/Api"

const Navbar = () => {
  const inputRef: any = useRef()
  const [searchCoin, setSearchCoin] = useState("")

  const hendleSearchChange = (e: any) => {
    setSearchCoin(e.target.value);
  }
  
  const handleSearch = async () => {
    try {
      const response = await api.searchCoin(searchCoin);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cls.navbar}>
      <Link to="/">Main</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/watchlist">Watchlist</Link>
      <Input 
        placeholder='Find coin'
        ref={inputRef}
        value={searchCoin}
        onChange={hendleSearchChange}
      ></Input>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default Navbar