import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, Table } from "antd";
import { selectSavedCoins, selectTokenPortfolio, decreaseBalanceAccount, removeCoinFromWatchList, addToPortfolio, selectSelectedCoin, setSelectedCoin } from "../../store/mainSlice";
import { CoinData } from '../../components/CoinTable/CoinTable';
import { setBalanceAccount, decreaseBalance } from '../../store/mainSlice';
import { cls } from './styles.module.css';
import { toast } from 'react-toastify';


const WatchList: FC = () => {
  const selectedCoins = useSelector(selectSavedCoins);
  const selectedCoin = useSelector(selectSelectedCoin);
  const dispatch = useDispatch();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const balance = useSelector(setBalanceAccount);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCoinNames, setSelectedCoinNames] = useState<string[]>([]);


  function buySelectedToken() {
    if (selectedCoin) {
      const cost = Number(selectedCoin.priceUsd) * quantity;
      if(cost <= balance) {
        dispatch(selectTokenPortfolio(selectedCoin));
        dispatch(decreaseBalance(cost));

        const purchaseInfo = {
          coinName: selectedCoin.name,
          purchasePrice: Number(selectedCoin.priceUsd),
          quantity: quantity,
          totalCost: cost
        };
  
        dispatch(addToPortfolio(purchaseInfo));

        setIsBuyModalOpen(false);
        setErrorMessage('');
        toast.success("Success");
      }
      else {
        setErrorMessage('Недостаточно средств для покупки, пожалуйста пополните баланс')
      }
    }
  }


  function handleOpenBuyModal(coin: CoinData) {
    dispatch(setSelectedCoin(coin));
    setIsBuyModalOpen(true);
  }

  function handleCloseBuyModal() {
    setIsBuyModalOpen(false);
    setErrorMessage('');
    setQuantity(0);
  }

  function handleOpenConfirmDeleteModal() {
    setIsConfirmDeleteModalOpen(true);
  }

  function handleCloseConfirmDeleteModal() {
    setIsConfirmDeleteModalOpen(false);
  }

  function handleRemoveCoin(coin: CoinData) {
    dispatch(removeCoinFromWatchList(coin.name))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, coinName: string) => {
    if (e.target.checked) {
      setSelectedCoinNames(prevSelected => [...prevSelected, coinName]);
    } else {
      setSelectedCoinNames(prevSelected => prevSelected.filter(name => name !== coinName));
    }
  };

  function handleRemoveSelectedCoins() {
    selectedCoinNames.forEach(coinName => {
      dispatch(removeCoinFromWatchList(coinName));
    });
    setSelectedCoinNames([]);
    handleCloseConfirmDeleteModal();
  }

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Buy token',
      dataIndex: 'Buy token',
      key: 'buy',
      render: (text: string, coin: CoinData) => (
        <Button onClick={() =>handleOpenBuyModal(coin)}>Buy</Button>
      )
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      key: 'supply',
      render: (supply: string) => parseFloat(supply).toFixed(2)
    },
    {
      title: 'MaxSupply',
      dataIndex: 'maxSupply',
      key: 'maxSupply',
      render: (maxSupply: string) => {
        if (isNaN(parseFloat(maxSupply))) {
          return '-'
        }
        return parseFloat(maxSupply).toFixed(0)
      }
    },
    {
      title: 'Volume',
      dataIndex: 'volumeUsd24Hr',
      key: 'volumeUsd24Hr',
      render: (volume: string) => parseFloat(volume).toFixed(2)
    },
    {
      title: 'Price',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      render: (price: string) => parseFloat(price).toFixed(2)
    },
    {
      title: '',
      dataIndex: 'selected',
      key: 'selected',
      render: (text: string, coin: CoinData) => (
        <input
          type="checkbox"
          onChange={(e) => handleCheckboxChange(e, coin.name)}
          checked={selectedCoinNames.includes(coin.name)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: CoinData) => (
        <Button onClick={() => handleRemoveCoin(record)}>Remove</Button>
      )
    }
  ];

  return (
    <div>
      <h1>Saved Coins</h1>
      <Button onClick={handleOpenConfirmDeleteModal}>Remove selected</Button>
      <Table
        dataSource={selectedCoins}
        columns={columns}
        pagination={false}
        rowKey="rank"
      />
      <Modal
        open={isBuyModalOpen}
        onCancel={handleCloseBuyModal}
        onOk={buySelectedToken}
      >
        {errorMessage && <p style={{"color": 'red'}}>{errorMessage}</p>}
        <h2>Are you sure?</h2>
        <Input
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </Modal>
      <Modal
        open={isConfirmDeleteModalOpen}
        onCancel={handleCloseConfirmDeleteModal}
        onOk={handleRemoveSelectedCoins}
      >
        <p>Are you sure?</p>
      </Modal>
    </div>
  )
};

export default WatchList;