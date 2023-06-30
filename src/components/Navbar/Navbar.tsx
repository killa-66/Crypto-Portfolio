import { Link } from "react-router-dom"
import cls from "./styles.module.css"
import {Button, Input, Modal} from "antd"
import { useEffect, useRef, useState, ChangeEvent } from "react"
import { api } from "../../Api/Api"
import { putSearch, setBalanceAccount } from "../../store/mainSlice"
import { useDispatch as useAppDispatch, useSelector} from "react-redux"
import { setBalance } from "../../store/mainSlice"

const Navbar = () => {
  const dispatch = useAppDispatch()
  const inputRef: any = useRef()
  const [searchCoin, setSearchCoin] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [modalInputValue, setModalInputValue] = useState(""); 
  const balance = useSelector(setBalanceAccount);

  function handleOpenModal() {
    setIsOpen(true);
  }
  
  function handleOk() {
    dispatch(setBalance(Number(modalInputValue)));
    setIsOpen(false)
  }
  function handleCloseModal() {
    setIsOpen(false)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCoin(e.target.value);
  }

  const handleModalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalInputValue(e.target.value);
  };
  
  
  const handleSearch = async () => {
    dispatch(putSearch(searchCoin))
    try {
      const response = await api.searchCoin(searchCoin);
      
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
        Balance:{balance.toFixed(2)}
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