import { Link } from "react-router-dom"
import cls from "./styles.module.css"
import {Button, Input, Modal} from "antd"
import { useEffect, useRef, useState } from "react"
import { api } from "../../Api/Api"
import { putSearch } from "../../store/mainSlice"
import { useDispatch as useAppDispatch} from "react-redux"

const Navbar = () => {
  const dispatch = useAppDispatch()
  const inputRef: any = useRef()
  const [searchCoin, setSearchCoin] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [modalInputValue, setModalInputValue] = useState(""); 

  function handleOpenModal() {
    setIsOpen(true);
  }
  
  function handleOk() {
    setIsOpen(false)
  }
  function handleCloseModal() {
    setIsOpen(false)
  }

  const handleSearchChange = (e: any) => {
    setSearchCoin(e.target.value);
  }

  const handleModalInputChange = (e: any) => {
    setModalInputValue(e.target.value);
  };
  
  
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
      <Button>
        <Link  to="/">Main</Link>
      </Button>
      <Button>
        <Link  to="/portfolio">Portfolio</Link>
      </Button>
      <Button>
        <Link  to="/watchlist">Watchlist</Link>
      </Button>
      <div className={cls.navbar__balance}>
        Balance:{modalInputValue}
      </div>
      <Button onClick={handleOpenModal}>Deposit</Button>
      <Input 
        placeholder='Find coin'
        ref={inputRef}
        value={searchCoin}
        onChange={handleSearchChange}
      ></Input>
      <Button onClick={handleSearch}>Search</Button>
      <Modal
         visible={isOpen}
         onCancel={handleCloseModal}
         onOk={handleOk}
      >
        <p className={cls.navbar__text}>Deposit funds</p>
        <Input
          className={cls.navbar__input}
          value={modalInputValue}
          onChange={handleModalInputChange}
        />
      </Modal>
    </div>
  )
}

export default Navbar

function useDispatch() {
  throw new Error("Function not implemented.")
}
